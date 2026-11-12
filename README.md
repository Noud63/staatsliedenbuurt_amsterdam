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

### Files
- `at5-rss-integration.js`: Main RSS integration class
- `scraper.js`: Updated scraper that uses RSS approach
- `test-rss-integration.js`: Test verification
- `test-at5-scraping.js`: Analysis of existing implementation

## Usage
The `StaatsliedenbuurtScraper` class automatically uses the RSS approach when fetching AT5.nl news content.