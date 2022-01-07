import { fetchKlines } from "./klines.ts";
import { any, anyArray, anyNumber, expect, test } from "../dev_deps.ts";
import type { GMOCoinPair } from "./types.ts";

test("fetchKlines", async () => {
  const testCase = async (symbol: GMOCoinPair) => {
    await expect(fetchKlines({
      symbol,
      "interval": "8hour",
      date: "2021",
    })).resolves.toEqual({
      status: 0,
      responsetime: any(String),
      data: anyArray({
        openTime: any(Date),
        open: anyNumber(),
        high: anyNumber(),
        low: anyNumber(),
        close: anyNumber(),
        volume: anyNumber(),
      }),
    });
  };

  await Promise.all(["BTC" as const, "ETH" as const].map(testCase));
});
