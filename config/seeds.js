
require('dotenv').load();
var mongoose = require('./database');

var Admin = require('../models/admin');

var admins = [{admin_name: 'Testing Admin',
              email: 'carlos@email.com'}];

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
