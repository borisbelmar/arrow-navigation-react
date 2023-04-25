/* eslint-disable no-underscore-dangle */
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import useWatchNextGroup from './useWatchNextGroup'

describe('useWatchNextGroup', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should execute callback when last group is reached', () => {
    const { result } = renderHook(() => useWatchNextGroup())

    expect(result.current.nextGroup).toBeNull()
    expect(result.current.direction).toBeUndefined()

    const api = getArrowNavigation()

    const group1 = document.createElement('div')
    group1.id = 'test-group-1'
    api.registerGroup(group1, { nextGroupByDirection: { right: 'test-group-2' } })

    const group2 = document.createElement('div')
    group2.id = 'test-group-2'
    api.registerGroup(group2, { nextGroupByDirection: { left: 'test-group-1', right: 'test-group-3' } })

    const group3 = document.createElement('div')
    group3.id = 'test-group-3'
    api.registerGroup(group3, { nextGroupByDirection: { left: 'test-group-2' } })

    const element1 = document.createElement('button')
    element1.id = 'test-1'
    api.registerElement(element1, 'test-group-1', { nextElementByDirection: { right: 'test-2' } })

    const element2 = document.createElement('button')
    element2.id = 'test-2'
    api.registerElement(element2, 'test-group-2', { nextElementByDirection: { left: 'test-1', right: 'test-3' } })

    const element3 = document.createElement('button')
    element3.id = 'test-3'
    api.registerElement(element3, 'test-group-3', { nextElementByDirection: { left: 'test-2' } })

    expect(result.current.nextGroup).toBeNull()

    api._forceNavigate('ArrowRight')

    expect(result.current.nextGroup).toBe('test-group-3')

    api._forceNavigate('ArrowLeft')

    expect(result.current.nextGroup).toBeNull()

    api._forceNavigate('ArrowRight')

    expect(result.current.nextGroup).toBe('test-group-3')
  })
})
