import { BASE_URL, STATUS } from '@/constants/api'
import { jsonFetch } from '@/shared/fetch'
import type { Reviver, SimplePublicAPI } from '@/shared/types/fetch'

type StatusResponse = {
  status: true
  data: {
    status: 'MAINTENANCE' | 'PREOPEN' | 'OPEN'
  }
  responsetime: Date
}

const reviver: Reviver = (key, value) => {
  if (key === 'status' && typeof value === 'number') {
    return value === 0
  }

  if (key === 'responsetime' && typeof value === 'string') {
    return new Date(Date.parse(value))
  }

  return value
}

/**
 * @throws `Error`
 *
 * @see https://api.coin.z.com/docs/?javascript#status
 * @beta
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const fetchStatus: SimplePublicAPI<{}, StatusResponse> = (_, init) => {
  const url = new URL(STATUS, BASE_URL)
  return jsonFetch(url, init, {
    parseJson: reviver
  })
}

export { fetchStatus }
