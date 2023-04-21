import { useFocusableGroup } from '@/components/FocusableGroup/FocusableGroup'
import type { FocusableElementOptions } from '@/types'
import { useEffect, useRef } from 'react'

type Props = {
  options?: FocusableElementOptions
}

export default function useFocusableElement({ options }: Props = {}) {
  const ref = useRef<HTMLElement>(null)
  const { registerElement, unregisterElement } = useFocusableGroup()

  useEffect(() => {
    const element = ref.current
    if (element) {
      registerElement(ref.current, options)
    }

    return () => {
      if (element) {
        unregisterElement(ref.current)
      }
    }
  }, [options])

  return ref
}
