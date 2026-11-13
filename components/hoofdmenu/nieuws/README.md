# AT5.nl News Scraper and RSS Integration

This directory contains components and functions for fetching and displaying news from AT5.nl using their RSS feed approach.

## Key Files

### `scraper.js`
Main scraper class that handles fetching news facts about Staatsliedenbuurt using multiple sources including AT5.nl with RSS approach for legal compliance.

### `RSSComponent.jsx` 
A simple React component that displays news articles filtered by keyword "amsterdam" from AT5.nl RSS feed, showing article titles, links, dates and images when available.

### `RSSSearchComponent.jsx`
A more advanced React component that allows users to search for news articles with custom keywords from AT5.nl RSS feed, showing article titles, descriptions, links, dates and images when available.

### `rss-filter-function.js`
Core module containing functions for filtering AT5.nl RSS feed by keyword:
- `filterRSSByKeyword(keyword)`: Fetches and filters RSS items by keyword, returning items with image URLs from enclosure tags
- `getAllRSSItems()`: Fetches all RSS items without filtering

## Usage Examples

### In React Components
```javascript
// Now fetch data from the API route instead of calling filterRSSByKeyword directly
fetch('/api/getrss?keyword=west')
```

The API endpoint handles all RSS fetching and filtering server-side, providing better performance and reliability.

### Running Tests
To test the filtering functionality directly in terminal:
```bash
node test-image-filter.js
```

## Image Handling

The RSS feed contains enclosure tags with image URLs. The `filterRSSByKeyword` function extracts these URLs and adds them to each article item under the `enclosure` property, making it easy to display images in React components.

## Legal Compliance

This implementation uses AT5.nl's RSS feed approach instead of direct scraping to comply with their terms of service.