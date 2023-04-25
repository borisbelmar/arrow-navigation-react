import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import useListenElementFocused from './useListenElementFocused'

describe('useListenLastElementReached', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should execute callback when element with id is focused', () => {
    const cb = jest.fn()
    const id = 'test'
    const element = document.createElement('button')
    element.id = id

    const api = getArrowNavigation()

    const { result } = renderHook(() => useListenElementFocused(cb, id))

    expect(result.current).toBeUndefined()

    api.registerElement(element, 'test-group')

    expect(cb).toHaveBeenCalledTimes(1)
  })
})
