import React, { PureComponent } from "react"
import { ScrollView, Text } from "react-native"
import type { Config as CleanHtmlConfig } from "clean-html-js"
import type { BodyProps as Props } from "../types"

export class Body extends PureComponent<Props> {
  render() {
    const { title, styles } = this.props

    return (
      <ScrollView
        style={[styles.flex, styles.container]}
        contentContainerStyle={this.props.contentContainerStyle}
        testID="reader-body"
      >
        {title ? (
          <Text
            testID="reader-title"
            style={[styles.title, this.props.titleStyle]}
          >
            {title}
          </Text>
        ) : null}
        {this.props.children}
      </ScrollView>
    )
  }
}
