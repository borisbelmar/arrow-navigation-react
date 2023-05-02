import { RefObject, useEffect } from 'react'
import type { FocusableElementOptions } from '@arrow-navigation/core'
import { useFocusableGroup } from '@/components/FocusableGroup/FocusableGroup'

type Props = {
  ref: RefObject<HTMLElement>
  options?: FocusableElementOptions
}

export default function useFocusableElement({ ref, options }: Props) {
  const { registerElement, unregisterElement } = useFocusableGroup()

  useEffect(() => {
    const element = ref?.current
    if (element) {
      registerElement(element, options)
    }

    return () => {
      if (element) {
        unregisterElement(element)
      }
    }
  }, [options, registerElement, unregisterElement, ref])
}
