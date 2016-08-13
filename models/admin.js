var mongoose = require('mongoose');
var debug    = require('debug')('app:models');

var adminSchema = mongoose.Schema({
  admin_name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
})

// add bcrypt hashing to model (works on a password field)!
adminSchema.plugin(require('mongoose-bcrypt'));

// Add a "transformation" to the model's toJson function that
// stops the password field (even in digest format) from being
// returned in any response.
adminSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};
var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
