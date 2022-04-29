const { validationResult } = require('express-validator');
const User = require('../models/User');
const Like = require('../models/Like');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const APIFeatures = require('../util/apiFeatures');

exports.defaultParam = (req, res, next) => {
  if (!req.query.limit) {
    req.query.limit = '1';
  }
  if (!req.query.sort) {
    req.query.sort = '-createdAt';
  }
  next();
};

// get user with id
exports.getPosts = async (req, res) => {
  try {
    const features = new APIFeatures(Post.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const posts = await features.query;
    res.json({
      status: 'success',
      results: posts.length,
      data: posts,
    });
  } catch (err) {
    // console.log(err.message);
    res.status(500).send('Server Error');
  }
};
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
};
exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = new Post({
      content: req.body.content,
      images: req.body.images,
      author: user._id,
    });
    const query = await post.save();
    const populatedPost = await query.populate('author').execPopulate();
    console.log('POSTS ###', populatedPost);
    res.json(populatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const post = await Post.findById(req.params.id);
    post.content = req.body.content;
    // post.images.unshift(...req.body.images);
    post.images = req.body.images;

    const query = await post.save();
    const populatedPost = await query.populate('author').execPopulate();
    console.log('### populated, ', populatedPost);
    res.json(populatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Remove all comments related to this post
    if (post.comments.length) {
      const comments = await Comment.find({ postId: req.params.id });
      const commentIds = comments.map((comment) => comment._id);
      await Comment.deleteMany({ _id: commentIds });
    }
    // Remove All likes related to this post
    if (post.likes.length) {
      const likes = await Like.find({ parentId: req.params.id });
      const likeIds = likes.map((like) => like._id);
      await Like.deleteMany({ _id: likeIds });
    }

    await post.remove();

    res.json({ msg: 'Post and its removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
};
exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id });
    if (!posts) return res.status(404).json({ msg: 'Post not found' });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
};
