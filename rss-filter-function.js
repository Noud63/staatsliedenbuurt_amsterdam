// Improved RSS filtering function for use in React components

import axios from 'axios';
import xml2js from 'xml2js';

/**
 * Filter AT5.nl RSS feed by keyword
 * @param {string} keyword - The keyword to search for in titles or descriptions
 * @returns {Promise<Array>} Array of filtered news items
 */
export async function filterRSSByKeyword(keyword = 'staatsliedenbuurt') {
  try {
    // Fetch the RSS feed
    const response = await axios.get('https://rss.at5.nl/rss', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Parse the XML
    const parser = new xml2js.Parser();
    const rssData = await parser.parseStringPromise(response.data);

    // Extract items
    const items = rssData.rss.channel[0].item;

    // console.log(`Total items in RSS feed: ${items.length}`);

    // Filter items by keyword in title or description
    const filteredItems = items.filter(item => {
      const title = item.title ? item.title[0] : '';
      const description = item.description ? item.description[0] : '';

      // Check if keyword exists in title or description (case insensitive)
      return (
        title.toLowerCase().includes(keyword.toLowerCase()) ||
        description.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    // console.log(`Found ${filteredItems.length} items containing "${keyword}":`);

    // Add image URL to each filtered item for easier access in React components
    const itemsWithImages = filteredItems.map(item => {
      let imageUrl = null;

      // Extract image URL from enclosure if available
      // The structure from AT5.nl RSS feed: array of objects with '$' property containing the url
      if (item.enclosure && Array.isArray(item.enclosure) && item.enclosure.length > 0) {
        const firstEnclosure = item.enclosure[0];

        // Check if the first enclosure has a '$' property with 'url'
        if (firstEnclosure && typeof firstEnclosure === 'object' && firstEnclosure['$'] && firstEnclosure['$'].url) {
          imageUrl = firstEnclosure['$'].url;
          // console.log(`${item.title ? item.title[0] : 'No title'} - Image URL: ${imageUrl}`);
        }
      }

      return {
        ...item,
        enclosure: imageUrl
      };
    });

    // console.log(`Returning ${itemsWithImages.length} items with image URLs`);
    // Let's also log the actual structure of one item to debug what we're returning
    if (itemsWithImages.length > 0) {
      // console.log('First item structure:', JSON.stringify({
      //   title: itemsWithImages[0].title?.[0],
      //   enclosure: itemsWithImages[0].enclosure,
      //   link: itemsWithImages[0].link?.[0]
      // }, null, 2));
    }

    return itemsWithImages; // Return the results with image URLs

  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    throw error;
  }
}

/**
 * Get all items from AT5.nl RSS feed (no filtering)
 * @returns {Promise<Array>} Array of all news items
 */
export async function getAllRSSItems() {
  try {
    const response = await axios.get('https://rss.at5.nl/rss', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const parser = new xml2js.Parser();
    const rssData = await parser.parseStringPromise(response.data);
    const items = rssData.rss.channel[0].item;

    return items;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw error;
  }
}