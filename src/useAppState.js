import _ from "lodash"
import { useQuery, useApolloClient } from "@apollo/react-hooks"

export default function useAppState({ query, variables } = {}) {
  if (_.isEmpty(query)) throw new Error("Missing query")

  const { data } = useQuery(query, {
    fetchPolicy: "cache-only",
    ...(variables ? { variables } : {})
  })

  const queryField = getQueryField(query)

  const appState = _.get(data, queryField)
  const setAppState = useWriteQuery({ query, variables })

  return [appState, setAppState]
}

function useWriteQuery({ query, variables }) {
  const client = useApolloClient()
  const queryField = getQueryField(query)
  return function writeQuery(data) {
    client.writeQuery({
      query,
      ...(variables ? { variables } : {}),
      data: { [queryField]: data }
    })
  }
}

function getQueryField(query) {
  const operation = _.get(query, "definitions").find(
    q => q.operation === "query"
  )

  if (!operation) throw new Error("You should pass an query operation")

  const queryField = _.get(operation, "selectionSet.selections.0.name.value")

  return queryField
}
