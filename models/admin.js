var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  admin: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
})


var Admin = mongoose.model('Admin', userSchema);

module.exports = Admin;
