import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import { WebView } from 'react-native-webview';
import Readability from './util/readability';
import cleanHtmlTemplate from './util/cleanHtmlTemplate';
import cleanHtmlCss from './util/cleanHtmlCss';

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

export default class ReadabilityWebView extends Component {
  static defaultProps = {
    url: '',
    htmlCss: css,
    title: '',
    onError: null,
    readerMode: true,
    renderLoader: null
  };

  state = {
    cleanHtmlSource: undefined,
    readabilityArticle: null,
  };

  refreshCSS = () => {
    this.state.readabilityArticle &&
      this.setState((state, props) => ({
        cleanHtmlSource: cleanHtmlTemplate(this.props.css, props.title || state.readabilityArticle.title, state.readabilityArticle.content)
      }));
  }

  async componentDidMount(){
    const { url, htmlCss, title, readerMode } = this.props;

    if(!readerMode) {
      this.setState({cleanHtmlSource: false});
      return;
    }
    try {
      const response = await fetch(url);
      const html = await response.text();
      let cleanHtml = '';

      const readabilityArticle = await Readability.cleanHtml(html, url);

      if(!readabilityArticle) {
        cleanHtml = false;
      } else if (htmlCss) {
        cleanHtml = cleanHtmlTemplate(htmlCss, title || readabilityArticle.title, readabilityArticle.content);
      } else {
        cleanHtml = cleanHtmlTemplate(cleanHtmlCss, title || readabilityArticle.title, readabilityArticle.content);
      }

      this.setState({
        cleanHtmlSource: cleanHtml,
        readabilityArticle
      });

    } catch (err) {
      if(this.props.onError) {
        this.props.onError(err);
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.css !== prevProps.css) {
      this.refreshCSS();
    }
    
  }

  render() {
    return (
       <View style={styles.flex}>
        { this.state.cleanHtmlSource === undefined ?
        (this.props.renderLoader ?
          this.props.renderLoader
            :
            <View
            style={[styles.flex, styles.loadingContainer]}
          >
            <ActivityIndicator />
          </View>
          )
         : (this.state.cleanHtmlSource === false ?
           <WebView
             style={ styles.flex }
             source={{uri: this.props.url}}
             />
           :
           <WebView
             style={ styles.flex }
             source={ {html: this.state.cleanHtmlSource, baseUrl: this.props.url}}
             />
         )
       }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
