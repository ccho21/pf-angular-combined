const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../../middleware/auth');

const authController = require('../../controllers/authController');

//  @route      GET api/auth
//  @desc       Authenicate user & get token
//  @access     Public
router.get('/', auth, authController.getAuth);

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

module.exports = router;
