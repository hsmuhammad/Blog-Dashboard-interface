import React, { useEffect, useRef } from "react";

export default function SearchBar({ searchText, setSearchText, selectedCategory, setSelectedCategory }) {
  const inputRef = useRef(null);


  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search blogs by title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="React">React</option>
        <option value="Redux">Redux</option>
        <option value="Node">Node</option>
      </select>
    </div>
  );
}