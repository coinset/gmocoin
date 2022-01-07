import { any, anyArray, anyNumber, expect, test } from "../dev_deps.ts";
import { fetchOrderBooks } from "./order_books.ts";
import {
  ALL_GMOCOIN_MARGIN_PAIRS,
  ALL_GMOCOIN_SPOT_PAIRS,
} from "./constants.ts";
import type { GMOCoinPair } from "./types.ts";

test("fetchOrderBooks", async () => {
  const testCase = async (symbol: GMOCoinPair) => {
    await expect(fetchOrderBooks({ symbol })).resolves.toEqual({
      status: 0,
      data: {
        asks: anyArray({
          price: anyNumber(),
          size: anyNumber(),
        }),
        bids: anyArray({
          price: anyNumber(),
          size: anyNumber(),
        }),
        symbol,
      },
      responsetime: any(String),
    });
  };

  await Promise.all(
    [...ALL_GMOCOIN_SPOT_PAIRS, ...ALL_GMOCOIN_MARGIN_PAIRS].map(testCase),
  );
});
