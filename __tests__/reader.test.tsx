import React from "react";
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import fetchMock from "jest-fetch-mock";
import mock from "xhr-mock";
import Reader from "../src/reader";

describe("reader view rendering", () => {
  beforeAll(() => {
    mock.setup();
    fetchMock.disableMocks();
  });

  test("reader can render", async () => {
    const title = "The Earth is Flat";
    const url = process.env.URL || "https://www.nytimes.com";

    const { getByTestId, queryByTestId, toJSON } = render(
      <Reader url={url} title={title} />
    );

    await waitFor(() => expect(queryByTestId("reader-body")).toBeTruthy());

    expect(getByTestId("reader-title").props.children).toBe(title);

    expect(toJSON()).toMatchSnapshot();
  });
});
