import type { GMOCoinMarginPair, GMOCoinSpotPair } from "./types.ts";

export const BASE_URL = "https://api.coin.z.com/public/v1/";

export const ALL_GMOCOIN_SPOT_PAIRS: GMOCoinSpotPair[] = Array.from(
  new Set([
    "BTC",
    "BCH",
    "ETH",
    "LTC",
    "XEM",
    "XRP",
    "XYM",
    "XLM",
    "MONA",
  ]),
);

export const ALL_GMOCOIN_MARGIN_PAIRS: GMOCoinMarginPair[] = Array.from(
  new Set([
    "BTC_JPY",
    "BCH_JPY",
    "ETH_JPY",
    "LTC_JPY",
    "XRP_JPY",
  ]),
);
