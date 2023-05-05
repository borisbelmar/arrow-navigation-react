# Arrow Navigation React

[![codecov](https://codecov.io/gh/borisbelmar/arrow-navigation-react/branch/main/graph/badge.svg?token=u655p5vrEe)](https://codecov.io/gh/borisbelmar/arrow-navigation-react)
[![install size](https://packagephobia.com/badge?p=@arrow-navigation/react)](https://packagephobia.com/result?p=@arrow-navigation/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


A light and performant React implementation for [@arrow-navigation/core]('https://www.npmjs.com/package/@arrow-navigation/core') package.

## Installation

```bash
npm install @arrow-navigation/react

# or

yarn add @arrow-navigation/react
```

## Usage

```jsx
import React from 'react'
import {
  initArrowNavigation,
  FocusableElement,
  FocusableGroup
} from '@arrow-navigation/react'

initArrowNavigation()

const App = () => {
  return (
    <div>
      <FocusableGroup id="group-1">
        <FocusableElement id="btn-1">
          Button 1
        </FocusableElement>
        <FocusableElement id="btn-2">
          Button 2
        </FocusableElement>
        <FocusableElement id="btn-3">
          Button 3
        </FocusableElement>
      </FocusableGroup>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## API

### `initArrowNavigation()`

Initializes the arrow navigation. This function should be called only once in your application.

### `FocusableGroup`

A wrapper component that groups a set of focusable elements.

#### Props

The `FocusableGroup` component will receive all HTML attributes and events for the HTML tag used as wrapper. Some important props are:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | string | - | The group id. Must be unique |
| as | string | div | The HTML tag to be used as wrapper |
| options | object | - | The options for the group. |
| options.onFocus | function | - | Callback function to be called when the group receives focus. It returns a object with focus result that includes prev, current and direction |
| options.onBlur | function | - | Callback function to be called when the group loses focus. It returns a object with focus result that includes next, current and direction |
| options.firstElement | string | - | The id of the first element to receive focus when the group receives focus |
| options.nextGroupByDirection | string | - | The direction to navigate when the last element of the group receives focus. Possible values are: 'up', 'down', 'left' and 'right' |
| options.saveLast | boolean | false | If true, the last focused element will be saved and used as firstElement |
| options.viewportSafe | boolean | true | If true, the navigation will be limited to the viewport |
| options.threshold | number | 0 | The threshold to intersection discriminator |
| options.keepFocus | boolean | false | If true, the focus will be kept in the group when the last element receives focus |

### `FocusableElement`

A wrapper component that makes an element focusable. The element must be a child of a `FocusableGroup` component and the HTML tag used as wrapper must be focusable, for example, `input`, `button`, `a`, `select`, `textarea`, etc.

#### Props

The `FocusableElement` component will receive all HTML attributes and events for the HTML tag used as wrapper. Some important props are:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | string | - | The element id. Must be unique |
| as | string | div | The HTML tag to be used as wrapper |
| options | object | - | The options for the element. |
| options.onFocus | function | - | Callback function to be called when the element receives focus. It returns a object with focus result that includes prev, current and direction |
| options.onBlur | function | - | Callback function to be called when the element loses focus. It returns a object with focus result that includes next, current and direction |
| options.nextElementByDirection | string | - | The direction to navigate when the element receives focus. Possible values are: 'up', 'down', 'left' and 'right' |

## Listeners

The `@arrow-navigation/react` package also provides some listeners to help you to implement your own navigation and complex behaviors.

### `useListenElementFocused`

Hook to listen when an element receives focus and trigger a callback function.

#### Usage

```jsx
import { useListenElementFocused } from '@arrow-navigation/react'

const App = () => {
  useListenElementFocused(() => {
    console.log('Button 1 focused')
  }, 'btn-1')

  return (
    <div>
      <FocusableGroup id="group-1">
        <FocusableElement id="btn-1">
          Button 1
        </FocusableElement>
        <FocusableElement id="btn-2">
          Button 2
        </FocusableElement>
      </FocusableGroup>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| callback | function | - | Callback function to be called when the element receives focus |
| id | string | - | The element id |

### `useListenLastElementReached`

Hook to listen when the last element of a group receives focus and trigger a callback function.

#### Usage

```jsx
import { useListenLastElementReached } from '@arrow-navigation/react'

const App = () => {
  useListenLastElementReached(() => {
    console.log('Last element reached')
  }, 'right')

  return (
    <div>
      <FocusableGroup id="group-1">
        <FocusableElement id="btn-1">
          Button 1
        </FocusableElement>
        <FocusableElement id="btn-2">
          Button 2
        </FocusableElement>
      </FocusableGroup>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| callback | function | - | Callback function to be called when the last element of a group receives focus |
| direction | string | - | The direction to navigate when the last element of a group receives focus. Possible values are: 'up', 'down', 'left' and 'right' |
| options | object | - | The options for the listener. |
| options.group | string | - | The group id. If not provided, the listener will be triggered for all groups |
| options.inGroup | boolean | false | If true, the listener will be triggered only when the last element of the group receives focus |
| options.elementPattern | RegExp | - | The pattern to match the element id. If not provided, the listener will be triggered for all elements |

### `useListenLastGroupReached`

Hook to listen when the last group of a group receives focus and trigger a callback function.

#### Usage

```jsx
import { useListenLastGroupReached } from '@arrow-navigation/react'

const App = () => {
  useListenLastGroupReached(() => {
    console.log('Last group reached')
  }, 'right')

  return (
    <div>
      <FocusableGroup id="group-1">
        <FocusableElement id="btn-1">
          Button 1
        </FocusableElement>
        <FocusableElement id="btn-2">
          Button 2
        </FocusableElement>
      </FocusableGroup>
      <FocusableGroup id="group-2">
        <FocusableElement id="btn-3">
          Button 3
        </FocusableElement>
        <FocusableElement id="btn-4">
          Button 4
        </FocusableElement>
      </FocusableGroup>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| callback | function | - | Callback function to be called when the last group of a group receives focus |
| direction | string | - | The direction to navigate when the last group of a group receives focus. Possible values are: 'up', 'down', 'left' and 'right' |
| options | object | - | The options for the listener. |
| options.groupPattern | RegExp | - | The pattern to match the group id. If not provided, the listener will be triggered for all groups |

## Watchers

The `@arrow-navigation/react` package also provides some watchers to help you to implement your own navigation and complex behaviors. The watchers are similar to the listeners, but they will subscribe a state and make it available to be used in your application. Take care will the watchers, because they can cause multiple renders and performance issues if not used properly.

### `useWatchElementFocused`

Hook to watch when an element receives focus and return a boolean state.

#### Usage

```jsx
import { useWatchElementFocused } from '@arrow-navigation/react'

const App = () => {
  const isBtn1Focused = useWatchElementFocused('btn-1')

  return (
    <div>
      <FocusableGroup id="group-1">
        <FocusableElement id="btn-1">
          Button 1
        </FocusableElement>
        <FocusableElement id="btn-2">
          Button 2
        </FocusableElement>
      </FocusableGroup>
      <div>
        {isBtn1Focused && <span>Button 1 is focused</span>}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | string | - | The element id |
