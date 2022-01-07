import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver } from "./fetch.ts";
import { isString, join } from "../deps.ts";
import type { GMOCoinPair, SuccessResponse } from "./types.ts";

const ORDERBOOKS = "orderbooks";

export type OrderBooksOptions = {
  symbol: GMOCoinPair;
};

type OrderBooksData = {
  asks: {
    price: number;
    size: number;
  }[];
  bids: {
    price: number;
    size: number;
  }[];
  symbol: GMOCoinPair;
};

export type OrderBooksResponse = SuccessResponse<OrderBooksData>;

const reviver: Reviver = (key, value) => {
  if (["price", "size"].includes(key) && isString(value)) {
    return Number(value);
  }

  return value;
};

/**
 * @throws `Error`
 *
 * @see https://api.coin.z.com/docs/?javascript#orderbooks
 * @beta
 */
export function fetchOrderBooks(
  { symbol }: OrderBooksOptions,
  init?: ResponseInit,
): Promise<OrderBooksResponse> {
  const url = new URL(join(ORDERBOOKS), BASE_URL);

  url.searchParams.set("symbol", symbol);

  return jsonFetch(url.toString(), init, {
    parseJson: reviver,
  });
}
