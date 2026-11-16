export interface Book {
  slug: string;
  kind: "book" | "journal";
  title: string;
  subtitle: string;
  author: string;
  amazonUrl: string;
  cover: string;
  coverAlt: string;
  blurb: string;
  hook?: string;
  formats?: string;
  description: string;
  body?: string[];
}

export const BOOKS: Book[] = [
  {
    slug: "the-hyperconnected-self",
    kind: "book",
    title: "The Hyperconnected Self",
    subtitle:
      "A Mapping of Spirituality, Consciousness, Perception, and Behaviour Inside a World That Never Stops Transmitting",
    author: "Valhouette Scribe",
    hook: "You are not broken. You are miscalibrated.",
    blurb:
      "A philosophical mapping of what constant connection does to attention, perception, judgment and the interior life, and a quieter way back to a truer baseline.",
    amazonUrl: "https://www.amazon.com/dp/B0HB949HJY",
    cover: "/images/the-hyperconnected-self-cover.jpg",
    coverAlt: "Cover of The Hyperconnected Self",
    formats: "Paperback and Kindle",
    description:
      "A philosophical mapping of spirituality, consciousness, perception and behaviour inside a world that never stops transmitting. By Valhouette Scribe.",
  },
  {
    slug: "the-quiet-record",
    kind: "journal",
    title: "The Quiet Record",
    subtitle:
      "A Companion Journal for Self-Reflection in a Hyperconnected World",
    author: "Valhouette Scribe",
    hook: "Some of the best hours of your life will go unrecorded.",
    blurb:
      "A companion journal for self-reflection in a hyper-connected world. Twelve sections, room to write, and space to hear yourself think.",
    amazonUrl:
      "https://www.amazon.com/dp/B0HRTVPT7N/ref=sr_1_1?crid=31MVYSHLQ4LN6&dib=eyJ2IjoiMSJ9.HekAa8eDneDNuCN_RptBfBRKIb5ByBgRz9MjAEcxPYFOcxfMzqvUT_dhTKAt3vGoDsTYHkEpQ1Ue5SOsr33GLtnDtUREhgtL4B2S_1MynedViKdiD3T6KQZuNEWq5K2uBdwXK-uvsvfdBKlFUKf5fJzsIUMo4vyCOmAJiU08tqt1ILzWnYB-Th10ltP9L_9tb-SgdKsECFxgJ22EoM3cP3qFJIxDChI5HEjkn5E7jKw.QBJq5n2hBqsXqbT9PvUkzspQOa2KoTMQIMxaBWdu8Hc&dib_tag=se&keywords=The+Quiet+Record%3A+A+Companion+Journal+for+Self-Reflection+in+a+Hyper-Connected+World&nsdOptOutParam=true&qid=1794824467&sprefix=the+quiet+record+a+companion+journal+for+self-reflection+in+a+hyper-connected+world%2Caps%2C534&sr=8-1",
    cover: "/images/the-quiet-record-cover.png",
    coverAlt: "The Quiet Record, a companion journal by Valhouette Scribe",
    description:
      "A companion journal for self-reflection in a hyper-connected world. Twelve sections, room to write, and space to hear yourself think.",
    body: [
      "A place to write down what you read, what you learn and what you notice. Twelve sections move from Operational Drift to The Depth of Presence. Each opens with a short reflection and leaves room for your own words, with no audience and no rules.",
      "Return to it when the world gets loud.",
    ],
  },
];

export const BOOK = BOOKS[0];
export const hasAmazonLink = (book: Book): boolean =>
  !book.amazonUrl.startsWith("REPLACE");
