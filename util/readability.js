const Readability = require('readability-node').Readability;
const JSDOMParser = require('readability-node').JSDOMParser;
const DOMParser = require('xmldom-silent').DOMParser;
const XMLSerializer = require('xmldom-silent').XMLSerializer;
const UrlParser = require('url-parse');
const sanitizeHtml = require('sanitize-html');

exports.cleanHtml = function(html, sourceUrl) {
  html = sanitizeHtml(html, {
    allowedTags: [ 'html','body', 'p', 'h1', 'h2', 'h3','h4','section', 'div', 'span'],
    nonTextTags: [ 'style', 'script', 'textarea', 'noscript', 'html', 'body', 'div', 'span', 'h1'],
  });
  return new Promise((resolve) => {
    if (!html || html.length === 0) {
      throw new Error('Invalid or no html provided');
    }

    if (!sourceUrl || sourceUrl.length === 0) {
      throw new Error('Invalid or no source url provided');
    }

    const readabilityUrl = createReadabilityUrl(sourceUrl);
    const xhtml = convertHtmlToXhtml(html);
    const document = createJsDomDocument(xhtml);
    let cleanedHtml;

    try {
      const readability = new Readability(readabilityUrl, document);
      if(readability) {
        cleanedHtml = readability.parse();
      }
    } catch (error) {
      throw new Error('Unable to clean HTML');
    }

    resolve(cleanedHtml);
  });
};

function convertHtmlToXhtml(html) {
  const xmlSerializer = new XMLSerializer();
  const xhtmlDocument = new DOMParser({
    errorHandler: function(level, msg) {
      if (level === 'error') {
        throw new Error('Unable to convert HTML to XHTML: ' + msg);
      }
    }
  }).parseFromString(html, 'text/html');

  return xmlSerializer.serializeToString(xhtmlDocument);
}

function createJsDomDocument(xhtml) {
  const jsDomParser = new JSDOMParser();
  const document = jsDomParser.parse(xhtml.trim());

  if (jsDomParser.errorState) {
    throw new Error('Unable to parse XHTML into JsDom' + jsDomParser.errorState);
  }

  return document;
}

function createReadabilityUrl(sourceUrl) {
  const sourceUrlParsed = new UrlParser(sourceUrl);

  if (!sourceUrlParsed || sourceUrlParsed.host.length === 0) {
    throw new Error('Invalid or no source url provided');
  }

  return {
    spec: sourceUrlParsed.href,
    host: sourceUrlParsed.host,
    scheme: sourceUrlParsed.protocol.slice(0, -1),
    prePath: `${sourceUrlParsed.protocol}//${sourceUrlParsed.host}`,
    pathBase: `${sourceUrlParsed.protocol}//${sourceUrlParsed.host}${sourceUrlParsed.pathname.substring(0, sourceUrlParsed.pathname.lastIndexOf('/') + 1)}`
  };
}
