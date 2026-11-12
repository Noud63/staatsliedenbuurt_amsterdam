// Test file to verify RSS integration works with existing scraper structure

const { AT5RSSIntegration } = require('./at5-rss-integration');

async function testRSSIntegration() {
  console.log('=== Testing AT5.nl RSS Integration ===\n');

  try {
    const integration = new AT5RSSIntegration();

    // Test basic functionality
    console.log('1. Testing RSS feed fetching...');
    const rssData = await integration.fetchAndParseRSS();
    if (rssData) {
      console.log('✓ RSS feed fetched successfully');
      console.log(`  Found ${rssData.items.length} items`);
    } else {
      console.log('✗ Failed to fetch RSS feed');
    }

    // Test keyword filtering
    console.log('\n2. Testing keyword filtering...');
    const filteredItems = await integration.getAT5NewsByKeyword('staatsliedenbuurt');
    console.log(`✓ Filtered items: ${filteredItems.length}`);

    if (filteredItems.length > 0) {
      console.log('Sample item:');
      const item = filteredItems[0];
      console.log(`  Title: ${item.title}`);
      console.log(`  Source: ${item.source}`);
      console.log(`  Date: ${item.date}`);
      console.log(`  Link: ${item.link}`);
    }

    // Test full integration
    console.log('\n3. Testing full news fetching...');
    const allNews = await integration.getStaatsliedenbuurtNews();
    console.log(`✓ Total unique news items: ${allNews.length}`);

    if (allNews.length > 0) {
      console.log('First item:');
      const firstItem = allNews[0];
      console.log(`  Title: ${firstItem.title}`);
      console.log(`  Summary: ${firstItem.summary.substring(0, 100)}...`);
    }

    console.log('\n=== Test Completed Successfully ===');

  } catch (error) {
    console.error('Error during test:', error);
  }
}

// Run the test
testRSSIntegration();