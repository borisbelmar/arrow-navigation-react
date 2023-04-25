import { ArrowNavigationEvents, FocusableElement } from '@arrow-navigation/core'
import { useEffect, useState } from 'react'
import useArrowNavigation from '../useArrowNavigation'

export default function useWatchElementFocused(id: string) {
  const api = useArrowNavigation()
  const [focused, setFocused] = useState(api.getFocusedElement()?.el.id === id)

  useEffect(() => {
    const onFocus = (element: FocusableElement) => {
      setFocused(element?.el?.id === id)
    }

    api.on(ArrowNavigationEvents.CURRENT_ELEMENT_CHANGE, onFocus)

    return () => {
      api.off(ArrowNavigationEvents.CURRENT_ELEMENT_CHANGE, onFocus)
    }
  }, [api, id])

  return focused
}
