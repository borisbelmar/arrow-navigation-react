/* eslint-disable no-underscore-dangle */
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import useWatchNextElement from './useWatchNextElement'

describe('useWatchNextElement', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should execute callback when last element is reached', () => {
    const { result } = renderHook(() => useWatchNextElement())

    expect(result.current.nextElement).toBeNull()
    expect(result.current.direction).toBeUndefined()

    const api = getArrowNavigation()

    const element1 = document.createElement('button')
    element1.id = 'test-1'
    api.registerElement(element1, 'test-group', { nextElementByDirection: { right: 'test-2' } })

    const element2 = document.createElement('button')
    element2.id = 'test-2'
    api.registerElement(element2, 'test-group', { nextElementByDirection: { left: 'test-1', right: 'test-3' } })

    const element3 = document.createElement('button')
    element3.id = 'test-3'
    api.registerElement(element3, 'test-group', { nextElementByDirection: { left: 'test-2' } })

    api._forceNavigate('ArrowRight')

    expect(result.current.nextElement).toBe('test-3')

    api._forceNavigate('ArrowLeft')

    expect(result.current.nextElement).toBe(null)

    api._forceNavigate('ArrowRight')

    expect(result.current.nextElement).toBe('test-3')

    api._forceNavigate('ArrowRight')

    expect(result.current.nextElement).toBe(null)
  })
})
