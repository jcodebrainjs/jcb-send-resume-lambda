// eslint-disable-next-line import/no-unresolved
const mailgun = require('mailgun-js');

const DOMAIN = 'mg.jcodebrain.com';
const mg = mailgun({
  apiKey: '7ea1eeff80168f16058b374a6300aa8c-1df6ec32-0d34606c',
  domain: DOMAIN,
});

module.exports.mg = mg;
