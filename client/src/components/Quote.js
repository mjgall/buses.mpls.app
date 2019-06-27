import React from 'react';
import Parser from 'rss-parser';

export default class Quote extends React.Component {
  state = {
    quoteTitle: '',
    quoteLink: ''
  };

  async componentWillMount() {
    let parser = new Parser();
    let feed = await parser.parseURL(
      'https://cors-anywhere.herokuapp.com/http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    );

    let articleChoice = Math.floor(Math.random() * 10);
    let title = feed.items[articleChoice].title;
    let link = feed.items[articleChoice].link;
    this.setState({ quoteTitle: title, quoteLink: link });
  }

  render() {
    return (
      <div id="news">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={this.state.quoteLink}>
          New York Times: {this.state.quoteTitle}
        </a>
      </div>
    );
  }
}
