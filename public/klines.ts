import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver } from "./fetch.ts";
import type { GMOCoinPair, SuccessResponse } from "./types.ts";

const KLINES = "klines";

type Min = "min";
type Hour = "hour";
type Day = "day";
type Week = "week";
type Month = "month";

type Unit<T extends string | number, U extends string> = `${T}${U}`;

type Interval =
  | Unit<1 | 5 | 10 | 15 | 30, Min>
  | Unit<1 | 4 | 8 | 12, Hour>
  | Unit<1, Day>
  | Unit<1, Week>
  | Unit<1, Month>;

export type KlineOptions = {
  symbol: GMOCoinPair;
  interval: Interval;
  date: string;
};

export type KlineResponse = SuccessResponse<{
  openTime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}[]>;

const reviver: Reviver = (key, value) => {
  if (key === "openTime" && typeof value === "string") {
    return new Date(Number(value));
  }

  if (
    ["open", "high", "low", "close", "volume"].includes(key) &&
    typeof value === "string"
  ) {
    return Number(value);
  }

  return value;
};

/**
 * @throws `Error`
 *
 * @see https://api.coin.z.com/docs/?javascript#klines
 * @beta
 */
export function fetchKlines(
  { symbol, interval, date }: KlineOptions,
  init?: RequestInit,
): Promise<KlineResponse> {
  const url = new URL(KLINES, BASE_URL);

  url.searchParams.set("symbol", symbol);
  url.searchParams.set("interval", interval);
  url.searchParams.set("date", date);

  return jsonFetch(url.toString(), init, {
    parseJson: reviver,
  });
}
