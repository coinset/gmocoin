import type { StrictExtract } from '@/utils/types'
import type {
  All_Pairs,
  BTC,
  ETH,
  BCH,
  LTC,
  XRP,
  XEM,
  XYM
} from 'cryptocurrency-types'

type GMOCoinSpotPair = BTC | ETH | BCH | LTC | XRP | XEM | XYM
type GMOCoinMarginPair = StrictExtract<
  All_Pairs,
  | 'BTC_JPY'
  | 'ETH_JPY'
  | 'BCH_JPY'
  | 'LTC_JPY'
  | 'XRP_JPY'
  | 'XEM_JPY'
  | 'XLM_JPY'
  | 'XYM_JPY'
>
type GMOCoinPair = GMOCoinSpotPair | GMOCoinMarginPair
export type { GMOCoinPair, GMOCoinSpotPair, GMOCoinMarginPair }
