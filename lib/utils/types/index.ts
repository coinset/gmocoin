type StrictExtract<T, U extends T> = T extends U ? T : never

export type { StrictExtract }
