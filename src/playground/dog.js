import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

// Make sure the query is also exported -- not just the component
export const GET_DOG_QUERY = gql`
  query getDog($name: String) {
    dog(name: $name) {
      id
      name
      breed
    }
  }
`

export function Dog({ name }) {
  const { loading, error, data } = useQuery(GET_DOG_QUERY, {
    variables: { name }
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  const lero = `${data.dog.name} is a ${data.dog.breed}`

  return <p>{lero}</p>
}
