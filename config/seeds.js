require('dotenv').load();
var mongoose = require('./database');
var Admin = require('../models/admin');
var Content = require('../models/content');

var admins = [{admin_name: 'Testing Admin',
              email: 'test@email.com'}];

Admin.remove({}, function (err) {
  if (err) console.log(err);
  Admin.create(admins, function(err, admins) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + admins.length + " admins.");
      mongoose.connection.close();
    }
    process.exit();
  });
});


var content = {
  caption1: 'QUALITY THAT IS GUARANTEED',
  caption2: 'TRANSFORMING HOMES AND BUSINESSES SINCE 1992',
  caption3: 'YOUR YARD NEVER LOOKED MORE GREEN',
  aboutTitle: 'About',
  aboutSubtitle: 'About S & P Hanson Landscaping',
  aboutParagraph1: 'S & P Hanson Landscaping is a family owned and operated business in the Central Valley since 1992. In 1976, Steve Hanson graduated with a degree in Ornamental Horticulture from California Polytechnic State University, San Luis Obispo.',
  aboutParagraph2: 'After years of experience in landscape design and construction management, Steve established S & P Hanson Landscaping in 1992.',
  serviceTitle: 'Services',
  serviceSubtitle: 'About S & P Hanson Landscaping',
  serviceParagraph1: 'We are a full service landscape design, installation, and maintenance company dedicated to excellence. Our talented team can build your project from scratch or improve your existing outdoor environment at a cost that will fit your budget. Our creative ideas combined with the best products and high quality workmanship will make for a unique and rewarding landscape that will provide lasting enjoyment.',
  serviceSubtitle2: 'Our maintenance services',
  serviceParagraph2: 'Not only are we known for our superior installation services, but we have also developed an outstanding reputation for our superior landscape maintenance and horticultural services.'
};

// Content.remove({}, function (err) {
//   if (err) console.log(err);
//   Content.create(content, function(err, content) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Database seeded with content.");
//       mongoose.connection.close();
//     }
//     process.exit();
//   });
// });
