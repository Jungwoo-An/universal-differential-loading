import { IStore } from './types'

export const store: IStore = {
  recentlyAssetTags: {
    head: [],
    body: []
  },
  concurrentPromise: null
}
