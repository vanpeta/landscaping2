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
    content.caption1 = req.body.caption1 || content.caption1;
    content.caption2 = req.body.caption2 || content.caption2;
    content.caption3 = req. body.caption3 || content.caption3;
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





