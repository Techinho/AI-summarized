import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

/**
 * Demo component that allows users to input an article URL, fetch its summary, and manage a list of articles.
 *
 * @component
 * @example
 * return (
 *   <Demo />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * This component provides the following functionalities:
 * - Input field for users to paste an article URL.
 * - Fetches the summary of the article using a lazy query.
 * - Manages the state of the current article, list of all articles, and copied URL.
 * - Loads articles from local storage on component mount.
 * - Handles form submission to fetch and display the article summary.
 * - Allows users to copy the article URL to the clipboard.
 * - Displays a list of previously fetched articles.
 * - Shows a loader while fetching the summary and handles errors.
 */
const Demo = () => {
  // State to manage the current article's URL and summary
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  // State to manage the list of all articles
  const [allArticles, setAllArticles] = useState([]);

  // State to manage the copied URL
  const [copied, setCopied] = useState("");

  // Hook to lazily fetch the summary of an article
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Effect to load articles from local storage on component mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  // Handle form submission to fetch article summary
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the article already exists in the list
    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    // Fetch the summary of the article
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // Update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  // Handle copying the URL to the clipboard
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  // Handle form submission on Enter key press
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <input
            type='url'
            placeholder='Paste the article link'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='url_input peer' 
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
