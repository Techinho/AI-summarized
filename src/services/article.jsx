import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Retrieve the RapidAPI key from environment variables
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// Create an API service using Redux Toolkit Query
export const articleApi = createApi({
  // Define the reducer path for the API
  reducerPath: 'articleApi',
  
  // Configure the base query with the base URL and headers
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      // Set the RapidAPI key in the headers
      headers.set('X-RapidAPI-Key', rapidApiKey);
      // Set the RapidAPI host in the headers
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

      return headers;
    },
  }),
  
  // Define the endpoints for the API
  endpoints: (builder) => ({
    // Define a query endpoint to get the summary of an article
    getSummary: builder.query({
      // encodeURIComponent() function encodes special characters that may be present in the parameter values
      // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
      query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
})

export const { useLazyGetSummaryQuery } = articleApi
