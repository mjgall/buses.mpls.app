const cheerio = require('cheerio');
const axios = require('axios');

module.exports = (app) => {
  app.get('/api/card', (req, res) => {
    (async () => {
      const serial = req.query.serial;

      const url = `https://store.metrotransit.org/FareCardTransactionHistory.aspx?farecard=${serial}`;

      const getHTML = async (url) => {
        const axiosResponse = await axios.get(url);
        const html = axiosResponse.data;
        const $ = cheerio.load(html);
        const value = $('#CurrentStoredValue');
        return value[0].children[0].data.replace('$', '');
      };

      const balanceString = await getHTML(url);

      console.log(balanceString);

      const balanceNumber = parseFloat(balanceString).toFixed(2);

      if (balanceNumber === NaN) {
        res.send({ amount: 'No results' });
      } else {
        res.send({ amount: balanceNumber });
      }
    })();
  });

  app.get('/api/stopId', async (req, res) => {
    (async () => {
      const stop = req.query.stop;

      const response = await axios.get(
        `https://svc.metrotransit.org/nextripv2/${stop}`
      );

      const stopDescription = response.data.Stop.Description;

      res.send({ location: stopDescription });
    })();
  });
};
