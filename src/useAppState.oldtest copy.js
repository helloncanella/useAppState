import { MockedProvider } from "@apollo/react-testing"
import React from "react"
import { act, create } from "react-test-renderer"
import useAppState from "."
import gql from "graphql-tag"
import wait from "waait"

const QUERY = gql`
  query {
    pressCount @client
  }
`

function Counter({ className }) {
  const [pressCount] = useAppState({ query: QUERY })
  return <p className={`label-${className}`}>{pressCount || 0}</p>
}

function AddOneButton() {
  const [pressCount, changeCount] = useAppState({ query: QUERY })
  const addOne = () => changeCount((pressCount || 0) + 1)

  return <button onClick={addOne}>Change Count</button>
}

let component

test("values passed to setter is broadcasted to all components", async () => {
  await act(async () => {
    component = create(
      <MockedProvider mocks={[]} addTypename={false}>
        <div>
          <Counter className="A"></Counter>
          <Counter className="B"></Counter>
          <AddOneButton></AddOneButton>
        </div>
      </MockedProvider>
    )
  })

  const button = component.root.findByType("Button")
  console.log(button)
  // console.log(component.root.findByType(Counter))
  // console.log()

  expect(true).toBe(true)
  // console.log(root.toJSON())
})
