import { useEffect, useMemo } from 'react'
import { useFocusableGroup } from '@/components/FocusableGroup/FocusableGroup'
import { Options } from '@/components/FocusableElement'
import { FocusableElementOptions } from '@arrow-navigation/core'

type Props = {
  id: string
} & Options

export default function useFocusableElement({
  id,
  nextDown,
  nextLeft,
  nextRight,
  nextUp,
  order,
  onBlur,
  onFocus
}: Props) {
  const { registerElement, unregisterElement } = useFocusableGroup()

  const options: FocusableElementOptions = useMemo(() => ({
    nextByDirection: {
      down: nextDown,
      left: nextLeft,
      right: nextRight,
      up: nextUp
    },
    order,
    onBlur,
    onFocus
  }), [
    nextDown,
    nextLeft,
    nextRight,
    nextUp,
    order,
    onBlur,
    onFocus
  ])

  useEffect(() => {
    registerElement(id, options)

    return () => {
      unregisterElement(id)
    }
  }, [options, registerElement, unregisterElement, id])
}
