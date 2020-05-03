const cheerio = require('cheerio');
const axios = require('axios');

module.exports = (app) => {
  app.get('/api/card', async (req, res) => {
    try {
      const serial = req.query.serial;

      const getBalance = async (serial) => {
        const url = `https://store.metrotransit.org/FareCardTransactionHistory.aspx?farecard=${serial}`;
        const axiosResponse = await axios.get(url);
        const html = axiosResponse.data;
        const $ = cheerio.load(html);
        const value = $('#CurrentStoredValue');
        //returns the string found in the DOM
        return value[0].children[0].data.replace('$', '');
      };

      const balance = parseFloat(await getBalance(serial)).toFixed(2);

      if (balance === NaN) {
        res.send({ amount: 'No results' });
      } else {
        res.send({ amount: balance });
      }
    } catch (error) {
      res.send({ error: true, error });
    }
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
