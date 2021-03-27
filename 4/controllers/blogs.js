const router = require("express").Router();
const Blog = require("../models/blog");

router.get("", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post("", async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    return response.status(201).json(result);
  } catch (e) {
    return response.status(400).json(e);
  }
});

module.exports = router;
