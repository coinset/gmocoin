import type { StrictExtract } from '@/utils/types'
import type {
  BTC,
  ETH,
  BCH,
  LTC,
  XRP,
  XEM,
  XLM,
  XYM,
  Pair,
  JPY
} from 'cryptocurrency-types'

type GMOCoinSymbol = BTC | ETH | BCH | LTC | XRP | XEM | XLM | XYM

type GMOCoinSpotPair = GMOCoinSymbol
type GMOCoinMarginPair = Pair<
  StrictExtract<GMOCoinSymbol, BTC | ETH | BCH | LTC | XRP>,
  JPY
>
type GMOCoinPair = GMOCoinSpotPair | GMOCoinMarginPair
export type { GMOCoinPair, GMOCoinSpotPair, GMOCoinMarginPair }
