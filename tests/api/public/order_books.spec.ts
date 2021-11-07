import { fetchOrderBooks } from '@/api/public/order_books'
import {
  ALL_GMOCOIN_MARGIN_PAIRS,
  ALL_GMOCOIN_SPOT_PAIRS
} from '@/constants/pair'

describe('fetchOrderBooks', () => {
  it('return right schema', async () => {
    const result = await fetchOrderBooks({
      symbol: 'BTC'
    })

    expect(result.status).toBeBoolean()

    if (!result.status) return

    const { data, responsetime } = result

    expect(responsetime).toBeAfter(new Date('2000/1/1'))
    expect(data).toBeObject()

    const { asks, bids, symbol } = data

    expect(symbol).toBeOneOf([
      ...ALL_GMOCOIN_SPOT_PAIRS,
      ...ALL_GMOCOIN_MARGIN_PAIRS
    ])

    const expectPriceSize = (value: { price: number; size: number }[]) => {
      expect(value).toBeArray()

      value.forEach(({ price, size }) => {
        expect(price).toBeNumber()
        expect(size).toBeNumber()
      })
    }

    expectPriceSize(asks)
    expectPriceSize(bids)
  })
})
