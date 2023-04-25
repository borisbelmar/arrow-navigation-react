import { createElement, useRef } from 'react'
import { useFocusableElement } from '..'
import type { FocusableElementOptions } from '../types'

type Props = {
  children: React.ReactNode
  as?: React.ElementType
  options?: FocusableElementOptions
} & React.HTMLAttributes<HTMLDivElement>

export default function FocusableElement({
  children,
  as = 'button',
  options,
  ...props
}: Props) {
  const ref = useRef(null)
  useFocusableElement({ options, ref })

  return createElement(
    as,
    { ...props, ref },
    children
  )
}
