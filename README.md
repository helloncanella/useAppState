# useAppState

Control the whole app's state with the facility of an `useState`.

## Introduction

This hook aims to work as an utility to simplify state management, on Apollo Client backed projects.

It was conceived to offer the same dev's experience provided by React's `useState` hook.

## Example

Imagine the situation where we need to open and close a floating menu.

A simple scenario would be the necessity to control its openness from a component, and access its state (`open` and `close`) from another - what might be the menu itself.

```js
const OPENNESS = gql`
  query Openness {
    isOpen @client
  }
`

function GenericComponent() {
  const [isOpen, setIsOpen] =  useAppState({query: OPENNESS})
  return <button onClick={()=>}>{isOpen ? "close" : "open"}</button>
}

function Menu() {
  const [isOpen, setIsOpen] =  useAppState({query: OPENNESS})

  if(!isOpen) return null

  return <MenuComponent />
}
```

Here we are using the directive `@client`, that instructs apollo to not forward our operation to the server. For more info refer to [here](https://www.apollographql.com/docs/react/essentials/local-state/)
