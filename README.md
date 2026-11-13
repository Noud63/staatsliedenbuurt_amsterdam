# Staatsliedenbuurt News Scraper

This project implements news scraping functionality for Staatsliedenbuurt-related content, with a focus on legal compliance with AT5.nl terms of service.

## Implementation Details

### AT5.nl Scraping Approach
The implementation uses the official AT5.nl RSS feed (`https://rss.at5.nl/rss`) instead of direct web scraping to comply with AT5.nl's disclaimer that prohibits content copying but permits RSS feed usage.

### Key Features
- Keyword filtering for "staatsliedenbuurt" and related terms
- Support for Dutch date formats ("vandaag", "gisteren", "14 apr. 2024", etc.)
- Deduplication of news items
- Backward compatibility with existing scraper structure
- Image extraction from RSS enclosure tags
- Article description word limit (200 words) with "Lees meer" functionality

### RSS Data Fetching
The RSS data is now fetched through a server-side API route at `/api/getrss` instead of directly in the browser. This approach provides better performance, reliability, and maintains proper separation of concerns between client and server components.

## Files
- `at5-rss-integration.js`: Main RSS integration class
- `scraper.js`: Updated scraper that uses RSS approach
- `test-rss-integration.js`: Test verification
- `test-at5-scraping.js`: Analysis of existing implementation
- `rss-filter-function.js`: RSS filtering function with image support
- `RSSComponent.jsx`: React component displaying filtered news with images and word limit functionality
- `RSSSearchComponent.jsx`: React component allowing custom keyword search with images

## Running Tests

To see results in the terminal:

1. Run the image filter test:
   ```bash
   node test-image-filter.js
   ```

2. Or run the simple test:
   ```bash
   node simple-test.js
   ```

3. For detailed debugging:
   ```bash
   node debug-rss.js
   ```

## Usage in React Components

The RSSComponent.jsx now fetches data from the /api/getrss endpoint instead of directly calling the filtering function. The component makes a GET request to this API route which handles all RSS fetching and filtering server-side.

```javascript
// In RSSComponent.jsx, data is fetched from:
fetch('/api/getrss?keyword=west')
```

The API endpoint returns articles with an `enclosure` property containing the image URL when available.

## Implementation Details

### RSS Image Handling
The RSS feed from AT5.nl includes enclosure tags that contain image URLs. The implementation correctly extracts these URLs using the structure:
```javascript
item.enclosure[0]['$'].url
```

This ensures proper handling of the XML structure where enclosure data is stored as an array of objects with '$' properties containing the actual URL.

### Article Description Word Limit
The RSSComponent.jsx now implements a 200-word limit for article descriptions. When an article's description exceeds this limit:
- The description is truncated to 200 words with an ellipsis (...).
- A "Lees meer" (Read more) button appears below the truncated description.
- Clicking "Lees meer" expands the full description.
- Clicking "Lees minder" collapses the description back to the truncated version.