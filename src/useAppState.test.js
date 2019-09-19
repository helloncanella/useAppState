import { MockedProvider } from "@apollo/react-testing"
import React from "react"
import useAppState from "."
import gql from "graphql-tag"
import { mount } from "./test-utils/enzymeMounting"

describe("useAppState", () => {
  test("it allows communication between two isolated components", async () => {
    const valueA = ""
    const setValueInB = Math.random() + ""

    function Hello() {
      return <h1>Hello</h1>
    }

    console.log(mount(<Hello></Hello>).debug())

    expect(valueA).toBe(setValueInB)
  })
  test("different variables controls different states", async () => {})
})
