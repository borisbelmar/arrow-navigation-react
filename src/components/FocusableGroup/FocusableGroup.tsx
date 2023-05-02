import { createContext, createElement, ReactNode, useContext, useMemo, useRef } from 'react'
import type { FocusableElementOptions, FocusableGroupOptions } from '@arrow-navigation/core'
import useFocusableGroupContext from './hooks/useFocusableGroupContext'

type Props = {
  id: string
  children: ReactNode
  as?: React.ElementType
  options?: FocusableGroupOptions
} & React.HTMLAttributes<HTMLDivElement>

type ContextValue = {
  groupId: string
  registerElement: (element: HTMLElement, options?: FocusableElementOptions) => void
  unregisterElement: (element: HTMLElement) => void
}

const GroupContext = createContext<ContextValue | null>(null)

export function FocusableGroup({
  id,
  as = 'div',
  children,
  options,
  ...props
}: Props) {
  const ref = useRef(null)

  const {
    registerElement,
    unregisterElement
  } = useFocusableGroupContext({ groupRef: ref, options })

  const value = useMemo(() => ({
    groupId: id,
    registerElement,
    unregisterElement
  }), [id, registerElement, unregisterElement])

  return createElement(
    as,
    {
      ...props,
      ref,
      id
    },
    (
      <GroupContext.Provider value={value}>
        {children}
      </GroupContext.Provider>
    )
  )
}

export function useFocusableGroup() {
  const context = useContext(GroupContext)

  if (!context) {
    throw new Error('useFocusableGroup must be used within a FocusableGroup')
  }

  return context
}
