import { delay, randomBetween } from '../lib/mockLatency'

const MOCK_MIN_LATENCY = 200
const MOCK_MAX_LATENCY = 1200

export async function mockFetch<T>(
  url: string,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  await delay(
    randomBetween(MOCK_MIN_LATENCY, MOCK_MAX_LATENCY),
    signal,
  )

  return response.json() as Promise<T>
}