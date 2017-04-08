var sendEmail = require('./server/services/email/sendEmail.js')

var lead = {
    name: 'alex',
    address: '261 gabarda way',
    phone: '555-5555',
    roofType: 'tile',
    ownership: 'own',
    residenceType: 'single family',
    financePref: 'lease',
    apptDateTime: '5/5/2017'
}

sendEmail('tima.haines@gmail.com', lead);