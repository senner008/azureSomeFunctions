
var nodemailer = require('nodemailer');
require('dotenv').config();
export async function sendEmail (subject: string, message: string) {
  return new Promise((resolve,reject) => { 
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nielshtg@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    var mailOptions = {
      from: 'nielshtg@gmail.com',
      to: 'nielshtg@hotmail.com',
      subject: subject,
      text: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        reject(error)
      } else {
        console.log('Email sent: ' + info.response);
        resolve('Email sent: ' + info.response)
      }
    });
  }); 

}
