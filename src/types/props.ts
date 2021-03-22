import type { ElementType } from "react"
import { StyleProp, TextStyle, ViewStyle, ViewProps } from "react-native"
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import type { Config as CleanHtmlConfig } from "clean-html-js"

export interface LoaderProps {
  renderLoader?: ElementType
  indicatorProps?: ViewProps
  loadingContainerStyle?: StyleProp<ViewStyle>
  styles: StyleObj | Array<StyleObj>
}

export interface BodyProps {
  titleStyle?: StyleProp<TextStyle>
  title?: string
  styles: StyleObj | Array<StyleObj>
}

export interface Props {
  config?: CleanHtmlConfig
  errorPage?: string
  url: string
  title?: string
  onError?(e?: Error)
  renderLoader?: any
  indicatorProps?: ViewProps
  loadingContainerStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}
