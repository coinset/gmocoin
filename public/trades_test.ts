import { any, anyArray, anyNumber, anyOf, expect, test } from "../dev_deps.ts";
import { fetchTrades } from "./trades.ts";
import type { GMOCoinPair } from "./types.ts";

test("fetchTrades", async () => {
  const testCase = async (symbol: GMOCoinPair) => {
    await expect(fetchTrades({ symbol })).resolves.toEqual({
      data: {
        list: anyArray({
          price: anyNumber(),
          side: anyOf(["BUY", "SELL"]),
          size: anyNumber(),
          timestamp: any(Date),
        }),
        pagination: {
          count: anyNumber(),
          currentPage: anyNumber(),
        },
      },
      status: 0,
      responsetime: any(String),
    });
  };

  await Promise.all(
    ["BTC" as const].map(testCase),
  );
});
