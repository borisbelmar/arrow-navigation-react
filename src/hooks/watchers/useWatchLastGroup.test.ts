/* eslint-disable no-underscore-dangle */
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import useWatchLastGroup from './useWatchLastGroup'

describe('useWatchLastGroup', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should execute callback when last group is reached', () => {
    const { result } = renderHook(() => useWatchLastGroup('right'))

    expect(result.current.reachedLastGroup).toBe(false)
    expect(result.current.group).toBeNull()

    const api = getArrowNavigation()

    const group1 = document.createElement('div')
    group1.id = 'test-group-1'
    api.registerGroup(group1, { nextGroupByDirection: { right: 'test-group-2' } })

    const group2 = document.createElement('div')
    group2.id = 'test-group-2'
    api.registerGroup(group2, { nextGroupByDirection: { left: 'test-group-1' } })

    const element1 = document.createElement('button')
    element1.id = 'test-1'
    api.registerElement(element1, 'test-group-1', { nextElementByDirection: { right: 'test-2' } })

    const element2 = document.createElement('button')
    element2.id = 'test-2'
    api.registerElement(element2, 'test-group-2', { nextElementByDirection: { left: 'test-1' } })

    expect(result.current.reachedLastGroup).toBe(false)

    api._forceNavigate('ArrowRight')

    expect(result.current.reachedLastGroup).toBe(true)

    api._forceNavigate('ArrowLeft')

    expect(result.current.reachedLastGroup).toBe(false)

    api._forceNavigate('ArrowRight')

    expect(result.current.reachedLastGroup).toBe(true)
  })
})
