import type { SWRConfiguration } from 'swr'

const swrConfig: SWRConfiguration = {
  revalidateOnMount: true,
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 3000, // 3sec
  shouldRetryOnError: false,
  errorRetryInterval: 5000, // 5sec
  errorRetryCount: 3,
  loadingTimeout: 5000 // 5sec
}

const swrMutationConfig: Record<string, boolean | string | number> = {
  rollbackOnError: true,
  revalidate: false
}

export { swrConfig, swrMutationConfig }