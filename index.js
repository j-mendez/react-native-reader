import React, { PureComponent } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
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

      // return article obj so title and content are available
      this.props.exportArticle(readabilityArticle);

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
      indicatorProps
    } = this.props;

    return (
      <View style={[styles.flex, containerStyle]}>
        {this.state.cleanHtmlSource === undefined ? (
          this.props.renderLoader ? (
            this.props.renderLoader
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
          <WebView
            style={styles.flex}
            // useWebKit should be false to use custom fonts
            useWebKit={this.props.useWebKit ? 
              this.props.useWebKit : true
            }
            source={this.state.cleanHtmlSource === false ? 
            { 
              uri: this.props.url 
            } : {
              html: this.state.cleanHtmlSource,
              baseUrl: this.props.url
            }}
            {...this.props}
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
