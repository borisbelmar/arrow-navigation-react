import { ArrowNavigationEvents, Direction, FocusableElement, getArrowNavigation } from '@arrow-navigation/core'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  direction?: Direction
  group?: string
  inGroup?: boolean
}

export default function useWatchNextElement({ direction, group, inGroup }: Props = {}) {
  const [nextElement, setNextElement] = useState<string | null>(null)
  const [dir, setDir] = useState<Direction | undefined>(direction)

  useEffect(() => {
    const api = getArrowNavigation()

    const handler = (el: FocusableElement, pressedDir: Direction) => {
      if (group?.toString() && el.group !== group) return
      if (!direction || direction === pressedDir) {
        setNextElement(api.getNextElement({ direction: direction || pressedDir, inGroup }))
      }
      if (!direction) {
        setDir(pressedDir)
      }
    }

    api.on(ArrowNavigationEvents.ELEMENT_FOCUS, handler)
    return () => {
      api.off(ArrowNavigationEvents.ELEMENT_FOCUS, handler)
    }
  }, [direction, group, inGroup])

  return useMemo(() => ({
    nextElement,
    direction: dir
  }), [nextElement, dir])
}
