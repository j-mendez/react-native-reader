import React, { PureComponent } from "react"
import { ScrollView, View, Text } from "react-native"
import HTMLView from "react-native-htmlview"
import cleanHtml from "clean-html-js"
import { Body, Loader } from "./components"
import { styles } from "./styles/main"
import type { Config as CleanHtmlConfig } from "clean-html-js"
import type { State, Props } from "./types"

class ReadabilityView extends PureComponent<Props, State> {
  private mounted = false

  constructor(props) {
    super(props)
    this.parseHtml = this.parseHtml.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.parseHtml()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.parseHtml()
    }
  }

  async getData() {
    const { url, onError } = this.props

    try {
      const response = await fetch(url)
      return await response.text()
    } catch (error) {
      this.logError(error)
    }
  }

  async parseHtml() {
    const { config, url, title } = this.props
    const html = await this.getData()

    try {
      const readabilityArticle = await cleanHtml(html + "", url, config)
      this.setView(readabilityArticle)
    } catch (error) {
      this.logError(error)
    }
  }

  setView(readabilityArticle) {
    this.mounted &&
      this.setState({
        cleanHtmlSource: !readabilityArticle
          ? this.props.errorPage ||
            `<h1>Sorry, issue parsing ${this.props.url}</h1>`
          : readabilityArticle.content
      })
  }

  logError(error) {
    const { onError } = this.props
    onError ? onError(error) : console.error(error)
    this.setView(null)
  }

  render() {
    const cleanHtmlSource = this.state && this.state.cleanHtmlSource
    const props = { ...this.props, styles }

    return (
      <View style={[styles.flex, this.props.containerStyle]}>
        {!cleanHtmlSource ? (
          <Loader {...props} />
        ) : (
          <Body {...props}>
            <HTMLView value={cleanHtmlSource} {...this.props} />
          </Body>
        )}
      </View>
    )
  }
}

export default ReadabilityView
