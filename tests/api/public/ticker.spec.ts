import { fetchTicker } from '@/api/public/ticker'
import {
  ALL_GMOCOIN_MARGIN_PAIRS,
  ALL_GMOCOIN_SPOT_PAIRS
} from '@/constants/pair'

describe('fetchTicker', () => {
  it('return right schema', async () => {
    const result = await fetchTicker({
      symbol: 'BTC'
    })

    expect(result.status).toBeBoolean()

    if (!result.status) return

    const { data, responsetime } = result

    expect(responsetime).toBeAfter(new Date('2000/1/1'))
    expect(data).toBeArray()

    data.forEach(({ ask, bid, high, last, low, symbol, timestamp, volume }) => {
      expect(ask).toBeNumber()
      expect(bid).toBeNumber()
      expect(high).toBeNumber()
      expect(last).toBeNumber()
      expect(low).toBeNumber()
      expect(volume).toBeNumber()
      expect([
        ...ALL_GMOCOIN_MARGIN_PAIRS,
        ...ALL_GMOCOIN_SPOT_PAIRS
      ]).toContain(symbol)
      expect(timestamp).toBeAfter(new Date('2000/1/1'))
    })
  })
})
