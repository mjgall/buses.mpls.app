const cheerio = require('cheerio');
const axios = require('axios');

module.exports = app => {
  app.get('/api/card', (req, res) => {
    (async () => {
      const serial = req.query.serial;

      const url = `https://store.metrotransit.org/FareCardTransactionHistory.aspx?farecard=${serial}`;

      const getHTML = async url => {
        const axiosResponse = await axios.get(url);
        const html = axiosResponse.data;
        const $ = cheerio.load(html);
        const value = $(
          '#shoppingCart > div.card-body > div.mt-fare-card-summary > div > strong:nth-child(5)'
        );
        return value.nextSibling.textContent.replace('$', '').text();
      };

      const balanceString = await getHTML(url);
      const balanceNumber = parseFloat(balanceString).toFixed(2);

      if (balanceNumber === NaN) {
        res.send({ amount: 'No results' });
      } else {
        res.send({ amount: balanceNumber });
      }
    })();
  });

  app.get('/api/stopId', (req, res) => {
    (async () => {
      const stop = req.query.stop;

      const url = `https://www.metrotransit.org/NexTripBadge.aspx?stopnumber=${stop}`;

      const getHTML = async url => {
        const axiosResponse = await axios.get(url);
        const html = axiosResponse.data;
        const $ = cheerio.load(html);
        const value = $('#NexTripControl1_NexTripResults1_lblLocation');
        return value.text();
      };

      const result = await getHTML(url);
      res.send({ location: result });
    })();
  });
};
