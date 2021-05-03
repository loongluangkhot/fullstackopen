import React, { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [showDetail, setShowDetail] = useState(false);

  const toggleShowDetail = () => {
    setShowDetail((currentShowDetail) => setShowDetail(!currentShowDetail));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const payload = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(payload);
  }

  return (
    <div style ={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => toggleShowDetail()}>
          {showDetail ? "hide" : "view"}
        </button>
      </div>
      {showDetail ? (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
