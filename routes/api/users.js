const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

const userController = require('../../controllers/userController');

//  @route      GET api/user/:id
//  @desc       GET User Detail
//  @access     Public
router.get('/:id', auth, userController.getUser);

//  @route      POST api/users/sign-up
//  @desc       Register user
//  @access     Public
router.post(
  '/sign-up',
  [
    check('firstname', 'First Name is required').not().isEmpty(),
    check('lastname', 'Last Name is required').not().isEmpty(),
    check('username', 'User Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  userController.signUp
);

module.exports = router;
