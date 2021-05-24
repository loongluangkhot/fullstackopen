import React, { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { Toggleable } from "./Toggleable";
import BlogForm from "./BlogForm";

const BlogsContainer = ({ user, onLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [notif, setNotif] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const blogsContainerRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortBlogs(blogs)));
  }, []);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogout();
  };

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  const createBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog);
      setBlogs(sortBlogs([...blogs, createdBlog]));
      blogsContainerRef.current.toggleActive();
      setNotif(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (e) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog);
      const updatedBlogs = blogs.map((b) => {
        if (b.id === blog.id) {
          return updatedBlog;
        }
        return b;
      });
      setBlogs(sortBlogs(updatedBlogs));
    } catch (e) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog);
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(sortBlogs(updatedBlogs));
    } catch (e) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {notif && <p style={{ background: "green", color: "white" }}>{notif}</p>}
      {errorMessage && (
        <p style={{ background: "red", color: "white" }}>{errorMessage}</p>
      )}
      <p>
        <span>{user.name} logged in</span>
        <button onClick={handleLogoutClick}>logout</button>
      </p>
      <Toggleable buttonLabel="new blog" ref={blogsContainerRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
      ))}
    </div>
  );
};

export default BlogsContainer;
