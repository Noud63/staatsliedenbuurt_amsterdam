// More detailed debug script to understand why images aren't showing up
import axios from 'axios';
import xml2js from 'xml2js';

async function detailedDebug() {
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

    console.log(`Total items in RSS feed: ${items.length}`);

    // Look for items with "brand" in title or description
    const brandItems = items.filter(item => {
      const title = item.title ? item.title[0] : '';
      const description = item.description ? item.description[0] : '';
      return (
        title.toLowerCase().includes('brand') ||
        description.toLowerCase().includes('brand')
      );
    });

    console.log(`\nFound ${brandItems.length} items with "brand":`);

    brandItems.forEach((item, index) => {
      console.log(`\n--- Item ${index + 1} ---`);
      console.log('Title:', item.title ? item.title[0] : 'No title');
      console.log('Enclosure present:', !!item.enclosure);

      if (item.enclosure) {
        console.log('Enclosure structure:', JSON.stringify(item.enclosure, null, 2));
        if (item.enclosure[0] && item.enclosure[0]['@']) {
          console.log('Enclosure URL:', item.enclosure[0]['@'].url);
        }
      } else {
        console.log('No enclosure data');
      }
    });

    // Look for items with "amsterdam" in title or description
    const amsterdamItems = items.filter(item => {
      const title = item.title ? item.title[0] : '';
      const description = item.description ? item.description[0] : '';
      return (
        title.toLowerCase().includes('amsterdam') ||
        description.toLowerCase().includes('amsterdam')
      );
    });

    console.log(`\nFound ${amsterdamItems.length} items with "amsterdam":`);

    amsterdamItems.forEach((item, index) => {
      console.log(`\n--- Item ${index + 1} ---`);
      console.log('Title:', item.title ? item.title[0] : 'No title');
      console.log('Enclosure present:', !!item.enclosure);

      if (item.enclosure) {
        console.log('Enclosure structure:', JSON.stringify(item.enclosure, null, 2));
        if (item.enclosure[0] && item.enclosure[0]['@']) {
          console.log('Enclosure URL:', item.enclosure[0]['@'].url);
        }
      } else {
        console.log('No enclosure data');
      }
    });

  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
  }
}

detailedDebug();