import { initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import React, { RefObject } from 'react'
import { FocusableGroup } from '..'
import useFocusableElement from './useFocusableElement'

describe('useFocusableElement', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should throw an error if used without a FocusableGroup', () => {
    const mockRef = {
      current: {
        id: 'test-element'
      }
    } as RefObject<HTMLButtonElement>
    const { result } = renderHook(() => useFocusableElement({ ref: mockRef }))

    expect(result.error).toBeDefined()
    expect(result.error?.message).toBe('useFocusableGroup must be used within a FocusableGroup')
  })

  it('should register and unregister an element based on mount and dismount', () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: {
        id: 'test-group'
      }
    })

    const mockRef = {
      current: {
        id: 'test-element',
        matches: () => true,
        getAttribute: () => null,
        setAttribute: jest.fn(),
        focus: jest.fn()
      }
    } as unknown as RefObject<HTMLButtonElement>

    const { result } = renderHook(() => useFocusableElement({ ref: mockRef }), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <FocusableGroup id="test-group">
          {children}
        </FocusableGroup>
      )
    })

    expect(result.current).toBeUndefined()
  })
})
