"use client";

import { useState, useEffect } from "react";
import Image from "next/image.js";

export default function RSSComponent() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedArticles, setExpandedArticles] = useState(new Set());

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Fetch articles from API route
        const response = await fetch('/api/getrss?keyword=west');
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch articles');
        }

        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Loading news articles...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to truncate text to 200 words
  const truncateText = (text, wordLimit = 80) => {
    if (!text) return '';

    // Remove HTML tags and extra whitespace
    const cleanText = text.replace(/<\/?(p|h2|a)\b[^>]*>/gi, '').replace(/&nbsp;|&euml;/gi, ' ').replace(/&egrave;/gi, "è").trim();

    const words = cleanText.split(/\s+/);
    if (words.length <= wordLimit) {
      return cleanText;
    }

    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // Function to toggle article expansion
  const toggleArticleExpansion = (index) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedArticles(newExpanded);
  };

  return (
    <div className="mt-8 min-h-screen">
      <div className="mx-auto max-w-[620px] px-4">
        <div className="mb-8 flex justify-center border-b-2 pb-4">
          <h1 className="mb-2 text-4xl font-bold text-white">
            Staatsliedenbuurt nieuws
          </h1>
        </div>
        {articles.length === 0 ? (
          <p>Geen Staatsliedenbuurt nieuws</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {articles.map((article, index) => {
              const isExpanded = expandedArticles.has(index);
              const fullDescription = article.description?.[0] || '';
              const truncatedDescription = truncateText(fullDescription, 50);

              return (
                <li
                  key={index}
                  className="flex w-full flex-col rounded-lg bg-white px-4 pb-6 pt-4"
                >
                  <p className="text-yellow-900 text-sm mb-2">
                    Datum: {article.pubDate?.[0].slice(5, 16) || "Unknown date"}
                  </p>
                  <h3 className="text-lg font-bold text-yellow-900">
                    {article.title?.[0] || "No title"}
                  </h3>

                  <div className="my-2">
                    {isExpanded
                      ? fullDescription.replace(/<\/?(p|h2|a)\b[^>]*>/gi, '').replace(/&nbsp;|&euml;/gi, ' ').replace(/&egrave;/gi, "è").trim()
                      : truncatedDescription
                    }
                  </div>

                  {!isExpanded && (
                    <div className="w-full flex justify-center my-4">
                      <button
                        className="w-32 rounded-full bg-gradient-to-r from-red-900 via-yellow-700 to-red-900 py-1"
                        type="button"
                        onClick={() => toggleArticleExpansion(index)}
                      >
                        <span className="text-white">Lees meer</span>
                      </button>
                    </div>
                  )}

                  {isExpanded && (
                    <div className="w-full flex justify-center my-4">
                      <button
                        className="w-32 rounded-full bg-gradient-to-r from-red-900 via-yellow-700 to-red-900 py-1"
                        type="button"
                        onClick={() => toggleArticleExpansion(index)}
                      >
                        <span className="text-white">Lees minder</span>
                      </button>
                    </div>
                  )}

                  {article.enclosure && (
                    <Image
                      src={article.enclosure}
                      width={550}
                      height={300}
                      alt={article.title?.[0] || "News image"}
                      className="mt-2 max-w-full h-auto"
                    />
                  )}
                  <div className="text-sm text-yellow-800 mt-2"><a href={article.link} target="_blank" rel="noopener noreferrer">Bron: AT5</a></div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
