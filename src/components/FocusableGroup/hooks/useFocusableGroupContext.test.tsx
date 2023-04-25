/* eslint-disable no-underscore-dangle */
import { RefObject } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import useFocusableGroupContext from './useFocusableGroupContext'

describe('useFocusableGroupContext', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  const TEST_GROUP_ID = 'test-group'

  const ref = {
    current: {
      id: TEST_GROUP_ID
    }
  } as RefObject<HTMLElement>

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should register a group', () => {
    const { result } = renderHook(() => useFocusableGroupContext({ groupRef: ref }))

    const api = getArrowNavigation()

    expect(result.current.groupId).toBe(TEST_GROUP_ID)
    expect(result.current.registerElement).toBeDefined()
    expect(result.current.unregisterElement).toBeDefined()
    expect(api.getGroupConfig(TEST_GROUP_ID)).toBeDefined()
  })

  it('should register and unregister an element from group', () => {
    const { result } = renderHook(() => useFocusableGroupContext({ groupRef: ref }))
    const element = document.createElement('button')
    element.id = 'test-element'
    result.current.registerElement(element)

    const api = getArrowNavigation()

    expect(api.getRegisteredElements().has(element.id)).toBeDefined()
    expect(api._getState()?.groups.get(TEST_GROUP_ID)?.elements.has(element.id)).toBeDefined()

    result.current.unregisterElement(element)

    expect(api.getRegisteredElements().has(element.id)).toBeFalsy()
    expect(api._getState()?.groups.get(TEST_GROUP_ID)?.elements.has(element.id)).toBeFalsy()
  })

  it('should throw an error if used without a ref node without id', () => {
    const { result } = renderHook(() => useFocusableGroupContext({ groupRef: { current: null } }))

    expect(result.error).toBeDefined()
    expect(result.error?.message).toBe('groupRef must be a ref object with a current property containing a HTMLElement with an id')
  })
})
