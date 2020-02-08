import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text
} from "react-native";
import HTMLView from "react-native-htmlview";
import { cleanHtml } from "clean-html-js";

class ReadabilityView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cleanHtmlSource: undefined
    };

    this.parseHtml = this.parseHtml.bind(this);
  }

  componentDidMount() {
    this.parseHtml();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.url !== prevProps.url ||
      this.props.title !== prevProps.title
    ) {
      this.parseHtml();
    }
  }

  async parseHtml() {
    const { url, title, onError } = this.props;

    try {
      const response = await fetch(url);
      const html = await response.text();
      const readabilityArticle = await cleanHtml(html, url);

      this.setState({
        cleanHtmlSource: !readabilityArticle
          ? `<h1>Sorry, issue parsing ${url}</h1>`
          : readabilityArticle.content
      });
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }
  }

  render() {
    const {
      containerStyle,
      loadingContainerStyle,
      titleStyle,
      indicatorProps,
      renderLoader,
      title
    } = this.props;
    const { cleanHtmlSource } = this.state;

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
            {title ? (
              <Text style={[styles.title, titleStyle]}>{title}</Text>
            ) : null}
            <HTMLView value={cleanHtmlSource} {...this.props} />
          </ScrollView>
        )}
      </View>
    );
  }
}

ReadabilityView.defaultProps = {
  url: "",
  title: "",
  onError: null,
  renderLoader: null,
  indicatorProps: {},
  loadingContainerStyle: {},
  containerStyle: {},
  titleStyle: {}
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "600"
  },
  container: {
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

export default ReadabilityView;
