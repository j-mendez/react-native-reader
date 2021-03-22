import React, { PureComponent } from "react"
import { ActivityIndicator, View } from "react-native"
import type { LoaderProps as Props } from "../types"

export class Loader extends PureComponent<Props> {
  render() {
    const {
      loadingContainerStyle,
      indicatorProps,
      renderLoader: RenderLoader,
      styles
    } = this.props

    if (RenderLoader) {
      return <RenderLoader />
    }

    return (
      <View
        testID="reader-loader"
        style={[styles.flex, styles.loadingContainer, loadingContainerStyle]}
      >
        <ActivityIndicator {...indicatorProps} />
      </View>
    )
  }
}
