var mongoose = require ('mongoose');
var adminSchema = mongoose.Schema ({
  name: String
})

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
