// Integration of RSS feed approach with existing scraper for Staatsliedenbuurt news

const axios = require('axios');
const xml2js = require('xml2js');

class AT5RSSIntegration {
  constructor() {
    this.rssUrl = 'https://rss.at5.nl/rss';
    this.searchTerms = [
      'staatsliedenbuurt',
      'Staatsliedenbuurt',
      'Staatsliedenbuurt Amsterdam',
      'Amsterdam Staatsliedenbuurt',
      'Westergasterrein',
      'WesterGas'
    ];
  }

  // Main method to get news from AT5.nl using RSS feed
  async getAT5NewsByKeyword(keyword) {
    try {
      // Fetch and parse the RSS feed
      const rssData = await this.fetchAndParseRSS();

      if (!rssData || !rssData.items) {
        console.log('No RSS data received');
        return [];
      }

      // Filter items by keyword
      const filteredItems = this.filterItemsByKeyword(rssData.items, keyword);

      // Format the results
      const formattedResults = this.formatRSSItems(filteredItems);

      return formattedResults;
    } catch (error) {
      console.error('Error in getAT5NewsByKeyword:', error);
      return [];
    }
  }

  // Fetch and parse RSS feed
  async fetchAndParseRSS() {
    try {
      const response = await axios.get(this.rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const parser = new xml2js.Parser();
      const rssData = await parser.parseStringPromise(response.data);

      // Extract items from RSS
      const items = rssData.rss.channel[0].item || [];

      return {
        items: items,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
      return null;
    }
  }

  // Filter items by keyword in title or description
  filterItemsByKeyword(items, keyword) {
    return items.filter(item => {
      const title = item.title ? item.title[0] : '';
      const description = item.description ? item.description[0] : '';

      // Check if keyword exists in title or description (case insensitive)
      return (
        title.toLowerCase().includes(keyword.toLowerCase()) ||
        description.toLowerCase().includes(keyword.toLowerCase())
      );
    });
  }

  // Format RSS items to match scraper format
  formatRSSItems(items) {
    return items.map(item => {
      const pubDate = item.pubDate ? item.pubDate[0] : '';

      return {
        source: 'AT5.nl',
        title: item.title ? item.title[0] : '',
        summary: item.description ? item.description[0] : '',
        link: item.link ? item.link[0] : '',
        date: this.parseRSSDate(pubDate) || new Date().toISOString(),
        topic: 'Staatsliedenbuurt'
      };
    });
  }

  // Parse RSS dates (handles various formats)
  parseRSSDate(dateString) {
    if (!dateString) return null;

    // Try to parse the date using Date constructor
    const date = new Date(dateString);

    // Check if it's a valid date
    if (isNaN(date.getTime())) {
      // If not valid, try parsing specific Dutch formats
      return this.parseDutchDateFormats(dateString);
    }

    return date.toISOString();
  }

  // Parse Dutch date formats like "vandaag", "gisteren", "14 apr. 2024", etc.
  parseDutchDateFormats(dateString) {
    const lowerDate = dateString.toLowerCase().trim();

    if (lowerDate.includes('vandaag')) {
      return new Date().toISOString();
    }

    if (lowerDate.includes('gisteren')) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toISOString();
    }

    // For date formats like "14 apr. 2024" or "14-04-2024"
    if (dateString.includes('-') && dateString.split('-').length === 3) {
      // Handle dd-mm-yyyy format
      const parts = dateString.split('-');
      if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        const date = new Date(parts[2], parts[1] - 1, parts[0]);
        return date.toISOString();
      }
    }

    // Handle month name format
    if (dateString.includes(' ') && dateString.split(' ').length >= 3) {
      // Try to parse "14 apr. 2024" format
      const dateRegex = /(\d{1,2})\s+([a-z]{3})\.\s+(\d{4})/i;
      const match = dateString.match(dateRegex);
      if (match) {
        const day = parseInt(match[1]);
        const monthNames = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
                           'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
        const month = monthNames.indexOf(match[2].toLowerCase());
        if (month !== -1) {
          const date = new Date(match[3], month, day);
          return date.toISOString();
        }
      }
    }

    // If we can't parse the date, return current date
    return new Date().toISOString();
  }

  // Get news for all search terms
  async getStaatsliedenbuurtNews() {
    const allNews = [];

    for (const term of this.searchTerms) {
      console.log(`Fetching news for: ${term}`);
      const news = await this.getAT5NewsByKeyword(term);
      allNews.push(...news);
    }

    // Deduplicate results
    return this.deduplicateNews(allNews);
  }

  // Remove duplicate news items
  deduplicateNews(newsItems) {
    const seen = new Set();
    const uniqueItems = [];

    newsItems.forEach(item => {
      // Create a unique key based on title and link
      const key = `${item.title.toLowerCase()}-${item.link.toLowerCase()}`;

      if (!seen.has(key)) {
        seen.add(key);
        uniqueItems.push(item);
      }
    });

    return uniqueItems;
  }
}

// Example usage:
async function exampleUsage() {
  console.log('=== AT5.nl RSS Integration Example ===');

  const integration = new AT5RSSIntegration();

  // Get news for a specific keyword
  const keywordNews = await integration.getAT5NewsByKeyword('staatsliedenbuurt');
  console.log(`Found ${keywordNews.length} items for "staatsliedenbuurt"`);

  // Get all news for Staatsliedenbuurt related terms
  const allNews = await integration.getStaatsliedenbuurtNews();
  console.log(`Total unique news items found: ${allNews.length}`);

  if (allNews.length > 0) {
    console.log('\nFirst 3 news items:');
    allNews.slice(0, 3).forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(`   Source: ${item.source}`);
      console.log(`   Date: ${new Date(item.date).toLocaleDateString('nl-NL')}`);
      console.log(`   Link: ${item.link}`);
      console.log('');
    });
  }
}

// Uncomment the line below to run the example
// exampleUsage();

module.exports = { AT5RSSIntegration };