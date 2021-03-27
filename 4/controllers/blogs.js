const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.get("", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

router.post("", async (request, response) => {
  const user = await User.findOne({});
  const blog = new Blog({
    ...request.body,
    user: user._id,
  });
  const savedBlog = await blog.save();
  console.log(savedBlog._id);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

router.delete("/:id", async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  const user = await User.findById(deletedBlog.user);
  user.blogs = user.blogs.filter((blogId) => blogId !== deletedBlog._id);
  await user.save();
  response.status(204);
});

router.put("/:id", async (request, response) => {
  const user = await User.findOne({});
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      ...request.body,
      user: user._id,
    },
    {
      new: true,
    }
  );
  response.status(200).json(blog);
});

module.exports = router;
