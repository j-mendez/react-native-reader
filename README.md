## react-native-webview-readability

This package uses Readability to provide a clean experience for display content from a external URL source

Main Feature:

- This provides a Safari readerMode like feel that display's external content cleanly (For Reading)

How to use:

- Just pass in a external Url into the component and your good to go.

## Installation instructions

```bash
$ yarn add react-native-webview-readability
```
## Example usage

```typescript

import ReadabilityWebView from 'react-native-webview-readability';

const css = `
  body {
    color: #2a2a2a;
    font-family: sans-serif, Roboto, monospace;
  }
  img, figure {
    display: none;
  }
  h1 {
    border-bottom-width: 1px;
    border-color: #ccc;
    padding-bottom: 3px;
    border-bottom-style:solid;
    font-size: 1.6em;
    font-weight: bold;
    letter-spacing: .05em;
  }
  p {
    letter-spacing: .03em;
  }
`;

<ReadabilityWebView
  htmlCss={css}
  url="https://www.nytimes.com/"
  title="The Earth is Flat" />
```

## Available Props

| prop              | default                  | type          | description                                                                                             |
| ----------------- | ------------------------ | ------------- | ------------------------------------------------------------------------------------------------------- |
| url               | ''                       | string        | Required: A valid web url source                                                                        |
| htmlCss           | ''                       | string        | Optional: Css StyleSheet in a string format. Follow the default template for a start                    |
| readerMode        | true                     | boolean       | Optional: Render the view with a Safari reader Mode Feel                                                |
| renderLoader      | null                     | Component     | Optional: A custom component to render while your content is being loaded                               |
| title             | ''                       | string        | Optional: A title to enforce for the content.This helps when a website has multiple h1 tags(dirty html) |
| onError           | null                     | function      | Optional: A function that fires the error if a url is not valid                                         |
