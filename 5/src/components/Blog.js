import React, { useState, useEffect } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const loggedInUser = loginService.getCurrentlyLoginUser();
    if (loggedInUser) {
      const username = loggedInUser.username;
      if (username === blog.user.username) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } else {
      setAuthorized(false);
    }
  }, [blog]);

  const toggleShowDetail = () => {
    setShowDetail((currentShowDetail) => setShowDetail(!currentShowDetail));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    const payload = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(payload);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => toggleShowDetail()}>
          {showDetail ? "hide" : "view"}
        </button>
      </div>
      {showDetail ? (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {authorized ? (
            <div>
              <button onClick={handleRemove}>remove</button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
