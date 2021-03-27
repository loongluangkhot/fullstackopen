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

router.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (e) {
    return response.status(400).json(e);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true});
    response.status(200).json(blog);
  } catch (e) {
    return response.status(400).json(e);
  }
})

module.exports = router;
