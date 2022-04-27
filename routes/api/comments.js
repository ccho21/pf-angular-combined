const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');

const commentController = require('../../controllers/commentController');

//  @route      POST api/comments/p/:id
//  @desc       Create a comment to a post
//  @access     Private

//  @route      POST api/comments/p/:postId/r/:commentId
//  @desc       Reply to a comment on a post
//  @access     Private
router
  .post(
    '/p/:postId',
    [auth, [check('content', 'Content is required').not().isEmpty()]],
    commentController.createComment
  )
  .post('/p/:postId/r/:commentId', [
    auth,
    [check('content', 'Content is required').not().isEmpty()],
    commentController.replyComment,
  ]);

//  @route      DELTE api/comments/p/:postId/c/:commentId
//  @desc       Delete comment
//  @access     Private

router.delete('/p/:postId/c/:commentId', auth);

module.exports = router;
