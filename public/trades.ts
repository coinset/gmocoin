import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver } from "./fetch.ts";
import { isNumber, isString } from "../deps.ts";
import type { GMOCoinPair, SuccessResponse } from "./types.ts";

const TRADES = "trades";

export type TradesOptions = {
  symbol: GMOCoinPair;
  page?: number;
  count?: number;
};

type TradesData = {
  pagination: {
    currentPage: number;
    count: number;
  };
  list: {
    price: number;
    side: "BUY" | "SELL";
    size: number;
    timestamp: Date;
  }[];
};

export type TradesResponse = SuccessResponse<TradesData>;

const reviver: Reviver = (key, value) => {
  if (["price", "size"].includes(key) && isString(value)) {
    return Number(value);
  }
  if (key === "timestamp" && isString(value)) {
    return new Date(Date.parse(value));
  }
  return value;
};

/**
 * @throws `Error`
 *
 * @see https://api.coin.z.com/docs/?javascript#trades
 * @beta
 */
export function fetchTrades(
  { symbol, page, count }: TradesOptions,
  init?: RequestInit,
): Promise<TradesResponse> {
  const url = new URL(TRADES, BASE_URL);

  url.searchParams.set("symbol", symbol);

  if (isNumber(page)) {
    url.searchParams.set("page", String(page));
  }

  if (isNumber(count)) {
    url.searchParams.set("count", String(count));
  }

  return jsonFetch(url.toString(), init, {
    parseJson: reviver,
  });
}
