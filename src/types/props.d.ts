import type { ElementType } from "react";
import { StyleProp, TextStyle, ViewStyle, ViewProps } from "react-native";
import type { Config as CleanHtmlConfig } from "clean-html-js";

export interface LoaderProps {
  renderLoader?: ElementType;
  indicatorProps?: ViewProps;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  styles: StyleProp<any>;
}

export interface BodyProps {
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
  styles: StyleProp<any>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export interface Props {
  lazy?: boolean;
  config?: CleanHtmlConfig;
  errorPage?: string;
  // a target url to get html content and provide sensible readability targeting.
  url: string;
  // a html string to render in place of the content from the url source.
  html?: string;
  // an extra visual heading to render for the page. [not the html title tag]
  title?: string;
  onError?(e?: Error);
  renderLoader?: any;
  indicatorProps?: ViewProps;
  containerStyle?: StyleProp<ViewStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}
