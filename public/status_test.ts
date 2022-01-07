import { fetchStatus } from "./status.ts";
import { any, anyOf, expect, test } from "../dev_deps.ts";

test("fetchStatus", async () => {
  await expect(fetchStatus()).resolves.toEqual({
    status: 0,
    data: {
      status: anyOf(["MAINTENANCE", "PREOPEN", "OPEN"]),
    },
    responsetime: any(String),
  });
});
