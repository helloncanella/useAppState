import { MockedProvider, wait } from "@apollo/react-testing"
import React from "react"
import useAppState from "."
import gql from "graphql-tag"
import { mount } from "./test-utils/enzymeMounting"
import { useQuery } from "@apollo/react-hooks"

const QUERY = gql`
  query Any {
    hello @client
  }
`

describe("useAppState", () => {
  test("it allows communication between two isolated components", async () => {
    function ComponentA() {
      const [value] = useAppState({ query: QUERY })
      return <div data-value={value} />
    }

    function ComponentB() {
      const [__, setValue] = useAppState({ query: QUERY })
      return (
        <input
          type="text"
          onChange={e => {
            setValue(e.target.value)
          }}
        />
      )
    }

    const el = mount(
      <>
        {/* two isolated components */}
        <ComponentA></ComponentA>
        <ComponentB></ComponentB>
      </>
    )

    const elemB = el.find(ComponentB)

    const setValueInB = Math.random() + ""
    elemB.find("input").prop("onChange")({ target: { value: setValueInB } })

    await wait(0)

    el.update()

    const elemA = el.find(ComponentA)
    const valueA = elemA.find("div").prop("data-value")

    expect(valueA).toBe(setValueInB)
  })
  test("different variables controls different states", async () => {})
})
