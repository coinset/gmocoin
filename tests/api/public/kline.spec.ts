import { fetchKlines } from '@/api/public/klines'

describe('fetchKlines', () => {
  it('return right schema', async () => {
    const result = await fetchKlines({
      symbol: 'BTC',
      interval: '1min',
      date: '20210501'
    })

    expect(result.status).toBeBoolean()

    if (!result.status) return

    const { data, responsetime } = result

    expect(responsetime).toBeAfter(new Date('2000/1/1'))
    expect(data).toBeArray()

    data.forEach(({ open, openTime, high, low, close, volume }) => {
      expect(open).toBeNumber()
      expect(high).toBeNumber()
      expect(low).toBeNumber()
      expect(close).toBeNumber()
      expect(volume).toBeNumber()
      expect(openTime).toBeAfter(new Date('2000/1/1'))
    })
  })
})
