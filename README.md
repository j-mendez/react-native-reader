## react-native-webview-readability

This package uses Readability to provide a nice experience for displaying content from any website or url

Main Feature:

- This provides a Safari readerMode like feel that display's content cleanly (For Reading)

How to use:

- Just pass in a Url into the component and your good to go.

## Installation Instructions

```bash
$ npm install react-native-webview-readability
```

Follow [Getting Started](https://github.com/react-native-community/react-native-webview/blob/master/docs/Getting-Started.md) if react-native-webview is not installed or simply.

```bash
$ react-native link react-native-webview
```

## Example

![Alt Text](https://i.imgur.com/WeROrao.gif)

```typescript
import ReadabilityWebView from "react-native-webview-readability";

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
  title="The Earth is Flat"
/>;
```

## Available Props

| prop                 | default   | type      | description                                                                                                     |
| -------------------- | --------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| url                  | ""        | string    | Required: A valid web url source                                                                                |
| htmlCss              | ""        | string    | Optional: Css StyleSheet in a string format. Follow the default template for a start                            |
| readerMode           | true      | boolean   | Optional: Render the view with a Safari reader Mode Feel                                                        |
| renderLoader         | null      | Component | Optional: A custom component to render while your content is being loaded                                       |
| title                | ""        | string    | Optional: A title to enforce for the content. Helps when a website has multiple h1 tags or (dirty html)         |
| containerStyle       | undefined | object    | Optional: Controls the styling of the outer wrapper of the webview. (Useful for animations)                     |
| loaderContainerStyle | undefined | object    | Optional: Controls the styling of the container for the spinner that appears when content is loading            |
| indicatorProps       | undefined | object    | Optional: Exposes all [ActivityIndicator](https://facebook.github.io/react-native/docs/activityindicator) props |
| onError              | null      | function  | Optional: A function that fires the error if a url is not valid                                                 |

This package also exposes every prop for react-native-webview. For the list of all available props check out [Other Props](https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#style)

## Experimental Branch (Webview Removal)

Checkout the experimental/react-native-reader branch for webview dependancy removal and true native solution to parse any website into a reading view. You can install the dependancy with npm install react-native-reader and just drop in the new package to try it out.
