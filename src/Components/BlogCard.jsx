import React from "react";

const BlogCard = React.memo(({ blog, onDelete, onToggleFeatured }) => {
  return (
    <div className={`blog-card ${blog.featured ? "featured" : ""}`}>
      <div>
        <h3>
          {blog.title} {blog.featured && <span className="badge">Featured</span>}
        </h3>
        <p>
          <strong>Author:</strong> {blog.author} | <strong>Category:</strong> {blog.category} |{" "}
          <strong>Reading Time:</strong> {blog.readingTime} mins
        </p>
      </div>
      <div>
        <button className="btn btn-fav" onClick={() => onToggleFeatured(blog.id)}>
          {blog.featured ? "Unfeature" : "Feature"}
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(blog.id)}>
          Delete
        </button>
      </div>
    </div>
  );
});

export default BlogCard;