require('dotenv').load();

var mongoose = require('mongoose');
var Admin = require('../models/admin');

var admins = {name: 'Testing Admins'};

Admin.remove({}, function(err){
  console.log('removing db content')
  if (err) console.log(err);
  Admin.create(admins, function(err, admins) {
    if (err) {
      console.log (err);
    } else {
      console.log ('Database seeded with ' + admins.length + "Admins.");
      mongoose.connection.close();
    }
    process.exit();
  });
});
