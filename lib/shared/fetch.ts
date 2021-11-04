import fetch from 'node-fetch'

import type { Reviver } from '@/shared/types/fetch'

import type { RequestInfo, RequestInit } from 'node-fetch'

const jsonFetch = async <T>(
  url: RequestInfo,
  init?: RequestInit,
  options?: { parseJson: Reviver }
): Promise<T> => {
  const res = await fetch(url, init)

  if (!res.ok) {
    throw Error(res.statusText)
  }

  const text = await res.text()

  return JSON.parse(text, options?.parseJson)
}

export { jsonFetch }
