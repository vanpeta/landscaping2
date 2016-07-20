var mongoose = require('mongoose');



var contentSchema = mongoose.Schema({
  aboutTitle: {type: String},
  aboutSubtitle: {type: String},
  aboutParagraph1: {type: String},
  aboutParagraph2: {type: String},
  serviceTitle: {type: String},
  serviceSubtitle: {type: String},
  serviceParagraph1: {type: String},
  serviceSubtitle2: {type: String},
  serviceParagraph2: {type: String}
})


var Content = mongoose.model('Content', contentSchema);

module.exports = Content;





