const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');


const likeController = require('../../controllers/likeController');

//  @route      PUT api/likes/p/:id
//  @desc       Like a post
//  @access     Private

router.post('/p/:postId', auth, likeController.postLike);

//  @route      DELETE api/likes/p/:id
//  @desc       Unlike a post
//  @access     Private

router.delete('/p/:postId', auth, likeController.deleteLike);

// TODO: REFACTOR LATER
//  @route      PUT api/likes/p/:postId/c/:commentId
//  @desc       Like a comment
//  @access     Private

router.post('/p/:postId/c/:commentId', auth, likeController.postCommentLike);

// TODO: REFACTOR LATER
//  @route      DELETE api/likes/p/:postId/c/:commentId
//  @desc       Unlike a Comment
//  @access     Private

router.delete(
  '/p/:postId/c/:commentId',
  auth,
  likeController.deleteCommentLike
);

module.exports = router;
