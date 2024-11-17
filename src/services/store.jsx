import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";

// Configure the Redux store
export const store = configureStore({
  // Add the article API reducer to the store
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
  },
  // Add the article API middleware to the store's middleware
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(articleApi.middleware)
});
