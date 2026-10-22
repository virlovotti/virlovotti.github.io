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
