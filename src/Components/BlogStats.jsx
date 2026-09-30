import React from "react";

export default function BlogStats({ blogs }) {
  const totalBlogs = blogs.length;
  const featuredCount = blogs.filter((blog) => blog.featured).length;

  return (
    <div className="stats-card">
      <div>Total Blogs: {totalBlogs}</div>
      <div>Featured Blogs: {featuredCount}</div>
    </div>
  );
}