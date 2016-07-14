var mongoose = require ('mongoose');

var adminSchema = mongoose.Schema ({
  name: { type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true}
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
