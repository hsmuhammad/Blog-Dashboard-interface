import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialBlogs } from "../blogData";


export const fetchBlogsFromApi = createAsyncThunk(
  "blogs/fetchBlogsFromApi",
  async (_, { rejectWithValue }) => {
    try {
    
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return initialBlogs;
    } catch (err) {
      return rejectWithValue("Failed to load blog post data.");
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    searchText: "",
    selectedCategory: "All",
    loading: false,
    error: null,
  },
  reducers: {
    
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    toggleFeatured: (state, action) => {
      const blog = state.blogs.find((b) => b.id === action.payload);
      if (blog) {
        blog.featured = !blog.featured;
      }
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsFromApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsFromApi.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogsFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  addBlog,
  deleteBlog,
  toggleFeatured,
  setSearchText,
  setSelectedCategory,
} = blogSlice.actions;

export default blogSlice.reducer;