import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  Text,
  TextStyle,
  ViewStyle,
  ViewProps,
} from "react-native";
import HTMLView from "react-native-htmlview";
import { cleanHtml } from "clean-html-js";

interface Props {
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

interface State {
  cleanHtmlSource?: string;
}

class ReadabilityView extends PureComponent<Props, State> {
  private mounted = false;

  constructor(props) {
    super(props);
    this.parseHtml = this.parseHtml.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.parseHtml();
  }

  componentWillUnmount() {
    this.mounted = false;
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
    const { url, title, onError, errorPage } = this.props;

    try {
      const response = await fetch(url);
      const html = await response.text();
      const readabilityArticle = await cleanHtml(html, url);

      this.mounted &&
        this.setState({
          cleanHtmlSource: !readabilityArticle
            ? errorPage || `<h1>Sorry, issue parsing ${url}</h1>`
            : readabilityArticle.content,
        });
    } catch (e) {
      console.error(e);
      if (onError) {
        this.mounted && onError(e);
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
      title,
    } = this.props;
    const cleanHtmlSource = this.state && this.state.cleanHtmlSource;

    return (
      <View style={[styles.flex, containerStyle]}>
        {!cleanHtmlSource ? (
          renderLoader ? (
            renderLoader
          ) : (
            <View
              testID="reader-loader"
              style={[
                styles.flex,
                styles.loadingContainer,
                loadingContainerStyle,
              ]}
            >
              <ActivityIndicator {...indicatorProps} />
            </View>
          )
        ) : (
          <ScrollView
            style={[styles.flex, styles.container]}
            testID="reader-body"
          >
            {title ? (
              <Text testID="reader-title" style={[styles.title, titleStyle]}>
                {title}
              </Text>
            ) : null}
            <HTMLView value={cleanHtmlSource} {...this.props} />
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "600",
  },
  container: {
    paddingHorizontal: 8,
  },
  flex: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReadabilityView;
