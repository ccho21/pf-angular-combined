const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');

const postController = require('../../controllers/postController');

//  @route      GET api/posts
//  @desc       get all posts
//  @access     Private

router.get('/', auth, postController.getPosts);

//  @route      GET api/posts/:id
//  @desc       Get post by ID
//  @access     Private

router.get('/:id', auth, postController.getPost);

//  @route      POST api/posts
//  @desc       Create a post
//  @access     Private
router.post(
  '/',
  [
    auth,
    [
      check('content', 'Content is required').not().isEmpty(),
      check('images', 'Images are required').not().isEmpty(),
    ],
  ],
  postController.createPost
);

//  @route      PUT api/posts/:id
//  @desc       Update a post
//  @access     Private
router.put(
  '/:id',
  [
    auth,
    [
      check('content', 'Content is required').not().isEmpty(),
      check('images', 'Images are required').not().isEmpty(),
    ],
  ],
  postController.updatePost
);

//  @route      DELTE api/posts/:id
//  @desc       DELTE post by ID
//  @access     Private

router.delete('/:id', auth, postController.deletePost);

//  @route      GET api/posts/user/:userId
//  @desc       Get post by User ID
//  @access     Private

router.get('/user/:id', auth, postController.getPostsByUser);

module.exports = router;
