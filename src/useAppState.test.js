import { wait } from "@apollo/react-testing"
import React from "react"
import useAppState from "./useAppState"
import gql from "graphql-tag"
import { mount } from "./test-utils/enzymeMounting"

const QUERY = gql`
  query Any($label: String) {
    hello(label: $label) @client
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

  test("different variables controls different states", async () => {
    function Component() {
      const [valueA, setValueA] = useAppState({
        query: QUERY,
        variables: { label: "A" }
      })

      const [valueB, setValueB] = useAppState({
        query: QUERY,
        variables: { label: "B" }
      })

      const onChange = fn => e => {
        fn(e.target.value)
      }

      return (
        <>
          <input
            data-label={"A"}
            value={valueA}
            onChange={onChange(setValueA)}
          />
          <input
            data-label={"B"}
            value={valueB}
            onChange={onChange(setValueB)}
          />
        </>
      )
    }

    const component = mount(<Component></Component>)

    const getEl = label => component.find(`[data-label='${label}']`)

    ;["A", "B"].forEach(label =>
      getEl(label).prop("onChange")({ target: { value: Math.random() + "" } })
    )

    await wait(0)
    component.update()

    const valueA = getEl("A").prop("value")
    const valueB = getEl("B").prop("value")

    expect(valueB).not.toBe(valueA)
  })
})
