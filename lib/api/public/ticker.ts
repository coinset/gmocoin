import { BASE_URL, TICKER } from '@/constants/api'
import { jsonFetch } from '@/shared/fetch'
import { defineReviver } from '@/shared/parse'
import type { GMOCoinPair } from '@/shared/types/currency'
import type { PublicAPI, Response } from '@/shared/types/fetch'

import { join } from 'path'

type TickerOptions = {
  symbol?: GMOCoinPair | 'ALL'
}

type TickerData = {
  ask: number
  bid: number
  high: number
  low: number
  last: number
  volume: number
  symbol: GMOCoinPair
  timestamp: Date
}

type TickerResponse = Response<TickerData[]>

const numberDataFields = ['ask', 'bid', 'high', 'low', 'last', 'volume']

const reviver = defineReviver((key, value) => {
  if (numberDataFields.includes(key) && typeof value === 'string') {
    return parseFloat(value)
  }
  if (key === 'timestamp' && typeof value === 'string') {
    return new Date(Date.parse(value))
  }
  return value
})

/**
 * @throws `Error`
 *
 * @see https://api.coin.z.com/docs/?javascript#ticker
 * @beta
 */
const fetchTicker: PublicAPI<TickerOptions, TickerResponse> = (
  { symbol },
  init
) => {
  const url = new URL(join(TICKER), BASE_URL)

  url.search = new URLSearchParams({
    symbol: symbol === 'ALL' ? '' : symbol ?? ''
  }).toString()
  return jsonFetch(url, init, {
    parseJson: reviver
  })
}

export { fetchTicker, reviver, numberDataFields }
export type { TickerOptions, TickerResponse, TickerData }
