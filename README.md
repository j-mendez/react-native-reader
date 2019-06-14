## react-native-readability

This package uses Readability to provide a nice experience for displaying content from any website or url

Main Feature:

- This provides a Safari readerMode like feel that display's content cleanly (For Reading)

How to use:

- Just pass in a Url into the component and your good to go.

## Installation Instructions

```bash
$ npm install react-native-readability
```

or

```bash
$ yarn add react-native-readability
```

## Example

![Alt Text](https://i.imgur.com/WeROrao.gif)

```typescript
import ReadabilityView from "react-native-readability";

<ReadabilityView url="https://www.nytimes.com/" title="The Earth is Flat" />;
```

## Styling

In addition to your custom renderers, you can apply specific styles to HTML tags (`tagsStyles`) or HTML classes (`classesStyles`). You can also combine these styles with your custom renderers.

Styling options override themselves, so you might render a custom HTML tag with a [custom renderer](#creating-custom-renderers) like `<bluecircle>`, make it green with a class `<bluecircle class="make-me-green">` or make it red by styling the tag itself.

The default style of your custom renderer will be merged to the one from your `classesStyles` which will also be merged by the `style` attribute.

> **IMPORTANT NOTE : Do NOT use the `StyleSheet` API to create the styles you're going to feed to `tagsStyle` and `classesStyles`. Although it might look like it's working at first, the caching logic of `react-native` makes it impossible for this module to deep check each of your style to properly apply the precedence and priorities of your nested tags' styles.**

Here's a usage example

```javascript
// props
    tagsStyles: { i: { textAlign: 'center', fontStyle: 'italic', color: 'grey' } },
    classesStyles: { 'last-paragraph': { textAlign: 'right', color: 'teal', fontWeight: '800' } }

const html = `
    <i>Here, we have a style set on the "i" tag with the "tagsStyles" prop.</i>
    <p class="last-paragraph">Finally, this paragraph is styled through the classesStyles prop</p>`;
```

## Available Props

| prop                 | default   | type      | description                                                                                                     |
| -------------------- | --------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| url                  | ""        | string    | Required: A valid web url source                                                                                |
| readerMode           | true      | boolean   | Optional: Render the view with a Safari reader Mode Feel                                                        |
| renderLoader         | null      | Component | Optional: A custom component to render while your content is being loaded                                       |
| title                | ""        | string    | Optional: A title to enforce for the content. Helps when a website has multiple h1 tags or (dirty html)         |
| containerStyle       | undefined | object    | Optional: Controls the styling of the outer wrapper of the webview. (Useful for animations)                     |
| loaderContainerStyle | undefined | object    | Optional: Controls the styling of the container for the spinner that appears when content is loading            |
| indicatorProps       | undefined | object    | Optional: Exposes all [ActivityIndicator](https://facebook.github.io/react-native/docs/activityindicator) props |
| onError              | null      | function  | Optional: A function that fires the error if a url is not valid                                                 |

This package also exposes every prop for react-native-render-html. For the list of all available props check out [Other Props](https://github.com/archriss/react-native-render-html)
