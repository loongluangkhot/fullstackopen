import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogsContainer = ({ user, onLogout }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    onLogout();
  }

  return (
    <div>
      <h2>blogs</h2>
      <p><span>{user.name} logged in</span><button onClick={handleClick}>logout</button></p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsContainer;
