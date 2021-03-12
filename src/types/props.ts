import { StyleProp, TextStyle, ViewStyle, ViewProps } from "react-native";
import type { Config as CleanHtmlConfig } from "clean-html-js";

export interface Props {
  config?: CleanHtmlConfig;
  errorPage?: string;
  url: string;
  title?: string;
  onError?(e?: Error);
  renderLoader?: any;
  indicatorProps?: ViewProps;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}
