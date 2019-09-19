import { mount as enzymeMount, shallow as enzymeShallow } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"

const apolloOptions = {
  wrappingComponent: MockedProvider,
  wrappingComponentProps: { mocks: [] }
}

export const mount = a => enzymeMount(a, apolloOptions)
export const shallow = a => enzymeShallow(a, apolloOptions)
