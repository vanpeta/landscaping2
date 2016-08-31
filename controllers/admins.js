var Admin = require('../models/admin');
require('dotenv').load();
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var https = require('https');
var rp = require('request-promise');

var generator = require('xoauth2').createXOAuth2Generator({
  user: process.env.developerEmail,
  clientId: process.env.Google_OAuth_client_ID,
  clientSecret: process.env.Google_OAuth_client_secret,
  refreshToken:process.env.Google_Refresh_Token,
});

generator.on('token', function(token){
  console.log('New token for %s: %s', token.user, token.accessToken)
})

var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth:{xoauth2:generator}
});

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy,
  sendEmail:sendEmail,
  me: me
}

function sendEmail(req,res,next) {
  if(req.body.myRecaptchaResponse === undefined || req.body.myRecaptchaResponse === '' || req.body.myRecaptchaResponse === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  var secretKey = process.env.recaptchaSecretKey;
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.myRecaptchaResponse + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  var options = {
    method: 'POST',
    uri: verificationUrl,
    body: req.body.myRecaptchaResponse,
    json: true
  };
  rp(options)
    .then(function () {
      var mailOptions = {
        to: [process.env.developerEmail, process.env.ownerEmail],//¡¡¡REPLACE with Dan's email!!! <==========
        subject: req.body.name + " sent a new contact message from http://www.sphansonlandscaping.com about: " + req.body.subject,
        text: "Respond to " + req.body.name + " at: " + req.body.email + "-----" + req.body.name + " said: " + req.body.message
      }
      smtpTransport.sendMail(mailOptions, function(err) {
        if (err) next(err);
        res.json(res.data)
      })
    })
    .catch(function(err) {
      res.json(res.data)
    })
}

function index(req,res,next) {
  Admin.find({}, function(err, admins) {
    if (err) next(err);
    res.json(admins);
  });
};

function show(req, res, next){
  var id = req.params.id;
  Admin.findById(id, function(err, admin){
    if (err) next(err);
    res.json(admin);
  });
};

function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }
  Admin
    .create(req.body)
    .then(function(admin) {
      res.json({
        success: true,
        message: 'Successfully created admin.',
        data: {
          email: admin.email,
          id:    admin._id
        }
      });
    }).catch(function(err) {
      if (err.message.match(/E11000/)) {
        console.log(err)
        err.status = 409;
        res.json({
          message: "This email is already being used"
        })
      } else {
        err.status = 422;
      }
      next(err);
    });
};

function me(req, res, next) {
  Admin
    .findOne({_id: req.decoded._id}).exec()
    .then(function(admin) {
      res.json(admin);
    })
    .catch(function(err) {
      next(err);
    });
};

function update (req,res,next) {
  var id = req.params.id;
  console.log(req.params.id);
  Admin.findById(id, function(err, admin) {
    if (err) next(err);
    admin.admin_name = req.body.admin_name;
    admin.email = req.body.email;
    admin.save(function(err, updatedAdmin) {
      if (err) next(err);
      res.json(updatedAdmin)
    });
  });
};

function destroy (req,res,next) {
  var id = req.params.id;
  Admin.remove({_id:id}, function(err) {
    if (err) next(err);
    res.json({message: "Admin deleted"});
  });
};




