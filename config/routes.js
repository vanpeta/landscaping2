var express = require ('express');
var router = express.Router();
var adminsController = require ('../controllers/admins');


/* API Routes */
router.route('/api/admins')
  .get(adminsController.index)
  .post(adminsController.create)

router.route('/api/admins/:id')
  .get(adminsController.show)
  .put(adminsController.update)
  .delete(adminsController.destroy)

/* GET env variables for angular */
router.route('/api/imgurKey')
  .get(adminsController.imgurKey)

/* GET homepage */
router.get('/', function(req, res, next) {
  res.sendfile('public/index.html');
});
router.get('*', function (req, res, next) {
  res.redirect('/');
});
/* Contact email Route */
router.route('/sendemail')
  .post(adminsController.sendEmail)



module.exports = router;
