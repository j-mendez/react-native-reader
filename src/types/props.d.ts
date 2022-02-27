import type { ElementType } from "react"
import { StyleProp, TextStyle, ViewStyle, ViewProps } from "react-native"
import type { Config as CleanHtmlConfig } from "clean-html-js"

export interface LoaderProps {
  renderLoader?: ElementType
  indicatorProps?: ViewProps
  loadingContainerStyle?: StyleProp<ViewStyle>
  styles: StyleProp<any>
}

export interface BodyProps {
  titleStyle?: StyleProp<TextStyle>
  title?: string
  styles: StyleProp<any>
  contentContainerStyle?: StyleProp<ViewStyle>
}

export interface Props {
  lazy?: boolean
  config?: CleanHtmlConfig
  errorPage?: string
  url: string
  title?: string
  onError?(e?: Error)
  renderLoader?: any
  indicatorProps?: ViewProps
  containerStyle?: StyleProp<ViewStyle>
  loadingContainerStyle?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}
