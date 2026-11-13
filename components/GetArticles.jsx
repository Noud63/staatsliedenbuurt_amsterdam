import React,{useState, useEffect} from 'react'
import Spinner from './Spinner';
import Image from 'next/image';

const GetArticles = ({ keyWord }) => {
    const [articles, setArticles] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [expandedArticles, setExpandedArticles] = useState(new Set());

       useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Fetch articles from API route
        const response = await fetch(`/api/getrss?keyword=${keyWord}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch articles");
        }

        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [keyWord]);

   // Function to truncate text to 200 words
  const truncateText = (text, wordLimit = 80) => {
    if (!text) return "";

    // Remove HTML tags and extra whitespace
    const cleanText = text
      .replace(/<\/?(p|h2|a)\b[^>]*>/gi, "")
      .replace(/&nbsp;|&euml;/gi, " ")
      .replace(/&egrave;/gi, "è")
      .trim();

    const words = cleanText.split(/\s+/);
    if (words.length <= wordLimit) {
      return cleanText;
    }

    return words.slice(0, wordLimit).join(" ") + "...";
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

  if (loading)
    return (
      <div className="mt-[100px]">
        <Spinner loading height={40} width={40} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;


  return (
    <div>
        {articles.length === 0 ? (
                  <p className="w-full flex justify-center text-white text-lg mt-12">Geen {keyWord ? keyWord.charAt(0).toUpperCase() + keyWord.slice(1) : ""} nieuws!</p>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {articles.map((article, index) => {
                      const isExpanded = expandedArticles.has(index);
                      const fullDescription = article.description?.[0] || "";
                      const truncatedDescription = truncateText(fullDescription, 50);
        
                      return (
                        <li
                          key={index}
                          className="flex w-full flex-col rounded-lg bg-white px-4 pb-6 pt-4"
                        >
                          <p className="mb-2 text-sm text-yellow-900">
                            Datum: {article.pubDate?.[0].slice(5, 16) || "Unknown date"}
                          </p>
                          <h3 className="text-lg font-bold text-yellow-900">
                            {article.title?.[0] || "No title"}
                          </h3>
        
                          <div className="my-2">
                            {isExpanded
                              ? fullDescription
                                  .replace(/<\/?(p|h2|a)\b[^>]*>/gi, "")
                                  .replace(/&nbsp;|&euml;/gi, " ")
                                  .replace(/&egrave;/gi, "è")
                                  .trim()
                              : truncatedDescription}
                          </div>
        
                          {!isExpanded && (
                            <div className="my-4 flex w-full justify-center">
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
                            <div className="my-4 flex w-full justify-center">
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
                              className="mt-2 h-auto max-w-full"
                            />
                          )}
                          <div className="mt-2 text-sm text-yellow-800">
                            <a
                              href={article.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Bron: AT5
                            </a>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
    </div>
  )
}

export default GetArticles