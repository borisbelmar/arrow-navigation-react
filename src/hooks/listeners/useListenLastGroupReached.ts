import { ArrowNavigationEvents, Direction, FocusableGroup, getArrowNavigation } from '@arrow-navigation/core'
import { useEffect } from 'react'

export type LastGroupCallback = (group: string | null) => void

interface Options {
  group?: string
  groupPattern?: RegExp
}

export default function useListenLastGroupReached(
  cb: LastGroupCallback,
  direction: Direction,
  { group, groupPattern }: Options = {}
) {
  const api = getArrowNavigation()

  useEffect(() => {
    const handler = (groupFocused: FocusableGroup, dir: Direction) => {
      if (!dir) return
      if (group?.toString() && groupFocused.el.id !== group) return
      if (!groupPattern || groupFocused.el.id.match(groupPattern)) {
        const noNextGroup = api.getNextGroup({ direction }) === null
        if (noNextGroup) {
          cb(groupFocused.el?.id)
        }
      }
    }

    api.on(ArrowNavigationEvents.GROUP_FOCUS, handler)
    return () => {
      api.off(ArrowNavigationEvents.GROUP_FOCUS, handler)
    }
  }, [direction, api, group, groupPattern, cb])
}
