import type { FocusableElementOptions, FocusableGroupOptions } from '@/types'
import { getArrowNavigation } from '@arrow-navigation/core'
import { useCallback, useEffect, useRef } from 'react'

interface Props {
  id: string
  options?: FocusableGroupOptions
}

export default function useFocusableGroupContext({ id, options }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const arrowNavigationApi = getArrowNavigation()

  const registerElement = useCallback((
    element: HTMLElement,
    elOptions?: FocusableElementOptions
  ) => {
    arrowNavigationApi.registerElement(element, id, elOptions)
  }, [])

  const unregisterElement = useCallback((element: HTMLElement) => {
    arrowNavigationApi.unregisterElement(element)
  }, [])

  useEffect(() => {
    arrowNavigationApi.registerGroup(ref.current as HTMLElement, options)
  }, [id])

  return {
    ref,
    groupId: id,
    registerElement,
    unregisterElement
  }
}
