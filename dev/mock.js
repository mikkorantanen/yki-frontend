const bodyParser = require('body-parser');
const fs = require('fs');

const getCurrentTime = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
  return localISOTime;
};

const organizers = {
  organizers: [
    {
      oid: '1.2.246.562.10.28646781493',
      agreement_start_date: '2018-01-01T00:00:00.000Z',
      agreement_end_date: '2019-01-01T00:00:00.000Z',
      contact_name: 'Iida Ikola',
      contact_email: 'iida.ikola@amiedu.fi',
      contact_phone_number: '0101234546',
      languages: [
        {
          language_code: 'fi',
          level_code: 'PERUS',
        },
        {
          language_code: 'fi',
          level_code: 'KESKI',
        },
        {
          language_code: 'sv',
          level_code: 'YLIN',
        },
        {
          language_code: 'sv',
          level_code: 'PERUS',
        },
      ],
    },
    {
      oid: '1.2.246.562.10.39706139522',
      agreement_start_date: '2018-01-01T00:00:00.000Z',
      agreement_end_date: '2029-01-01T00:00:00.000Z',
      contact_name: 'Ismo Supinen',
      contact_email: 'ismo.supinen@jkl.fi',
      contact_phone_number: '01412345467',
      languages: null,
    },
  ],
};

const getNumberBetween = (min, max) => Math.random() * (max - min) + min;

module.exports = app => {
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

  app.use((req, res, next) => {
    if (req.originalUrl.indexOf('/yki/api') === 0) {
      // eslint-disable-next-line
      console.log(
        'Time:',
        getCurrentTime(),
        req.method + ': ' + req.originalUrl,
        '\n',
        JSON.stringify(req.body),
      );
      if (req.query.delay) {
        return setTimeout(
          next,
          parseInt(req.query.delay, 10) || getNumberBetween(500, 1500),
        );
      }
    }
    next();
  });

  app.get('/yki/api/virkailija/organizers', (req, res) => {
    try {
      res.send(organizers);
    } catch (err) {
      res.status(404).send(err.message);
    }
  });

  // http://localhost:3000/organisaatio-service/rest/organisaatio/v3/1.2.246.562.10.28646781493
  app.get('/organisaatio-service/rest/organisaatio/v3/:oid', (req, res) => {
    try {
      const { oid } = req.params;
      const data = fs.readFileSync(`./dev/rest/organisaatio/${oid}.json`);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(404).send(err.message);
    }
  });
};
