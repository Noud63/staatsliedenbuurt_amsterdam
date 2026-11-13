import { NextResponse } from 'next/server';
import axios from 'axios';
import xml2js from 'xml2js';

// Helper function to filter articles by keyword
async function filterRSSByKeyword(keyword = 'west') {
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
        }
      }

      return {
        ...item,
        enclosure: imageUrl
      };
    });

    return itemsWithImages;

  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || 'west';

    // Fetch filtered articles
    const articles = await filterRSSByKeyword(keyword);

    return NextResponse.json({
      success: true,
      articles: articles,
      count: articles.length
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch RSS data',
        message: error.message
      },
      { status: 500 }
    );
  }
}