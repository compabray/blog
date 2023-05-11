const express = require('express');

const Blog = require('../models/blog');

const router = express.Router();

// Get a blog
router.get('/:path', async (req, res) => {
    await Blog.findOne({path: req.params.path})
        .then((blog) => res.json(blog))
        .catch((err) => res.status(400).json('Error: ' + err));

});

// Get all blogs
router.get('/', async (req, res) => {
    await Blog.find()
        .then((blogs) => res.json(blogs))
        .catch((err) => res.status(400).json('Error: ' + err));
});



module.exports = router;