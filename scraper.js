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
    //send email using Zapier

    let lis = ''

    matchedItems.forEach(item => {
      lis = lis + `<li><a href=${item.link}>${item.title}</a></li>`
    })

    const html = `<p>We found the following items today:</p><ul>${lis}</ul>`

    console.log(html)

    axios.post('https://hookb.in/8PLPmpO9BVC86RgkG2g9', {html})

    return html

  }

};

main('Fender');
