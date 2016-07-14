require('dotenv').load();

var mongoose = require('mongoose');
var Admin = require('../models/admin');

var admins = {name: 'Testing Admins'};

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
