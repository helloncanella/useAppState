import React from "react"
import { MockedProvider } from "@apollo/react-testing"
import renderer from "react-test-renderer"

// The component AND the query need to be exported
import { GET_DOG_QUERY, Dog } from "./dog" // ES6
const wait = require("waait")

it("renders without error", async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: "Buck" }
    },
    result: {
      data: { dog: { id: 1, name: "Buck", breed: "poodle" } }
    }
  }

  const component = renderer.create(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  )

  await wait(0) // wait for response

  const p = component.root.findByType("p")
  expect(p.children).toContain("Buck is a poodle")
})
