'use strict';
const nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');
var template = path.join(__dirname, 'templates');


module.exports = function (recipient, lead) {

    var unformatedDateData = lead.get('apptDateTime');
    var unformatedDate = new Date(unformatedDateData);
    lead.set('apptDateTime', formatDate(unformatedDate));
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'qual.e.solar@gmail.com',
            pass: 'suncode2017'
        }
    });

    function formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
        
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        
        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    var referral = new EmailTemplate(template);

    referral.render(lead, function (err, result) {

        console.log('lead', lead);
        
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


