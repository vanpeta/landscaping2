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
    console.log(content)
    res.json(content)
  })
}

function updateContent (req,res,next) {

}


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





