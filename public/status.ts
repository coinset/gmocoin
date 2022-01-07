import { BASE_URL } from "./constants.ts";
import { jsonFetch } from "./fetch.ts";
import type { SuccessResponse } from "./types.ts";

const STATUS = "status";

type StatusResponse = SuccessResponse<{
  status: "MAINTENANCE" | "PREOPEN" | "OPEN";
}>;

/**
 * @throws `Error`
 *
 * @see https://api.coin.z.com/docs/?javascript#status
 * @beta
 */
// deno-lint-ignore ban-types
function fetchStatus(_?: {}, init?: RequestInit): Promise<StatusResponse> {
  const url = new URL(STATUS, BASE_URL);
  return jsonFetch(url.toString(), init);
}

export { fetchStatus };
