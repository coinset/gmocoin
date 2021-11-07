import { BASE_URL, TRADES } from '@/constants/api'
import { jsonFetch } from '@/shared/fetch'
import { defineReviver } from '@/shared/parse'
import type { GMOCoinPair } from '@/shared/types/currency'
import type { PublicAPI, Response } from '@/shared/types/fetch'

type TradesOptions = {
  symbol: GMOCoinPair
  page?: number
  count?: number
}

type TradesData = {
  pagination: {
    currentPage: number
    count: number
  }
  list: {
    price: number
    side: 'BUY' | 'SELL'
    size: number
    timestamp: Date
  }[]
}

type TradesResponse = Response<TradesData>

const reviver = defineReviver((key, value) => {
  if (['price', 'size'].includes(key) && typeof value === 'string') {
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
 * @see https://api.coin.z.com/docs/?javascript#trades
 * @beta
 */
const fetchTrades: PublicAPI<TradesOptions, TradesResponse> = (
  { symbol, page, count },
  init
) => {
  const url = new URL(TRADES, BASE_URL)

  url.searchParams.set('symbol', symbol)

  if (typeof page === 'number') {
    url.searchParams.set('page', String(page))
  }

  if (typeof count === 'number') {
    url.searchParams.set('count', String(count))
  }

  return jsonFetch(url, init, {
    parseJson: reviver
  })
}

export { fetchTrades, reviver }
export type { TradesOptions, TradesResponse, TradesData }
