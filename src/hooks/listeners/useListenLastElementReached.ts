import { ArrowNavigationEvents, Direction, FocusableElement, getArrowNavigation } from '@arrow-navigation/core'
import { useEffect } from 'react'

export type LastElementCallback = (element: string | null) => void

interface Options {
  group?: string
  inGroup?: boolean
  elementPattern?: RegExp
}

export default function useListenLastElementReached(
  cb: LastElementCallback,
  direction: Direction,
  { group, inGroup, elementPattern }: Options = {}
) {
  const api = getArrowNavigation()

  useEffect(() => {
    const handler = (focusedElement: FocusableElement, dir: Direction) => {
      if (!dir) return
      if (group?.toString() && focusedElement.group !== group) return
      if (!elementPattern || focusedElement.el.id.match(elementPattern)) {
        const noNextElement = api.getNextElement({ direction, inGroup }) === null
        if (noNextElement) {
          cb(focusedElement.el.id)
        }
      }
    }

    api.on(ArrowNavigationEvents.ELEMENT_FOCUS, handler)
    return () => {
      api.off(ArrowNavigationEvents.ELEMENT_FOCUS, handler)
    }
  }, [direction, group, inGroup, api, elementPattern, cb])
}
