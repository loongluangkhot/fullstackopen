import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogsContainer = ({ user, onLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setblogUrl] = useState("");
  const [notif, setNotif] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogout();
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdBlog = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      });
      setNotif(`a new blog ${createdBlog.title} by ${createdBlog.author} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (e) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {notif && (
        <p style={{ background: "green", color: "white" }}>{notif}</p>
      )}
      {errorMessage && (
        <p style={{ background: "red", color: "white" }}>{errorMessage}</p>
      )}
      <p><span>{user.name} logged in</span><button onClick={handleLogoutClick}>logout</button></p>
      <form onSubmit={handleBlogSubmit}>
      <div>
          title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={blogUrl}
            name="URL"
            onChange={({ target }) => setblogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsContainer;
