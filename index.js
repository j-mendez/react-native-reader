import React, { PureComponent } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import Readability from "./util/readability";
import cleanHtmlTemplate from "./util/cleanHtmlTemplate";
import cleanHtmlCss from "./util/cleanHtmlCss";

const css = `
  body {
    color: #2a2a2a;
    font-family: sans-serif, normal, San Francisco;
  }
  img, figure {
    display: none;
  }
  h1 {
    border-bottom-width: 1px;
    border-color: #ccc;
    padding-bottom: 3px;
    border-bottom-style:solid;
    font-size: 1.6em;
    font-weight: bold;
    margin-bottom: 5px;
    letter-spacing: .05em;
  }
  p {
    letter-spacing: .03em;
  }
`;

export default class ReadabilityWebView extends PureComponent {
  static defaultProps = {
    url: "",
    htmlCss: css,
    title: "",
    onError: null,
    readerMode: true,
    renderLoader: null
  };

  state = {
    cleanHtmlSource: undefined,
    readabilityArticle: null
  };

  refreshCSS = () => {
    if (this.state.readabilityArticle) {
      this.setState({
        cleanHtmlSource: cleanHtmlTemplate(
          this.props.htmlCss,
          props.title || this.state.readabilityArticle.title,
          this.state.readabilityArticle.content
        )
      });
    }
  };

  async componentDidMount() {
    const { url, htmlCss, title, readerMode } = this.props;

    if (!readerMode) {
      this.setState({ cleanHtmlSource: false });
      return;
    }
    try {
      const response = await fetch(url);
      const html = await response.text();
      let cleanHtml = "";

      const readabilityArticle = await Readability.cleanHtml(html, url);

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
      this.refreshCSS();
    }
  }

  render() {
    return (
      <View style={styles.flex}>
        {this.state.cleanHtmlSource === undefined ? (
          this.props.renderLoader ? (
            this.props.renderLoader
          ) : (
            <View style={[styles.flex, styles.loadingContainer]}>
              <ActivityIndicator />
            </View>
          )
        ) : this.state.cleanHtmlSource === false ? (
          <WebView style={styles.flex} source={{ uri: this.props.url }} />
        ) : (
          <WebView
            style={styles.flex}
            source={{
              html: this.state.cleanHtmlSource,
              baseUrl: this.props.url
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
