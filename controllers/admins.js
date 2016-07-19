var Admin = require('../models/admin');
require('dotenv').load();
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var generator = require('xoauth2').createXOAuth2Generator({
  user: 'vanpeta.developer@gmail.com',
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
  imgurKey: imgurKey,
  sendEmail:sendEmail
  // me: me
}



function sendEmail(req,res,next) {

  smtpTransport.sendMail({
    to: 'vanpeta.developer@gmail.com',
    subject: req.body.subject,
    text: req.body.message
  });

  res.json(res.data)

  if (err) next(err);
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
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
};

// function me(req, res, next) {
//   Admin
//     .findOne({_id: req.decoded._id}).exec()
//     .then(function(admin) {
//       res.json(admin);
//     })
//     .catch(function(err) {
//       next(err);
//     });
// };

function update (req,res,next) {
  var id = req.params.id;
  console.log(req.params.id);
  Admin.findById(id, function(err, admin) {
    if (err) next(err);
    admin.username = req.body.username;
    admin.email = req.body.email;
    admin.favorites = req.body.favorites;
    admin.save(function(err, updatedUser) {
      if (err) next(err);
      res.json(updatedUser)
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

function imgurKey (req, res, next) {
  res.json(process.env.IMGUR_Client_ID)
};




