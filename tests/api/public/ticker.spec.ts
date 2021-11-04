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

    expect(result.status).toEqual(expect.any(Boolean))

    if (!result.status) return

    const { data, responsetime } = result

    expect(responsetime).toEqual(expect.any(Date))
    expect(data).toEqual(expect.any(Array))

    const { ask, bid, high, last, low, symbol, timestamp, volume } = data[0]
    expect(ask).toEqual(expect.any(Number))
    expect(bid).toEqual(expect.any(Number))
    expect(high).toEqual(expect.any(Number))
    expect(last).toEqual(expect.any(Number))
    expect(low).toEqual(expect.any(Number))
    expect(volume).toEqual(expect.any(Number))
    expect([...ALL_GMOCOIN_MARGIN_PAIRS, ...ALL_GMOCOIN_SPOT_PAIRS]).toContain(
      symbol
    )
    expect(timestamp).toEqual(expect.any(Date))
  })
})
