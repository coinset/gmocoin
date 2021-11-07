import { BASE_URL, ORDERBOOKS } from '@/constants/api'
import { jsonFetch } from '@/shared/fetch'
import { defineReviver } from '@/shared/parse'
import type { GMOCoinPair } from '@/shared/types/currency'
import type { PublicAPI, Response } from '@/shared/types/fetch'

import { join } from 'path'

type OrderBooksOptions = {
  symbol: GMOCoinPair
}

type OrderBooksData = {
  asks: {
    price: number
    size: number
  }[]
  bids: {
    price: number
    size: number
  }[]
  symbol: GMOCoinPair
}

type OrderBooksResponse = Response<OrderBooksData>

const reviver = defineReviver((key, value) => {
  if (['price', 'size'].includes(key) && typeof value === 'string') {
    return Number(value)
  }

  return value
})

/**
 * @throws `Error`
 *
 * @see https://api.coin.z.com/docs/?javascript#orderbooks
 * @beta
 */
const fetchOrderBooks: PublicAPI<OrderBooksOptions, OrderBooksResponse> = (
  { symbol },
  init
) => {
  const url = new URL(join(ORDERBOOKS), BASE_URL)

  url.searchParams.set('symbol', symbol)

  return jsonFetch(url, init, {
    parseJson: reviver
  })
}

export { fetchOrderBooks, reviver }
export type { OrderBooksOptions, OrderBooksResponse, OrderBooksData }
