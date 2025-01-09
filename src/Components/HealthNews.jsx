import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
const HealthNewsCards = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);

  const tags = ['All', 'Wellness', 'Fitness', 'Nutrition', 'Mental Health'];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            category: 'health',
            apiKey: 'cd1d187864d04119b554780e994c8690', // Replace with your API key
            country: 'us',
            pageSize: 20,
            page,
          },
        });
        setNews((prevNews) => [...prevNews, ...response.data.articles]);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  useEffect(() => {
    const filtered = news.filter(
      (article) =>
        (selectedTag === 'All' || article.tags?.includes(selectedTag)) &&
        (article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredNews(filtered);
  }, [searchQuery, selectedTag, news]);

  const truncateText = (text, maxLength) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const selectTag = (tag) => {
    setSelectedTag(tag);
    setDropdownOpen(false);
  };

  return (
    <div>
    <Navigation/>
    <div className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
    
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-6">
            News and Tips
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Latest Health News and Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Stay informed with the latest updates, expert advice, and practical tips to keep you healthy and well.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-12 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search health news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 p-3 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedTag} <span className="ml-2">▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => selectTag(tag)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* News Cards */}
        {isLoading && <p className="text-center text-gray-500 text-xl">Loading health news...</p>}
        {error && <p className="text-center text-red-500 text-xl">{error}</p>}
        {!isLoading && !error && filteredNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={article.urlToImage || 'https://via.placeholder.com/800x450'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="flex flex-wrap gap-2">
                      {(article.tags || ['Health', 'Wellness']).slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Read More
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title || 'No title available'}
                    </a>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {truncateText(article.description, 150)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading && !error && filteredNews.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default HealthNewsCards;








