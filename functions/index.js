const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

//For Gmail, enable these:
//1. https://www.google.com/settings/security/lesssecureapps
//2. https://accounts.google.com/DisplayUnlockCaptcha

admin.initializeApp();

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '1inup9@gmail.com',
        pass: '0IQ8+H+fEth#c8suqi=L'
    }
  });



exports.app = functions
.firestore
.document('posts/{postID}')
.onCreate((snapshot, context) => {

    var mailOptions = {
        from: '"INUP" <1inup9@gmail.com>',
        to: snapshot.data().email,
        subject: snapshot.data().subject
      };

    mailOptions.text = snapshot.data().msg;

    return transporter.sendMail(mailOptions).then(() => {
        console.log("Send a mail to admin");
        return null;
    });
});