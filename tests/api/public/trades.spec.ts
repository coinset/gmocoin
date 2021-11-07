import { fetchTrades } from '@/api/public/trades'

describe('fetchTrades', () => {
  it('return right schema', async () => {
    const result = await fetchTrades({
      symbol: 'BCH'
    })

    expect(result.status).toBeBoolean()

    if (!result.status) return

    const { data, responsetime } = result

    expect(responsetime).toBeAfter(new Date('2000/1/1'))
    expect(data).toBeObject()

    const { pagination, list } = data

    expect(pagination).toBeObject()
    const { currentPage, count } = pagination

    expect(currentPage).toBeNumber()
    expect(count).toBeNumber()

    expect(list).toBeArray()
    list.forEach(({ price, size, side, timestamp }) => {
      expect(price).toBeNumber()
      expect(size).toBeNumber()
      expect(side).toBeOneOf(['BUY', 'SELL'])
      expect(timestamp).toBeAfter(new Date('2000/1/1'))
    })
  })
})
