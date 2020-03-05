const cheerio = require('cheerio');
const axios = require('axios');
const _ = require('lodash');

const main = async searchTerm => {
  const url = 'https://minneapolis.craigslist.org/search/msa?postedToday=1';
  const response = await axios.get(url);
  const html = response.data;

  const $ = cheerio.load(html);

  const items = Array.from($('.result-title.hdrlnk')).map((element, index) => {
    const link = element.attribs.href;
    const title = element.children[0].data;
    return {
      title,
      link
    };
  });

  const matchedItems = items.filter(item => {
    if (_.includes(item.title, searchTerm)) {
      return true;
    } else {
      return false;
    }
  });

  if (matchedItems.length > 0) {
    //send email using Zapier/Gmail

    let lis = '';

    matchedItems.forEach(item => {
      lis = lis + `<li><a href=${item.link}>${item.title}</a></li>`;
    });

    const html = `<p>Found the following new items today that match your search of '${searchTerm}':</p><ul>${lis}</ul><p>Thanks!</p><p>Mike</p>`;

    axios.post('https://hooks.zapier.com/hooks/catch/2471883/omj12pl/', {
      html
    });

    return html;
  } else {
    const html = `<p>Sorry, nothing new today matching '${searchTerm}'</p><p>Thanks!</p><p>Mike</p>`;

    axios.post('https://hooks.zapier.com/hooks/catch/2471883/omj12pl/', {
      html
    });

    return html;
  }
};

main('Fender');
