import { BASE_URL } from "./constants.ts";
import { isString, join } from "../deps.ts";
import { jsonFetch, Reviver } from "./fetch.ts";
import type { GMOCoinPair, SuccessResponse } from "./types.ts";

const TICKER = "ticker";

export type TickerOptions = {
  symbol?: GMOCoinPair | "ALL";
};

type TickerData = {
  ask: number;
  bid: number;
  high: number;
  low: number;
  last: number;
  volume: number;
  symbol: GMOCoinPair;
  timestamp: Date;
};

export type TickerResponse = SuccessResponse<TickerData[]>;

const reviver: Reviver = (key, value) => {
  if (
    ["ask", "bid", "high", "low", "last", "volume"].includes(key) &&
    isString(value)
  ) {
    return parseFloat(value);
  }
  if (key === "timestamp" && isString(value)) {
    return new Date(Date.parse(value));
  }
  return value;
};

/**
 * @throws `Error`
 *
 * @see https://api.coin.z.com/docs/?javascript#ticker
 * @beta
 */
export function fetchTicker(
  { symbol }: TickerOptions,
  init?: RequestInit,
): Promise<TickerResponse> {
  const url = new URL(join(TICKER), BASE_URL);
  if (isString(symbol)) {
    url.searchParams.set("symbol", symbol === "ALL" ? "" : symbol);
  }

  return jsonFetch(url.toString(), init, {
    parseJson: reviver,
  });
}
