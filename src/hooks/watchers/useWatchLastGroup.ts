import { ArrowNavigationEvents, Direction, FocusableGroup, getArrowNavigation } from '@arrow-navigation/core'
import { useEffect, useMemo, useState } from 'react'

interface Options {
  group?: string
  groupPattern?: RegExp
}

export default function useWatchLastGroup(
  direction: Direction,
  { group, groupPattern }: Options = {}
) {
  const api = getArrowNavigation()
  const [reachedLastGroup, setReachedLastGroup] = useState<boolean>(false)
  const [watchGroup, setWatchGroup] = useState<string | null>(group ?? null)

  useEffect(() => {
    const handler = (groupFocused: FocusableGroup, dir: Direction) => {
      if (!dir) return
      if (group?.toString() && groupFocused.id !== group) return
      if (groupPattern && !groupFocused.id.match(groupPattern)) {
        setReachedLastGroup(false)
        return
      }
      const noNextGroup = api.getNextGroup({ direction }) === null
      setReachedLastGroup(noNextGroup)
      if (noNextGroup) {
        setWatchGroup(groupFocused.el?.id)
      }
    }

    api.on(ArrowNavigationEvents.GROUP_FOCUS, handler)
    return () => {
      api.off(ArrowNavigationEvents.GROUP_FOCUS, handler)
    }
  }, [direction, api, group, groupPattern])

  return useMemo(() => ({
    reachedLastGroup,
    group: watchGroup
  }), [reachedLastGroup, watchGroup])
}
