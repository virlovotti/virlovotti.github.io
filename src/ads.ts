export type AdMedia =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster?: string };

export type ConversionAd = {
  type: "conversion";
  name: string;
  label: string;
  roas: string;
  cpa: string;
  purchases: string;
  ctr: string;
  daysOnAir: string;
  secondaryLine?: string;
  media?: AdMedia;
};

export type HookAd = {
  type: "hook";
  name: string;
  label: string;
  mainMetric: string;
  volume: string;
  daysOnAir: string;
  media?: AdMedia;
};

export type Ad = ConversionAd | HookAd;

export type BetterWhen = "higher" | "lower";

export type Reading = {
  label: string;
  value: string;
  delta?: string;
  /** Which direction is good for this metric, vs the account average. */
  betterWhen?: BetterWhen;
};

/** Which direction is better for each metric label. */
const BETTER_WHEN: Record<string, BetterWhen> = {
  ROAS: "higher",
  CTR: "higher",
  "Hook rate": "higher",
  Purchases: "higher",
  CPA: "lower",
};

const withTone = (reading: Reading): Reading => {
  const betterWhen = BETTER_WHEN[reading.label];
  return betterWhen ? { ...reading, betterWhen } : reading;
};

/**
 * Whether a delta is better or worse than the account average, judged by the
 * metric's direction rather than the raw sign. Returns undefined when there is
 * no delta to compare.
 */
export function deltaTone(reading: Reading): "better" | "worse" | undefined {
  if (!reading.delta || !reading.betterWhen) return undefined;
  const delta = reading.delta.trim();
  const isPositive = /^\+/.test(delta);
  const isNegative = /^[−-]/.test(delta);
  if (!isPositive && !isNegative) return undefined;
  const positiveIsBetter = reading.betterWhen === "higher";
  return isPositive === positiveIsBetter ? "better" : "worse";
}

export const caseId = (ad: Ad) =>
  ad.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** "2.33 (+75%)" → value "2.33", delta "+75%" (delta is vs account average). */
export function splitDelta(raw: string): { value: string; delta?: string } {
  const match = raw.match(/^(.*?)\s*\(([^)]+)\)$/);
  return match ? { value: match[1], delta: match[2] } : { value: raw };
}

/** "CTR 2.02% (+57%)" → label "CTR"; "Hook rate 42%" → label "Hook rate". */
export function labelledMetric(raw: string): Reading {
  const match = raw.match(/^(\D+?)\s+([$\d].*)$/);
  const label = match ? match[1] : "Result";
  return { label, ...splitDelta(match ? match[2] : raw) };
}

/** "42,684 views" → label "Views", value "42,684". */
export function countMetric(raw: string): Reading {
  const match = raw.match(/^([\d.,]+)\s+(.+)$/);
  if (!match) return { label: "Volume", value: raw };
  const noun = match[2];
  return { label: noun[0].toUpperCase() + noun.slice(1), value: match[1] };
}

export function readings(ad: Ad): Reading[] {
  if (ad.type === "conversion") {
    return [
      { label: "ROAS", ...splitDelta(ad.roas) },
      { label: "CPA", ...splitDelta(ad.cpa) },
      { label: "Purchases", ...splitDelta(ad.purchases) },
      { label: "CTR", ...splitDelta(ad.ctr) },
    ].map(withTone);
  }
  return [labelledMetric(ad.mainMetric), countMetric(ad.volume)].map(withTone);
}

export const leadReading = (ad: Ad): Reading => readings(ad)[0];

/** 108×192 downscale in public/ads/thumbs/ of the image or video poster. */
export function thumbnail(ad: Ad): string | undefined {
  const source = ad.media?.kind === "video" ? ad.media.poster : ad.media?.src;
  return source?.replace(/^\/ads\/(.+)\.\w+$/, "/ads/thumbs/$1.jpg");
}

export const ads: Ad[] = [
  {
    type: "conversion",
    name: "The Sign Your Legs Were Waiting For",
    label: "CM General · Offer · Most-Aware",
    roas: "2.33 (+75%)",
    cpa: "$45.56 (−43%)",
    purchases: "144",
    ctr: "0.78%",
    daysOnAir: "12",
    secondaryLine: "ROAS 3.91 on its first day",
    media: { kind: "image", src: "/ads/the-sign.jpg" },
  },
  {
    type: "conversion",
    name: "Precision Sizing",
    label: "Lymphoedema · Offer · Most-Aware",
    roas: "3.27 (+146%)",
    cpa: "$34.89 (−57%)",
    purchases: "21",
    ctr: "1.24%",
    daysOnAir: "26",
    media: {
      kind: "image",
      src: "/ads/week-37-precision-sizing-v1.jpg",
    },
  },
  {
    type: "conversion",
    name: "8 Sizes Now In",
    label: "Lymphoedema · Sizing · Most-Aware",
    roas: "2.12 (+59%)",
    cpa: "$36.63 (−54%)",
    purchases: "18",
    ctr: "1.29%",
    daysOnAir: "26",
    media: {
      kind: "image",
      src: "/ads/week-33-small-wide-calf.jpg",
    },
  },
  {
    type: "conversion",
    name: "Nobody Believes This",
    label: "Varicose Veins · Problem-Aware",
    roas: "1.48 (+11%)",
    cpa: "$63.75 (−21%)",
    purchases: "30",
    ctr: "1.56% (+21%)",
    daysOnAir: "5",
    media: {
      kind: "video",
      src: "/ads/nobody-believes-this.mp4",
      poster: "/ads/nobody-believes-this.jpg",
    },
  },
  {
    type: "conversion",
    name: "Potsie Starter Pack",
    label: "POTS · Social Proof · Solution-Aware",
    roas: "1.13",
    cpa: "$91.30",
    purchases: "30",
    ctr: "1.66% (+29%)",
    daysOnAir: "5",
    media: {
      kind: "image",
      src: "/ads/potsie-spring-pack.png",
    },
  },
  {
    type: "hook",
    name: "The Shower",
    label: "POTS · Standing Dizziness · Problem-Aware",
    mainMetric: "CTR 2.02% (+57%)",
    volume: "28 purchases",
    daysOnAir: "34",
    media: { kind: "image", src: "/ads/the-shower-v1.jpg" },
  },
  {
    type: "hook",
    name: "Panic Attack V2",
    label: "POTS · Blood Pooling · Problem-Aware",
    mainMetric: "Hook rate 42%",
    volume: "42,684 views",
    daysOnAir: "30",
    media: {
      kind: "video",
      src: "/ads/panic-attack-hook-3.mp4",
      poster: "/ads/panic-attack-hook-3.jpg",
    },
  },
];
