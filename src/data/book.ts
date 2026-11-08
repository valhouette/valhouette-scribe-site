// Single source of truth for the published book.
// Replace AMAZON_URL with your real Amazon product link (paperback or the book's main page).
export const BOOK = {
  title: "The Hyperconnected Self",
  subtitle:
    "A Mapping of Spirituality, Consciousness, Perception, and Behaviour Inside a World That Never Stops Transmitting",
  author: "Valhouette Scribe",
  hook: "You are not broken. You are miscalibrated.",
  blurb:
    "A philosophical mapping of what constant connection does to attention, perception, judgment and the interior life, and a quieter way back to a truer baseline.",
  amazonUrl: "https://www.amazon.com/dp/B0HB949HJY",
  cover: "/images/the-hyperconnected-self-cover.jpg", // e.g. "/images/the-hyperconnected-self-cover.jpg" once you add it to /public/images/
  formats: "Paperback and Kindle",
};
export const hasAmazonLink = !BOOK.amazonUrl.startsWith("REPLACE");
