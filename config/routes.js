var express = require ('express');
var router = express.Router();
var adminsController = require ('../controllers/admins');
var contentController = require ('../controllers/content');

/* GET homepage */
router.get('/', function(req, res, next) {
  res.sendfile('public/index.html');
});

/* API Routes */
router.route('/api/admins')
  .get(adminsController.index)
  .post(adminsController.create)

router.route('/api/admins/:id')
  .get(adminsController.show)
  .put(adminsController.update)
  .delete(adminsController.destroy)

/* GET env variables for front-end */
router.route('/api/imgurKey')
  .get(adminsController.imgurInfo)

/* Contact email Route */
router.route('/api/content')
  .get(contentController.getContent)
  .put(contentController.updateContent)

// router.get('*', function (req, res, next) {
//   res.redirect('/');
// });
/* Contact email Route */
router.route('/sendemail')
  .post(adminsController.sendEmail)


module.exports = router;
