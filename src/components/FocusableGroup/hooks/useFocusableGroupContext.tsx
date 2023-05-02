import { getArrowNavigation } from '@arrow-navigation/core'
import { RefObject, useCallback, useEffect } from 'react'
import type { FocusableElementOptions, FocusableGroupOptions } from '@arrow-navigation/core'

interface Props {
  groupRef: RefObject<HTMLElement>
  options?: FocusableGroupOptions
}

export default function useFocusableGroupContext({ groupRef, options }: Props) {
  const arrowNavigationApi = getArrowNavigation()

  const registerElement = useCallback((
    element: HTMLElement,
    elOptions?: FocusableElementOptions
  ) => {
    arrowNavigationApi.registerElement(element, groupRef.current?.id || '', elOptions)
  }, [arrowNavigationApi, groupRef])

  const unregisterElement = useCallback((element: HTMLElement) => {
    arrowNavigationApi.unregisterElement(element)
  }, [arrowNavigationApi])

  useEffect(() => {
    if (!groupRef.current?.id) {
      throw new Error('groupRef must be a ref object with a current property containing a HTMLElement with an id')
    }
    arrowNavigationApi.registerGroup(groupRef.current as HTMLElement, options)
  }, [groupRef, options, arrowNavigationApi])

  return {
    groupId: groupRef.current?.id || '',
    registerElement,
    unregisterElement
  }
}
