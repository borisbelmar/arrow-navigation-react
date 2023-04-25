/* eslint-disable no-underscore-dangle */
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import useWatchLastElement from './useWatchLastElement'

describe('useWatchLastElement', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should execute callback when last element is reached', () => {
    const { result } = renderHook(() => useWatchLastElement('right'))

    expect(result.current.reachedLastElement).toBe(false)
    expect(result.current.element).toBeNull()

    const api = getArrowNavigation()

    const element1 = document.createElement('button')
    element1.id = 'test-1'
    api.registerElement(element1, 'test-group', { nextElementByDirection: { right: 'test-2' } })

    const element2 = document.createElement('button')
    element2.id = 'test-2'
    api.registerElement(element2, 'test-group', { nextElementByDirection: { left: 'test-1' } })

    api._forceNavigate('ArrowRight')

    expect(result.current.reachedLastElement).toBe(true)

    api._forceNavigate('ArrowLeft')

    expect(result.current.reachedLastElement).toBe(false)

    api._forceNavigate('ArrowRight')

    expect(result.current.reachedLastElement).toBe(true)
  })
})
