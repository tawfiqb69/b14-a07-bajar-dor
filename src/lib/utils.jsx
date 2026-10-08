// ---------- Bangla digit ----------
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(value) {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[d]);
}

// 1290 -> "১,২৯০"
export function formatPrice(number) {
  const withComma = Number(number).toLocaleString("en-US");
  return toBnDigits(withComma);
}

// 2.1 -> "২.১%" , -2.9 -> "২.৯%" , 0 -> "০.০%"
// (minus dekhabo na, ▲ ▼ diyei bujha jay)
export function formatPercent(pct) {
  return toBnDigits(Math.abs(pct).toFixed(1)) + "%";
}

// ---------- Unit ----------
const UNIT_LABELS = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const UNIT_SHORT = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// "kg" -> "প্রতি কেজি"
export function getUnitLabel(unit) {
  return UNIT_LABELS[unit] || unit;
}

// "kg" -> "কেজি" (marquee er "টাকা/কেজি" er jonno)
export function getUnitShort(unit) {
  return UNIT_SHORT[unit] || unit;
}

// ---------- Bangla date ----------
// "বৃহস্পতিবার, ৮ অক্টোবর, ২০২৬"
export function getBanglaDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type)?.value;

  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

// ---------- Top 6 ----------
// dam shob cheye beshi barse
export function getTopRisers(products, count = 6) {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, count);
}

// dam shob cheye beshi komse
export function getTopFallers(products, count = 6) {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct) // -12.4 age, tarpor -7.4 ...
    .slice(0, count);
}

// ---------- Sorting ----------
// order: "default" | "low" | "high"
// Bangla digit shudhu dekhanor jonno. Sort hoy asol number (p.today) diye.
export function sortProducts(products, order) {
  const list = [...products]; // original array ke nosto korbo na

  if (order === "low") return list.sort((a, b) => a.today - b.today);
  if (order === "high") return list.sort((a, b) => b.today - a.today);

  return list; // default
}

// ---------- Product details ----------
// min, max, gor (gor = (min + max) / 2)
export function getPriceSummary(markets) {
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const avg = Math.round((min + max) / 2);
  return { min, max, avg };
}

// ekta bajar er gor dam: (min + max) / 2
export function getMarketAvg(market) {
  return (market.min + market.max) / 2;
}

// goto kal er theke koto taka bedeche/komeche
export function getPriceDiff(product) {
  return Math.abs(product.today - product.yesterday);
}

// ---------- Price change style (▲ ▼ —) ----------
// ▲ ar ▼ er color ek jaygay thakbe, pore bodlate chaile shudhu ekhane bodlalei hobe
export function getChangeStyle(dir) {
  if (dir === "up") return { arrow: "▲", color: "text-red-600" };
  if (dir === "down") return { arrow: "▼", color: "text-green-600" };
  return { arrow: "—", color: "text-gray-500" };
}

// 62 -> "৬২" , 63.5 -> "৬৩.৫০" (decimal thakle 2 ghor dekhabe)
export function formatAvgPrice(number) {
  const hasDecimal = !Number.isInteger(number);

  const text = Number(number).toLocaleString("en-US", {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: 2,
  });

  return toBnDigits(text);
}