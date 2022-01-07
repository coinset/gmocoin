import { any, anyArray, anyNumber, anyOf, expect, test } from "../dev_deps.ts";
import { fetchTicker } from "./ticker.ts";
import {
  ALL_GMOCOIN_MARGIN_PAIRS,
  ALL_GMOCOIN_SPOT_PAIRS,
} from "./constants.ts";

test("fetchTicker", async () => {
  await expect(fetchTicker({ symbol: "ALL" })).resolves.toEqual({
    data: anyArray({
      ask: anyNumber(),
      bid: anyNumber(),
      high: anyNumber(),
      last: anyNumber(),
      low: anyNumber(),
      symbol: anyOf([...ALL_GMOCOIN_MARGIN_PAIRS, ...ALL_GMOCOIN_SPOT_PAIRS]),
      timestamp: any(Date),
      volume: anyNumber(),
    }),
    responsetime: any(String),
    status: 0,
  });
});
