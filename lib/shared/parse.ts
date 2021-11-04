import { Reviver } from '@/shared/types/fetch'

const defineReviver = (reviver?: Reviver) => (key: string, value: unknown) => {
  if (key === 'status' && typeof value === 'number') {
    return value === 0
  }

  if (key === 'responsetime' && typeof value === 'string') {
    return new Date(Date.parse(value))
  }

  return reviver ? reviver(key, value) : value
}

export { defineReviver }
