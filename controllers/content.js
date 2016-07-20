require('dotenv').load();
var mongoose = require('../config/database');
var Content = require('../models/content');

module.exports = {
  getContent: getContent,
  updateContent: updateContent
}

function getContent (req,res,next) {
  Content.find({},function(err, content) {
    if(err) next(err);
    res.json(content)
  })
}

function updateContent (req,res,next) {
  Content.findOne({}, function (err, content){
    if (err) next(err);
    content.aboutTitle = req.body.aboutTitle || content.aboutTitle;
    content.aboutSubtitle = req.body.aboutSubtitle || content.aboutSubtitle;
    content.aboutParagraph1 = req.body.aboutParagraph1 || content.aboutParagraph1;
    content.aboutParagraph2 = req.body.aboutParagraph2 || content.aboutParagraph2;
    content.serviceTitle = req.body.serviceTitle || content.serviceTitle;
    content.serviceSubtitle = req.body.serviceSubtitle || content.serviceSubtitle;
    content.serviceParagraph1 = req.body.serviceParagraph1 || content.serviceParagraph1;
    content.serviceSubtitle2 = req.body.serviceSubtitle2 || content.serviceSubtitle2;
    content.serviceParagraph2 = req.body.serviceParagraph2 || content.serviceParagraph2;
    content.save(function(err, updatedContent) {
      if (err) next(err);
      res.json(updatedContent)
    })
    })
};


// function update (req,res,next) {
//   var id = req.params.id;
//   console.log(req.params.id);
//   Admin.findById(id, function(err, admin) {
//     if (err) next(err);
//     admin.username = req.body.username;
//     admin.email = req.body.email;
//     admin.favorites = req.body.favorites;
//     admin.save(function(err, updatedUser) {
//       if (err) next(err);
//       res.json(updatedUser)
//     });
//   });
// };





