## react-native-reader

An iOS/Android lightning fast react-native that renders any web url into a clean reader to display content.

Main Feature:

- This provides a Safari readerMode like feel that display's content cleanly (For Reading)

How to use:

- Just pass in a Url into the component and your good to go.

## Installation Instructions

```bash
$ npm install react-native-reader
```

or

```bash
$ yarn add react-native-reader
```

## Example

![Alt Text](https://i.imgur.com/WeROrao.gif)

```typescript
import ReaderView from "react-native-reader";

<ReaderView url="https://www.nytimes.com" title="The Earth is Flat" />;
```

## Available Props

| prop                 | default   | type      | description                                                                                                     |
| -------------------- | --------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| url                  | ""        | string    | Required: A valid web url source                                                                                |
| renderLoader         | null      | Component | Optional: A custom component to render while your content is being loaded                                       |
| title                | ""        | string    | Optional: A title to enforce for the content. Helps when a website has multiple h1 tags or (dirty html)         |
| titleStyle           | undefined | object    | Optional: Controls the styling of the title component of the reader.                                            |
| containerStyle       | undefined | object    | Optional: Controls the styling of the outer wrapper of the reader.                                              |
| loaderContainerStyle | undefined | object    | Optional: Controls the styling of the container for the spinner that appears when content is loading            |
| indicatorProps       | undefined | object    | Optional: Exposes all [ActivityIndicator](https://facebook.github.io/react-native/docs/activityindicator) props |
| onError              | null      | function  | Optional: A function that fires the error if a url is not valid                                                 |

This package also exposes every prop for react-native-htmlview. For the list of all available props check out [Other Props](https://github.com/archriss/react-native-htmlview)
