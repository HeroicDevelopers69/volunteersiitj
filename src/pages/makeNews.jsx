import React, { useState } from 'react';

const MakeNews = () => {
  const [news, setNews] = useState({
    image: '',
    heading: '',
    description: '',
    secondParagraph: '',
  });

  const [showSecondParagraph, setShowSecondParagraph] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const toggleSecondParagraph = () => {
    setShowSecondParagraph((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Create News
      </h1>
      <form
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
          >
            Upload Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter image URL"
            value={news.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="heading"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
          >
            Heading
          </label>
          <input
            type="text"
            id="heading"
            name="heading"
            placeholder="Enter news heading"
            value={news.heading}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a descriptive paragraph..."
            value={news.description}
            onChange={handleChange}
            rows="5"
            className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <button
          type="button"
          onClick={toggleSecondParagraph}
          className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showSecondParagraph ? 'Remove Second Paragraph' : 'Add Second Paragraph'}
        </button>

        {showSecondParagraph && (
          <div className="mb-4">
            <label
              htmlFor="secondParagraph"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Second Paragraph
            </label>
            <textarea
              id="secondParagraph"
              name="secondParagraph"
              placeholder="Write an optional second paragraph..."
              value={news.secondParagraph}
              onChange={handleChange}
              rows="5"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Publish News
        </button>
      </form>

      {(news.heading || news.description || news.image || news.secondParagraph) && (
        <div className="w-full max-w-lg mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Preview
          </h2>
          {news.image && (
            <img
              src={news.image}
              alt="News"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          {news.heading && (
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {news.heading}
            </h3>
          )}
          {news.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {news.description}
            </p>
          )}
          {news.secondParagraph && (
            <p className="text-gray-600 dark:text-gray-400">
              {news.secondParagraph}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MakeNews;
