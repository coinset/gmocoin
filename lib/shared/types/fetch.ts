import type { RequestInit } from 'node-fetch'

type PublicAPI<O, R> = (options: O, init?: RequestInit) => Promise<R>
type SimplePublicAPI<O, R> = (options?: O, init?: RequestInit) => Promise<R>

type Reviver = Parameters<typeof JSON.parse>[1]

type Response<T> =
  | {
      status: true
      data: T
      responsetime: Date
    }
  | {
      status: false
      messages: { message_code: string; message_string: string }[]
    }

export type { PublicAPI, SimplePublicAPI, Reviver, Response }
