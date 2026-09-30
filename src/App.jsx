import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import BlogStats from "./Components/BlogStats";
import BlogList from "./Components/BlogList";
import { useFilteredBlogs } from "./Hooks/useFilteredBlogs";
import {
  fetchBlogsFromApi,
  deleteBlog,
  toggleFeatured,
  setSearchText,
  setSelectedCategory,
} from "./Redux/blogSlice";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();

  
  const { blogs, searchText, selectedCategory, loading, error } = useSelector(
    (state) => state.blogs
  );

  
  useEffect(() => {
    dispatch(fetchBlogsFromApi());
  }, [dispatch]);

 
  const filteredBlogs = useFilteredBlogs(blogs, searchText, selectedCategory);


  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteBlog(id));
    },
    [dispatch]
  );

  const handleToggleFeatured = useCallback(
    (id) => {
      dispatch(toggleFeatured(id));
    },
    [dispatch]
  );

  const handleSearchChange = (text) => {
    dispatch(setSearchText(text));
  };

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <div className="container">
      <Header />
      <SearchBar
        searchText={searchText}
        setSearchText={handleSearchChange}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
      />

    
      {loading && <p style={{ textAlign: "center" }}>Loading blogs...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <BlogStats blogs={filteredBlogs} />
          <BlogList
            blogs={filteredBlogs}
            onDelete={handleDelete}
            onToggleFeatured={handleToggleFeatured}
          />
        </>
      )}
    </div>
  );
}