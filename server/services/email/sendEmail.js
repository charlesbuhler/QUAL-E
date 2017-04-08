'use strict';
const nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');
var template = path.join(__dirname, 'templates');


module.exports = function (recipient, lead) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'qual.e.solar@gmail.com',
            pass: 'suncode2017'
        }
    });

    var referral = new EmailTemplate(template);

    referral.render(lead, function (err, result) {
        // result.html
        // result.text
        let mailOptions = {
            from: '"Qual-E" <qual.e.solar@gmail.com>', // sender address
            to: recipient, // list of receivers
            subject: 'New Solar Lead Follow Up', // Subject line
            text: result.txt, // plain text body
            html: result.html // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    });
};


