// Test script to demonstrate the RSS filtering with image handling functionality
import { filterRSSByKeyword } from './rss-filter-function.js';

// Test with a more general keyword that might appear in news
console.log('Testing with keyword "Amsterdam"');
filterRSSByKeyword('Amsterdam')
  .then(items => {
    console.log(`Found ${items.length} articles with images`);
    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title?.[0] || 'No title'}`);
      if (item.enclosure) {
        console.log(`   Image URL: ${item.enclosure}`);
      }
      console.log('');
    });
  })
  .catch(console.error);

console.log('\n--- Testing with keyword "brand" ---');
filterRSSByKeyword('brand')
  .then(items => {
    console.log(`Found ${items.length} articles with images`);
    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title?.[0] || 'No title'}`);
      if (item.enclosure) {
        console.log(`   Image URL: ${item.enclosure}`);
      }
      console.log('');
    });
  })
  .catch(console.error);