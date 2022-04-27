const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// get user with id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      '-password +firstname +lastname'
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Register a new user
exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log('REQ BODY', req.body);
  const { username, firstname, lastname, email, password, thumbnail } =
    req.body;

  try {
    let user = await User.findOne({ email });

    // See if user exists
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      thumbnail,
    });
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    const userWithNoPassword = JSON.parse(JSON.stringify(user));
    delete userWithNoPassword.password;

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      // config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: userWithNoPassword });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
