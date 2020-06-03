const sql = require('mssql');
require('dotenv').config();
var nodemailer = require('nodemailer');

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
      to: 'nielshtg@gmail.com',
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