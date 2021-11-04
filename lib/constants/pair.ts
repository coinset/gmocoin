import type {
  GMOCoinSpotPair,
  GMOCoinMarginPair
} from '@/shared/types/currency'

const ALL_GMOCOIN_SPOT_PAIRS: GMOCoinSpotPair[] = [
  'BTC',
  'BCH',
  'ETH',
  'LTC',
  'XEM',
  'XRP',
  'XYM'
]

const ALL_GMOCOIN_MARGIN_PAIRS: GMOCoinMarginPair[] = [
  'BTC_JPY',
  'BCH_JPY',
  'ETH_JPY',
  'LTC_JPY',
  'XEM_JPY',
  'XLM_JPY',
  'XRP_JPY',
  'XYM_JPY'
]

export { ALL_GMOCOIN_SPOT_PAIRS, ALL_GMOCOIN_MARGIN_PAIRS }
