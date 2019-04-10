// eslint-disable-next-line import/no-unresolved
const aws = require('aws-sdk')
const nodemailer = require('nodemailer')

const ses = new aws.SES()
const s3 = new aws.S3()

function getS3File(bucket, key) {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: bucket,
        Key: key
      },

      (err, data) => {
        if (err) return reject(err)
        return resolve(data)
      }
    )
  })
}

exports.handler = (event, context, callback) => {
  getS3File(
    'jcb-ses-attachments',
    'Resume-David-Cotelessa-JavascriptDev-20190408.pdf'
  )
    .then(fileData => {
      const mailOptions = {
        from: 'david@jcodebrain.com',
        subject: 'Thank you for requesting my resume.',
        html: `<p>I'm David Cotelessa and I'm sending you my resume because you went to my website (generated from Hexo) and clicked on a request: THANK YOU for your interest in my skills. Did you know this email was sent by Amazon Web Services, using SES, a Lambda created in Node, and nodemailer? If you'd like to see, check out my <a href="http://github.com/jcodebrainjs">github repo</a>.</p><p>If it's okay, I'd like to update my resume with you every so often in case of any exciting opportunites that may be a good match. (Don't worry, I'm not that clingy.)</p><p>Attached is my latest resume in the format you requested, if you have a need for someone of my skill set, please reply back and we'll discuss.</p><p>Cheers,<br />David Cotelessa<br>323 829 0272</p>`,
        to: 'david@jcodebrain.com',
        attachments: [
          {
            filename: 'Resume-JavascriptDev-David-Cotelessa.pdf',
            content: fileData.body
          }
        ]
      }

      console.log('creating SES Transporter...')
      const transporter = nodemailer.createTransport({
        SES: ses
      })

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err)
          console.log('Error sending email!')
          callback(err)
        } else {
          console.log('Email sent.')
          callback()
        }
      })
    })
    .catch(error => {
      console.log(error)
      console.log('Error getting attachment')
      callback()
    })
}
