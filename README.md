# useAppState

Control the whole app's state with the ease of an `useState`.

## Introduction

This hook aims to work as an utility to simplify state management, on Apollo Client backed projects.

It was conceived to offer the same dev's experience provided by React's `useState` hook.

## Usage

[Check the live version](https://codesandbox.io/embed/toggling-menu-euqrk)

Take the situation where we need to open and close a floating menu.

A simple scenario would be the necessity to control its openness from a component, and access its state (`open` and `close`) from another.

```jsx
const OPENNESS = gql`
  query Openness {
    isOpen @client
  }
`

function ToggleButton() {
  const [isOpen, setIsOpen] = useAppState({ query: OPENNESS })
  const toggle = () => setIsOpen(!isOpen)
  return <button onClick={toggle}>{isOpen ? "close" : "open"}</button>
}

function Menu() {
  const [isOpen, setIsOpen] = useAppState({ query: OPENNESS })
  if (!isOpen) return null
  return <MenuComponent />
}
```

Here we are using the directive `@client`, that instructs apollo to not forward our operation to the server. For further info, refer to the [apollo documentation](https://www.apollographql.com/docs/react/essentials/local-state/).

## Variables

You may want to assign variables to your queries. In that case, do:

```jsx
useAppState({
  query: A_QUERY,
  variables: { variableA: "hello", variableB: "world" }
})
```

### Example: Manage the state of two counters

[Check the live version](https://codesandbox.io/embed/late-surf-wtjpb)

Let's show how we can manage the state of two counters, A and B, with the use of variables.

Here, our rendered component might have the following structure:

```jsx
<div className="counter-A">
  <Counter label="A"></Counter>
  <AddOneButton label="A"></AddOneButton>
</div>

<div className="counter-B">
  <Counter label="B"></Counter>
  <AddOneButton label="B"></AddOneButton>
</div>
```

`Counter` is responsible for the rendering of the count, while `AddOneButton` provides a button that simply adds one to this amount, once clicked. Here, the prop `label` will be used only to differentiate the two counters.

```jsx
function Counter({ label }) {
  const { count } = useCount({ label })
  return <p>{count || 0}</p>
}

function AddOneButton({ label }) {
  const { count, setCount } = useCount({ label })
  const addOne = () => setCount((count || 0) + 1)

  return <button onClick={addOne}>Add one</button>
}
```

We opt to isolate the manipulation of `useAppState` in a custom hook, we called `useCount`, that may be like below.

```jsx
function useCount({ label }) {
  const COUNT = gql`
    query Count($label: ID) {
      count(label: $label) @client
    }
  `

  const [count, setCount] = useAppState({
    query: COUNT,
    variables: { label }
  })

  return { count, setCount }
}
```

Observe the use of variables. With this strategy, we are able to differentiate the A's and B's state.

## Updating cached network's data

The previous examples focused on the manipulation of data tagged by directive `@client`. However, `useAppState` can be used to manipulate any kind of data stored in the cache, including what is fetched from the server or any other external source.

### Example: update a list

[Check the live version](https://codesandbox.io/embed/todolist-kyjel)

```jsx
const LIST = gql`
  query List($category: String!) {
    list(category: $category) {
      id
      description      
    }
  }
`

const [list, setList] = useAppState({ query: LIST, category: "to-be-done" })

const todo = { id: "1234", description: "Cat to the vet 🐱 🏥‍ ", __typename: "Item" }

setList([ ...(list || []), todo])
```

## Under the hood

Internally `useAppState` uses the hook `useQuery`, [released](https://blog.apollographql.com/apollo-client-now-with-react-hooks-676d116eeae2) in August, 2019, to reactively get the query's state. At same time, a call to `client.writeQuery` is wrapped by its setter .

As long as we are only interested in the cache manipulation, the `useQuery`'s options parameter `fetchPolicy` receives the value `cache-only`.

The source code involves one file with few lines and it is available [here](https://github.com/helloncanella/useAppState/blob/master/src/useAppState.js).

## Installation

### 1. "I have an apollo project setup"

- Install `useAppState` and `@apollo/react-hooks`.

```
 npm --save install @helloncanella/useAppState @apollo/react-hooks
```

- Wrap the root of your application with `ApolloProvider`, exported by `@apollo/react-hooks`

```js
import React from "react"
import { render } from "react-dom"

import { ApolloProvider } from "@apollo/react-hooks"

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My apollo App 🚀</h2>
    </div>
  </ApolloProvider>
)

render(<App />, document.getElementById("root"))
```

### 2. "I don't have an apollo project setup"

- Install `useAppState`

```
 npm --save install @helloncanella/useAppState
```

- Follow the steps described [here](https://www.apollographql.com/docs/react/essentials/get-started/)

## API

`useAppState(options)`

| Option    |          Type          | Description                                                                        |
| --------- | :--------------------: | ---------------------------------------------------------------------------------- |
| query     |      DocumentNode      | A GraphQL query document parsed into an AST by graphql-tag. _(required)_           |
| variables | { [key: string]: any } | An object containing all of the variables your query needs to execute _(optional)_ |
