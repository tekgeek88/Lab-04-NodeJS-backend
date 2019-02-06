const nodemailer = require('nodemailer');
  
// We only need to create the transport opbject once.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "a.message.burner@gmail.com",
    pass: process.env.EMAIL_KEY
  }
});

function emailHandler(error, info) {
  if (error) {
    console.log('##############  BEGIN sendMail ERROR  ##############');
    console.log(error);
    console.log('##############  END sendMail ERROR  ##############');
  } else {
    console.log(info.response);
  }
}

// This method handles the sending of all emails
function sendEmail(from, receiver, subj, message) {
  
  // Build the email ooptions
  let mailOptions = {
    from: from,
    to: receiver,
    subject: subj,
    html: message
  };
  // Send the message
  transporter.sendMail(mailOptions, emailHandler);
}


function sendWelcomeEmail(firstName, email) {

  let welcomeSubject = "A refactored Welcome! ";
  let welcomeMessage = "<strong>A refactored Welcome to our app " + firstName + "!</strong>";

  sendEmail("admin@ourapp.com", email, welcomeSubject, welcomeMessage);
}


function sendVerificationEmail(firstName, email, request, token) {

  let subject = "Account Verification Token";
  let message = "Hello " + firstName + ",\n\n" +
                       "Please verify your account by clicking the link: \nhttp:\/\/" +
                       request.headers.host + "\/confirmation\/" + token.token + ".\n";

  let message2 =  '<form method="post" action="' + request.headers.host + '/confirmation/" class="inline">' +
                  '<input type="hidden" name="token" value="' + token.token + '">' +
                  '<button type="submit" name="submit_param" value="submit_value" class="link-button">' +
                  'This is a link that sends a POST request' +
                  '</button>' +
                  '</form>' + 
                  'Your token is: ' + token.token;

  sendEmail("no-reply@ourapp.com", email, subject, message2);
}


module.exports = {
  sendEmail, sendWelcomeEmail, sendVerificationEmail
}