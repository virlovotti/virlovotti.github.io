// One-time importer: pulls the public case studies and writes them into the
// site as native Markdown + local images. Run once, review the output, then
// commit the result. The built site never calls the source at build/runtime.
//
//   node scripts/import-notion.mjs
//
// Node 18+ only (uses global fetch). No external dependencies.

import { mkdir, writeFile, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const API_HOST = "https://picturesque-hail-760.notion.site";
const LOAD_PAGE_CHUNK = `${API_HOST}/api/v3/loadPageChunk`;

/** Cases to import, in display order. */
const CASES = [
  { slug: "50-plus-balance", pageId: "3819b5e1-fc88-80df-af2c-c07f31c6d171", order: 1 },
  { slug: "flexijoint", pageId: "3819b5e1-fc88-80a3-82b1-d56f0a82b1b8", order: 2 },
  { slug: "adventure-planner", pageId: "3819b5e1-fc88-805c-b4fa-e0f0784688de", order: 3 },
];

const CONTENT_TYPE_EXT = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

/** Fetch every block for a page, following the loadPageChunk cursor. */
async function loadPage(pageId) {
  const blocks = {};
  let cursor = { stack: [] };
  let chunkNumber = 0;

  for (let guard = 0; guard < 50; guard += 1) {
    const res = await fetch(LOAD_PAGE_CHUNK, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "Mozilla/5.0 case-study-importer",
      },
      body: JSON.stringify({
        pageId,
        limit: 200,
        cursor,
        chunkNumber,
        verticalColumns: false,
      }),
    });

    if (!res.ok) {
      throw new Error(`loadPageChunk ${pageId} failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const record = data?.recordMap?.block ?? {};
    for (const [id, entry] of Object.entries(record)) {
      // The value may be nested as value or value.value depending on the API.
      const value = entry?.value?.value ?? entry?.value ?? entry;
      if (value && value.id) blocks[value.id] = value;
    }

    const nextCursor = data?.cursor;
    if (nextCursor && Array.isArray(nextCursor.stack) && nextCursor.stack.length > 0) {
      cursor = nextCursor;
      chunkNumber += 1;
    } else {
      break;
    }
  }

  return blocks;
}

/** Notion rich text segments -> inline Markdown, preserving the original copy. */
function richText(segments) {
  if (!Array.isArray(segments)) return "";
  return segments
    .map((seg) => {
      let text = seg?.[0] ?? "";
      if (typeof text !== "string") return "";
      const annotations = Array.isArray(seg?.[1]) ? seg[1] : [];
      let link = null;
      let bold = false;
      let italic = false;
      let code = false;
      let strike = false;
      for (const ann of annotations) {
        const kind = ann?.[0];
        if (kind === "b") bold = true;
        else if (kind === "i") italic = true;
        else if (kind === "c") code = true;
        else if (kind === "s") strike = true;
        else if (kind === "a") link = ann?.[1] ?? null;
      }
      if (!text) return "";
      if (code) text = "`" + text + "`";
      if (bold) text = `**${text}**`;
      if (italic) text = `_${text}_`;
      if (strike) text = `~~${text}~~`;
      if (link) text = `[${text}](${link})`;
      return text;
    })
    .join("");
}

function plainText(segments) {
  if (!Array.isArray(segments)) return "";
  return segments.map((seg) => (typeof seg?.[0] === "string" ? seg[0] : "")).join("");
}

function extFromContentType(contentType, source) {
  const clean = (contentType || "").split(";")[0].trim().toLowerCase();
  if (CONTENT_TYPE_EXT[clean]) return CONTENT_TYPE_EXT[clean];
  const match = String(source || "").match(/\.(jpe?g|png|webp|gif|avif|svg)(?:[?#].*)?$/i);
  if (match) return match[1].toLowerCase().replace("jpeg", "jpg");
  return "jpg";
}

/** Download one image through the image proxy and save it locally. */
async function downloadImage(source, blockId, ctx) {
  const proxy = `${API_HOST}/image/${encodeURIComponent(source)}?table=block&id=${blockId}&width=2000&cache=v2`;
  const res = await fetch(proxy, {
    headers: { "user-agent": "Mozilla/5.0 case-study-importer" },
  });
  if (!res.ok) {
    throw new Error(`image ${blockId} failed: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = extFromContentType(res.headers.get("content-type"), source);
  ctx.imageIndex += 1;
  const fileName = `${String(ctx.imageIndex).padStart(2, "0")}.${ext}`;
  const dir = resolve(ROOT, "src/assets/case-studies", ctx.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, fileName), buffer);
  const relative = `../../assets/case-studies/${ctx.slug}/${fileName}`;
  if (!ctx.cover) ctx.cover = relative;
  return relative;
}

/** Render a block (and its children) into Markdown strings. */
async function renderBlock(id, ctx, depth = 0) {
  const block = ctx.blocks[id];
  if (!block) return [];
  const type = block.type;
  const props = block.properties || {};
  const title = richText(props.title);
  const out = [];
  const pad = "  ".repeat(depth);

  switch (type) {
    case "page":
      break;
    case "header":
      if (title) out.push(`# ${title}`);
      break;
    case "sub_header":
      if (title) out.push(`## ${title}`);
      break;
    case "sub_sub_header":
      if (title) out.push(`### ${title}`);
      break;
    case "text":
      if (title) out.push(title);
      break;
    case "bulleted_list":
      out.push(`${pad}- ${title}`);
      break;
    case "numbered_list":
      out.push(`${pad}1. ${title}`);
      break;
    case "to_do": {
      const checked = props.checked?.[0]?.[0] === "Yes";
      out.push(`${pad}- [${checked ? "x" : " "}] ${title}`);
      break;
    }
    case "toggle":
      if (title) out.push(`${pad}- ${title}`);
      break;
    case "quote":
      if (title) out.push(`> ${title}`);
      break;
    case "callout":
      if (title) out.push(`> ${title}`);
      break;
    case "divider":
      out.push("---");
      break;
    case "code": {
      const lang = (plainText(props.language) || "").toLowerCase();
      out.push("```" + lang + "\n" + plainText(props.title) + "\n```");
      break;
    }
    case "image": {
      const source = props.source?.[0]?.[0] || block.format?.display_source;
      if (source) {
        const caption = plainText(props.caption).trim();
        const relative = await downloadImage(source, block.id, ctx);
        const alt = caption || `${ctx.title} visual ${ctx.imageIndex}`;
        out.push(`![${alt}](${relative})`);
      } else {
        ctx.warnings.push(`image block ${block.id} had no source`);
      }
      break;
    }
    default:
      if (title) {
        out.push(title);
        ctx.warnings.push(`unmapped block type "${type}" (${block.id}) rendered as paragraph`);
      } else {
        ctx.warnings.push(`skipped unmapped block type "${type}" (${block.id})`);
      }
      break;
  }

  // Recurse into children.
  const children = Array.isArray(block.content) ? block.content : [];
  const listTypes = new Set(["bulleted_list", "numbered_list", "to_do", "toggle"]);
  const childDepth = listTypes.has(type) ? depth + 1 : depth;
  for (const childId of children) {
    out.push(...(await renderBlock(childId, ctx, childDepth)));
  }

  return out;
}

function frontmatter(entry, ctx) {
  const title = ctx.title.replace(/"/g, '\\"');
  return [
    "---",
    `title: "${title}"`,
    'summary: "TODO: one sentence from the intro"',
    'role: "TODO: from the intro"',
    "skills: []",
    `cover: "${ctx.cover ?? "TODO"}"`,
    `order: ${entry.order}`,
    "featured: true",
    "---",
    "",
  ].join("\n");
}

async function importCase(entry) {
  console.log(`\n== ${entry.slug} (${entry.pageId}) ==`);
  const blocks = await loadPage(entry.pageId);
  const root = blocks[entry.pageId];
  if (!root) throw new Error(`root block not found for ${entry.pageId}`);

  const ctx = {
    slug: entry.slug,
    blocks,
    imageIndex: 0,
    cover: null,
    title: plainText(root.properties?.title) || entry.slug,
    warnings: [],
  };

  // Clear any previous image output so re-runs stay deterministic.
  await rm(resolve(ROOT, "src/assets/case-studies", entry.slug), { recursive: true, force: true });

  const lines = [];
  const children = Array.isArray(root.content) ? root.content : [];
  for (const childId of children) {
    lines.push(...(await renderBlock(childId, ctx)));
  }

  const body = lines.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
  const md = `${frontmatter(entry, ctx)}\n${body}\n`;

  const outDir = resolve(ROOT, "src/content/case-studies");
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, `${entry.slug}.md`), md);

  console.log(`  blocks: ${Object.keys(blocks).length}, images: ${ctx.imageIndex}`);
  if (ctx.warnings.length) {
    console.log("  warnings:");
    for (const w of ctx.warnings) console.log(`    - ${w}`);
  }
}

async function main() {
  for (const entry of CASES) {
    await importCase(entry);
  }
  console.log("\nDone. Review src/content/case-studies/*.md and fill the TODO frontmatter.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
