import { createElement } from 'react'
import type { FocusableByDirection, FocusableElementOptions } from '@arrow-navigation/core'
import { useFocusableElement } from '..'

export type Options = {
  order?: FocusableElementOptions['order']
  onFocus?: FocusableElementOptions['onFocus']
  onBlur?: FocusableElementOptions['onBlur']
  nextUp?: FocusableByDirection['up']
  nextDown?: FocusableByDirection['down']
  nextLeft?: FocusableByDirection['left']
  nextRight?: FocusableByDirection['right']
}

type Props = {
  id: string
  children: React.ReactNode
  as?: React.ElementType
} & Options & React.HTMLAttributes<HTMLDivElement>

export default function FocusableElement({
  children,
  id,
  as = 'button',
  onFocus,
  onBlur,
  order,
  nextDown,
  nextLeft,
  nextRight,
  nextUp,
  ...props
}: Props) {
  useFocusableElement({
    id,
    nextDown,
    nextLeft,
    nextRight,
    nextUp,
    onFocus,
    onBlur,
    order
  })

  return createElement(
    as,
    { ...props, id },
    children
  )
}
