import { fetchStatus } from '@/api/public/status'

describe('fetchStatus', () => {
  it('return right schema', async () => {
    const result = await fetchStatus()

    expect(result.status).toBeBoolean()

    if (!result.status) return

    const { data, responsetime } = result

    expect(responsetime).toBeAfter(new Date('2000/1/1'))
    expect(data).toBeObject()

    const { status } = data

    expect(status).toBeOneOf(['MAINTENANCE', 'PREOPEN', 'OPEN'])
  })
})
