import renderer from "react-test-renderer"
import React from "react"

test("adds 1+2 to equal 3", () => {
  const tree = renderer
    .create(<Link page="https://gogole.co">Google</Link>)
    .toJSON()

  expect(tree).toMatchSnapshot()
  // expect(sum(1, 2)).to.be.equal(3);
})

function Link({ children, page }) {
  return <a href={page}>{children}</a>
}

const testRenderer = renderer.create(
  <Link page="https://google.com">
    Facebook
    <a href="">Hey</a>
  </Link>
)

console.log(testRenderer.toJSON())
