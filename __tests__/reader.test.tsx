import React from "react"
import { cleanup, render, waitFor } from "@testing-library/react-native"
import fetchMock from "jest-fetch-mock"
import mock from "xhr-mock"
import Reader from "../src/reader"

describe("reader", () => {
  afterEach(cleanup)

  beforeAll(() => {
    mock.setup()
    fetchMock.disableMocks()
  })

  const url = process.env.URL || "https://www.nytimes.com"
  const bodyId = "reader-body"

  test("can render", async () => {
    const title = "The Earth is Flat"

    const { getByTestId, queryByTestId, toJSON } = render(
      <Reader url={url} title={title} />
    )

    await waitFor(() => expect(queryByTestId(bodyId)).toBeTruthy())

    expect(getByTestId("reader-title").props.children).toBe(title)

    expect(toJSON()).toMatchSnapshot()
  })

  test("can render error", async () => {
    const { queryByTestId, toJSON } = render(
      <Reader url={"https://www.w.com"} />
    )

    await waitFor(() => expect(queryByTestId(bodyId)).toBeTruthy())

    expect(toJSON()).toMatchSnapshot()
  })

  describe("lazy loading", () => {
    test("can lazily render", async () => {
      const ref = React.createRef<Reader>()

      const { queryByTestId, rerender, toJSON } = render(
        React.createElement(Reader, {
          url,
          lazy: true,
          ref
        })
      )

      await waitFor(() => expect(queryByTestId(bodyId)).toBeNull())

      await ref.current!.parseHtml()

      await waitFor(() => expect(queryByTestId(bodyId)).toBeTruthy())

      expect(toJSON()).toMatchSnapshot()
    })

    test("can load on lazy prop update", async () => {
      const { queryByTestId, rerender, toJSON } = render(
        <Reader url={url} lazy />
      )

      await waitFor(() => expect(queryByTestId(bodyId)).toBeNull())

      rerender(<Reader url={url} lazy={false} />)

      await waitFor(() => expect(queryByTestId(bodyId)).toBeTruthy())

      expect(toJSON()).toMatchSnapshot()
    })
  })
})
