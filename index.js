// eslint-disable-next-line import/no-unresolved
const path = require('path');
const mg = require('./config');

exports.handler = async (event, _, callback) => {

const attachment = path.join(
  __dirname,
  's3-downloads',
  `Resume-David-Cotelessa-JavascriptDev-20190408.${event.doctype}`
  );

const data = {
  from: 'david@jcodebrain.com',
  subject: 'Thank you for requesting my resume.',
  html: `<p>I'm David Cotelessa and I'm sending you my resume because you went to my website (generated from Hexo) and clicked on a request: THANK YOU for your interest in my skills. Did you know this email was sent by a serverless app created in Node, CloudFlare Workers and mailgun? If you'd like to see, check out my <a href="http://github.com/jcodebrainjs">github repo</a>.</p><p>If it's okay, I'd like to update my resume with you every so often in case of any exciting opportunites that may be a good match.</p><p>Attached is my latest resume in the format you requested, if you have a need for someone of my skill set, please reply back and we'll discuss.</p><p>Cheers,<br />David Cotelessa<br>323 829 0272</p>`,
  to: `${event.emailname}@${event.emaildomain}`,
  attachment,
};

mg.messages().send(data, function (_, body) {
  console.log(body);
});
