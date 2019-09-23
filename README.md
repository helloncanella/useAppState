# useAppState

Control the whole app's state with the ease of an `useState`.

## Introduction

This hook aims to work as an utility to simplify state management, on Apollo Client backed projects.

It was conceived to offer the same dev's experience provided by React's `useState` hook.

## Simple example

Take the situation where we need to open and close a floating menu.

A simple scenario would be the necessity to control its openness from a component, and access its state (`open` and `close`) from another.

```js
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

```js
useQuery({
  query: A_QUERY,
  variables: { variableA: "hello", variableB: "world" }
})
```

### Example: Manage the state of two counters

Let's show how we can manage the state of two counters, A and B, with the use of variables.

Here, our rendered component might have the following structure:

```jsx
<>
  <div className="A">
    <Counter label="A"></Counter>
    <AddOneButton label="A"></AddOneButton>
  </div>

  <div className="B">
    <Counter label="B"></Counter>
    <AddOneButton label="B"></AddOneButton>
  </div>
</>
```

`Counter` is responsible for the rendering of the count, while `AddOneButton` provides a button that simply adds one to this amount, once clicked. Here, the `label` prop will be used only to differentiate the two counters.

```jsx
function Counter({ label }) {
  const { count } = useCount({ label })
  return <p>{count || 0}</p>
}

function AddOneButton({ label }) {
  const { setCount } = useCount({ label })
  const addOne = () => setCount((count || 0) + 1)

  return <button onClick={addOne}>Add one</button>
}
```

Above we opt to isolate the manipulation of `useAppState` in a custom hook, we called `useCount`, that may be like below.

```js
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

```js
const LIST = gql`
  query List($date: DateTime!) {
    list(date: $date) {
      id
      name
      timestamp
    }
  }
`

const [list, setList] = useAppCache({
  query: LIST,
  variables: { date: today }
})

setList([
  ...list,
  { id: "1234", name: "Item's name", timestamp: new Date().getTime() }
])
```

# Under the hood

In
