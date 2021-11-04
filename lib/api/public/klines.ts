import { BASE_URL, KLINES } from '@/constants/api'
import { jsonFetch } from '@/shared/fetch'
import { defineReviver } from '@/shared/parse'
import type { GMOCoinPair } from '@/shared/types/currency'
import type { Response, PublicAPI } from '@/shared/types/fetch'

type Min = 'min'
type Hour = 'hour'
type Day = 'day'
type Week = 'week'
type Month = 'month'

type Unit<T extends string | number, U extends string> = `${T}${U}`

type Interval =
  | Unit<1 | 5 | 10 | 15 | 30, Min>
  | Unit<1 | 4 | 8 | 12, Hour>
  | Unit<1, Day>
  | Unit<1, Week>
  | Unit<1, Month>

type KlineOptions = {
  symbol: GMOCoinPair
  interval: Interval
  date: string
}

type KlineResponse = Response<
  {
    openTime: Date
    open: number
    high: number
    low: number
    close: number
    volume: number
  }[]
>

const reviver = defineReviver((key, value) => {
  if (key === 'openTime' && typeof value === 'string') {
    return new Date(Number(value))
  }

  if (
    ['open', 'high', 'low', 'close', 'volume'].includes(key) &&
    typeof value === 'string'
  ) {
    return Number(value)
  }

  return value
})

/**
 * @throws `Error`
 *
 * @see https://api.coin.z.com/docs/?javascript#klines
 * @beta
 */
const fetchKlines: PublicAPI<KlineOptions, KlineResponse> = (
  { symbol, interval, date },
  init
) => {
  const url = new URL(KLINES, BASE_URL)

  url.search = new URLSearchParams({
    symbol,
    interval,
    date
  }).toString()

  return jsonFetch(url, init, {
    parseJson: reviver
  })
}

export { fetchKlines }
export type { KlineOptions, KlineResponse }
