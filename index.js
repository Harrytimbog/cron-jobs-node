const cron = require('node-cron');
const express = require('express');
const fs = require('fs')
const nodemailer = require('nodemailer');

app = express();

// Schedule tasks to be run on the server.
//cron.schedule('* * * * *', function() {
 // console.log('running a task every minute');
//});


// Remove the error.log file every twenty-first day of the month.
cron.schedule('0 0 21 * *', function() {
  console.log('---------------------');
  console.log('Running Cron Job');
  fs.unlink('./error.log', err => {
    if (err) throw err;
    console.log('Error file successfully deleted');
  });
});

// Sending emails every Wednesday.
cron.schedule('0 0 * * 3', function () {
  console.log('---------------------');
  console.log('Running Cron Job');

  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5e0ad524876d4b",
      pass: "978a471096c37a"
    }
  });

  const message = {
    from: 'Harriemannie@gmail.com', // Sender address
    to: 'Harrytimbog@gmail.com',         // List of recipients
    subject: 'Beulah is My Girlfriend', // Subject line
    html: '<h1>I plan to marry her even though she get!</h1><p> <b>Coconut head</b> !</p>'
    // text: 'Purchase your Holystone drones! Get your Holystone' // Plain text body
  };
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
});


app.listen(3000);

