const mailgun = require("mailgun-js");
// require('dotenv').config();

const DOMAIN = process.env.Domain_name;
const api_key = process.env.MAIL_GUN_API_KEY;
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

const sendWelcomeEmail = (email, name) => {
    mg.messages().send({
        from: process.env.MY_MAIL,
        to: email,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    }, function (error, body){
        console.log(body);
        console.log(error);
    });
}

const sendCancelationEmail = (email, name) => {
    mg.messages().send({
        from: process.env.MY_MAIL,
        to: email,
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    }, function (error, body){
        console.log(body);
        console.log(error);
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}