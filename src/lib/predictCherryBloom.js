/**
 * Predicts an estimated London cherry blossom bloom window using the last
 * 30 days of daily temperatures.
 *
 * This is a simple Growing Degree Day style estimate, not a formal botanical
 * phenology model. It is tuned for a lightweight website forecast using the
 * rough London observations gathered for 2017-2026:
 *
 * - Bloom-day mean temperature average: about 10.9C
 * - Bloom-day high temperature average: about 16.7C
 * - Bloom-day low temperature average: about 5.2C
 *
 * The model assumes blossom responds to accumulated warmth over several weeks,
 * so it sums daily warmth above a base temperature across the most recent
 * 30 days, then checks whether the last week has been mild enough.
 *
 * Expected input:
 *
 * ```js
 * const last30Days = [
 *   {
 *     date: "2026-03-28", // ISO date string, used for reference only
 *     mean: 10.8,         // daily mean temperature in Celsius
 *     high: 15.2,         // daily high temperature in Celsius
 *     low: 6.4            // daily low temperature in Celsius
 *   }
 * ];
 * ```
 *
 * Requirements:
 *
 * - Pass daily temperatures in Celsius.
 * - Pass days in chronological order, oldest first and newest last.
 * - Ideally pass 30 days. If more than 30 are provided, only the last 30 are
 *   used. If fewer than 7 are provided, the function throws because the recent
 *   weekly averages would be too noisy to use.
 *
 * Returned estimate:
 *
 * The main result is `dateRange`, an object with `start` and `end` ISO date
 * strings. This is the estimated bloom/near-peak window. The range is wider
 * when the bloom is farther away and narrower when current conditions already
 * look similar to historic bloom observations.
 *
 * The estimate is based on:
 *
 * - accumulated heat units over the latest 30 days;
 * - the average daily warmth over the latest 7 days;
 * - whether recent nights are mostly above 5C.
 *
 * Example:
 *
 * ```js
 * import { predictCherryBloom } from "./lib/predictCherryBloom.js";
 *
 * const prediction = predictCherryBloom(last30Days);
 * console.log(prediction.dateRange.start, prediction.dateRange.end);
 * ```
 *
 * @param {Array<{date: string, mean: number, high: number, low: number}>} days
 * @returns {{
 *   dateRange: {start: string, end: string},
 *   heatUnits: number,
 *   avgMean7: number,
 *   avgHigh7: number,
 *   avgLow7: number,
 *   confidence: "low-medium" | "medium" | "medium-high"
 * }}
 */
export function predictCherryBloom(days) {
  if (!Array.isArray(days) || days.length < 7) {
    throw new Error("predictCherryBloom expects at least 7 daily temperature records.");
  }

  const BASE_TEMP = 5;
  const BLOOM_HEAT_THRESHOLD = 150;

  const recent = days.slice(-30);

  const heatUnits = recent.reduce((sum, day) => {
    validateDay(day);
    return sum + Math.max(0, day.mean - BASE_TEMP);
  }, 0);

  const last7 = recent.slice(-7);
  const avgMean7 = average(last7.map((day) => day.mean));
  const avgHigh7 = average(last7.map((day) => day.high));
  const avgLow7 = average(last7.map((day) => day.low));
  const latestDate = parseIsoDate(recent[recent.length - 1].date);
  const dateRange = estimateBloomDateRange({
    latestDate,
    heatUnits,
    avgMean7,
    avgLow7,
    baseTemp: BASE_TEMP,
    bloomHeatThreshold: BLOOM_HEAT_THRESHOLD,
  });

  return {
    dateRange,
    heatUnits: Math.round(heatUnits),
    avgMean7: round1(avgMean7),
    avgHigh7: round1(avgHigh7),
    avgLow7: round1(avgLow7),
    confidence: confidenceFor(dateRange.daysUntilStart, avgLow7),
  };
}

function validateDay(day) {
  if (
    !day ||
    typeof day.date !== "string" ||
    typeof day.mean !== "number" ||
    typeof day.high !== "number" ||
    typeof day.low !== "number"
  ) {
    throw new Error("Each day must include date, mean, high, and low values.");
  }
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function estimateBloomDateRange({
  latestDate,
  heatUnits,
  avgMean7,
  avgLow7,
  baseTemp,
  bloomHeatThreshold,
}) {
  const recentDailyHeatRate = Math.max(1, avgMean7 - baseTemp);
  const remainingHeatUnits = Math.max(0, bloomHeatThreshold - heatUnits);
  const projectedDaysUntilThreshold = Math.ceil(remainingHeatUnits / recentDailyHeatRate);

  let startOffset;
  let endOffset;

  if (heatUnits >= bloomHeatThreshold && avgMean7 >= 10 && avgLow7 >= 5) {
    startOffset = -2;
    endOffset = 5;
  } else if (heatUnits >= bloomHeatThreshold * 0.8 && avgMean7 >= 8) {
    startOffset = Math.max(0, projectedDaysUntilThreshold - 3);
    endOffset = projectedDaysUntilThreshold + 7;
  } else {
    startOffset = Math.max(3, projectedDaysUntilThreshold - 5);
    endOffset = projectedDaysUntilThreshold + 14;
  }

  return {
    start: addDays(latestDate, startOffset),
    end: addDays(latestDate, endOffset),
    daysUntilStart: startOffset,
  };
}

function parseIsoDate(date) {
  const parsed = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Each day.date must be a valid ISO date string, for example 2026-03-28.");
  }

  return parsed;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString().slice(0, 10);
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function confidenceFor(daysUntilStart, avgLow7) {
  if (daysUntilStart <= 0 && avgLow7 >= 5) return "medium-high";
  if (daysUntilStart <= 10) return "medium";
  return "low-medium";
}
