import React from "react"
import ApolloClient, { gql } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import useAppState from "./useAppState/src"

function App() {
  const classes = {}

  return (
    <div className="App">
      <div className={classes.wrapper}>
        <Counter label="A"></Counter>
        <AddOneButton label="A"></AddOneButton>
      </div>

      <div className={classes.wrapper}>
        <Counter label="B"></Counter>
        <AddOneButton label="B"></AddOneButton>
      </div>
    </div>
  )
}

const COUNTER = gql`
  query Counter($label: ID) {
    counter(label: $label) @client
  }
`

function Counter({ label }) {
  const [counter = 0] = useAppState({
    query: COUNTER,
    variables: { label }
  })

  return counter
}

function AddOneButton({ label }) {
  const [counter, setCounter] = useAppState({
    query: COUNTER,
    variables: { label }
  })

  return (
    <button onClick={() => setCounter((counter || 0) + 1)}>
      ADD ONE TO {label}
    </button>
  )
}

export default () => (
  <ApolloProvider client={new ApolloClient()}>
    <App></App>
  </ApolloProvider>
)
