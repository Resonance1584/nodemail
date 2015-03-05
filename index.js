'use strict';

process.on('uncaughtException', function(err) {
  console.error(err);
});

require('envoodoo')();

var chalk = require('chalk');
var readlineSync = require('readline-sync');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized:false
  }
}));

var data = {};

console.log(chalk.bold('NodeMail 0.0.1'));
console.log('Send an email by entering the following fields:');

data.from = readlineSync.question(chalk.bold('\nfrom:'));

data.to = readlineSync.question(chalk.bold('\nto:'));

data.subject = readlineSync.question(chalk.bold('\nsubject:'));

data.text = readlineSync.question(chalk.bold('\ntext:'));

data.html = readlineSync.question(chalk.bold('\nhtml:'));

transporter.sendMail(data, function (err, info) {
  if (err) {
    console.error(err);
  } else {
    console.log(info);
  }
});
