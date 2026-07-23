// IndexedDB cache for the multi-megabyte TLE bundles (too large for
// localStorage). Keyed entries let the cache shape evolve without clashes.

import type { FeedTexts } from '@/lib/satellites'

const DB_NAME = 'leo-live'
const STORE = 'tle'

export interface CachedBundle {
  key: string
  texts: FeedTexts
  fetchedAt: number
}

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, 1)
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE)) {
          req.result.createObjectStore(STORE)
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
}

export async function cacheGet(key: string): Promise<CachedBundle | null> {
  const db = await openDb()
  if (!db) return null
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).get(key)
      req.onsuccess = () => {
        const v = req.result as CachedBundle | undefined
        resolve(
          v && v.texts && typeof v.texts.active === 'string' && isFinite(v.fetchedAt)
            ? v
            : null,
        )
      }
      req.onerror = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
}

export async function cacheSet(value: CachedBundle): Promise<void> {
  const db = await openDb()
  if (!db) return
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).put(value, value.key)
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    } catch {
      resolve()
    }
  })
}
