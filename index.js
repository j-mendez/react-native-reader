import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import HTML from "react-native-render-html";

import {
  cleanHtml,
  cleanHtmlCss,
  cleanHtmlTemplate,
  defaultHtmlCss
} from "./util";

export default class ReadabilityWebView extends PureComponent {
  static defaultProps = {
    url: "",
    htmlCss: defaultHtmlCss,
    title: "",
    onError: null,
    readerMode: true,
    renderLoader: null
  };

  state = {
    cleanHtmlSource: undefined,
    readabilityArticle: null
  };

  async componentDidMount() {
    const { url, htmlCss, title, readerMode } = this.props;

    if (!readerMode) {
      this.toggleReaderMode();
      return;
    }
    try {
      const response = await fetch(url);
      const html = await response.text();
      const readabilityArticle = await cleanHtml(html, url);

      this.setState({
        cleanHtmlSource: !readabilityArticle
          ? false
          : cleanHtmlTemplate(
              htmlCss ? htmlCss : cleanHtmlCss,
              title || readabilityArticle.title,
              readabilityArticle.content
            ),
        readabilityArticle
      });
    } catch (err) {
      if (this.props.onError) {
        this.props.onError(err);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.htmlCss !== prevProps.htmlCss) {
      this.refreshHtml();
    } else if (this.props.readerMode !== prevProps.readerMode) {
      this.toggleReaderMode(this.props.readerMode);
    }
  }

  refreshHtml = () => {
    if (this.state.readabilityArticle) {
      this.setState({
        cleanHtmlSource: cleanHtmlTemplate(
          this.props.htmlCss,
          this.props.title || this.state.readabilityArticle.title,
          this.state.readabilityArticle.content
        )
      });
    }
  };

  toggleReaderMode = (cleanHtmlSource = false) => {
    if (!cleanHtmlSource) {
      this.setState({ cleanHtmlSource });
    } else {
      this.refreshHtml();
    }
  };

  render() {
    const {
      containerStyle,
      loadingContainerStyle,
      indicatorProps,
      url,
      renderLoader
    } = this.props;
    const { cleanHtmlSource } = this.state;

    const htmlProps = !cleanHtmlSource
      ? { uri: url }
      : { html: cleanHtmlSource };

    return (
      <View style={[styles.flex, containerStyle]}>
        {cleanHtmlSource === undefined ? (
          renderLoader ? (
            renderLoader
          ) : (
            <View
              style={[
                styles.flex,
                styles.loadingContainer,
                loadingContainerStyle
              ]}
            >
              <ActivityIndicator {...indicatorProps} />
            </View>
          )
        ) : (
          <ScrollView style={[styles.flex, styles.container]}>
            <HTML
              {...this.props}
              {...htmlProps}
              imagesMaxWidth={Dimensions.get("window").width}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    paddingHorizontal: 8
  },
  flex: {
    flex: 1
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
