import { createContext, createElement, ReactNode, useContext } from 'react'
import type { FocusableElementOptions, FocusableGroupOptions } from '@/types'
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
  const {
    ref,
    registerElement,
    unregisterElement
  } = useFocusableGroupContext({ id, options })

  return createElement(as, {
    ...props,
    ref,
    id,
    children: (
      <GroupContext.Provider value={{
        groupId: id,
        registerElement,
        unregisterElement
      }}>
        {children}
      </GroupContext.Provider>
    )
  })
}

export function useFocusableGroup() {
  const context = useContext(GroupContext)

  if (!context) {
    throw new Error('useFocusableGroup must be used within a FocusableGroup')
  }

  return context
}
