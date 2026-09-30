import { useMemo } from "react";

export function useFilteredBlogs(blogs, searchText, selectedCategory) {
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchText, selectedCategory]);

  return filteredBlogs;
}