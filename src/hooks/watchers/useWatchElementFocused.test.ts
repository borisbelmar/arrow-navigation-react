/* eslint-disable no-underscore-dangle */
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import useWatchElementFocused from './useWatchElementFocused'

describe('useWatchElementFocused', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should return correct state', () => {
    const api = getArrowNavigation()
    const element1 = document.createElement('button')
    element1.id = 'test-1'
    api.registerElement(element1, 'test-group', { nextElementByDirection: { right: 'test-2' } })

    const element2 = document.createElement('button')
    element2.id = 'test-2'
    api.registerElement(element2, 'test-group', { nextElementByDirection: { left: 'test-1' } })

    const { result } = renderHook(() => useWatchElementFocused('test-1'))

    expect(result.current).toBe(true)

    api._forceNavigate('ArrowRight')

    expect(result.current).toBe(false)

    api._forceNavigate('ArrowLeft')

    expect(result.current).toBe(true)
  })
})
