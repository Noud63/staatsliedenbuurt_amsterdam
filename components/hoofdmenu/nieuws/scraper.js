// Scraper for gathering news facts about Staatsliendenbuurt
import axios from 'axios';
import * as cheerio from 'cheerio';
import { AT5RSSIntegration } from './at5-rss-integration';

export class StaatsliedenbuurtScraper {
  constructor() {
    this.baseUrls = [
      'https://www.at5.nl',
    ];

    // Search terms for Staatsliedenbuurt
    this.searchTerms = [
      'staatsliedenbuurt',
      'Staatsliedenbuurt',
      'Staatsliedenbuurt Amsterdam',
      'Amsterdam Staatsliedenbuurt',
      'Westergasterrein',
      'WesterGas'
    ];

    // Initialize RSS integration
    this.rssIntegration = new AT5RSSIntegration();
  }

  async getStaatsliedenbuurtFacts() {
    try {
      const newsFacts = [];

      // Try to fetch from multiple sources including AT5.nl using RSS approach
      for (const term of this.searchTerms) {
        const facts = await this.searchNews(term);
        newsFacts.push(...facts);
      }

      // Filter and deduplicate results
      const filteredFacts = this.filterRelevantFacts(newsFacts, this.searchTerms);
      const deduplicatedFacts = this.deduplicateNewsFacts(filteredFacts);

      return deduplicatedFacts;
    } catch (error) {
      console.error('Error in getStaatsliedenbuurtFacts:', error);
      return [];
    }
  }

  async searchNews(query) {
    const facts = [];

    try {
      // First, let's implement AT5.nl specific scraping using RSS approach
      const at5Facts = await this.scrapeAT5News(query);
      facts.push(...at5Facts);

      // Format and validate the results
      return facts.map(fact => {
        return this.validateNewsFact(fact) ? fact : null;
      }).filter(Boolean);

    } catch (error) {
      console.error(`Error searching news for "${query}":`, error);
      return [];
    }
  }

  async scrapeAT5News(query) {
    const newsItems = [];

    try {
      // Use RSS approach instead of direct scraping for legal compliance
      const rssFacts = await this.rssIntegration.getAT5NewsByKeyword(query);
      newsItems.push(...rssFacts);

      // If no results from RSS, fall back to direct scraping (but note this is not recommended)
      if (newsItems.length === 0) {
        console.log(`No results found via RSS for "${query}", attempting direct scraping...`);
        // Direct scraping would go here, but it's discouraged due to AT5.nl terms
      }

    } catch (error) {
      console.error('Error in scrapeAT5News:', error);
      // Return empty array if scraping fails, but don't stop the entire process
    }

    return newsItems;
  }

  // Helper function to parse dates from AT5.nl format (using RSS integration)
  parseAT5Date(dateString) {
    // This method is now handled by the RSS integration class
    // But keeping it for compatibility with any remaining code that might call it
    return new Date().toISOString();
  }

  deduplicateNewsFacts(facts) {
    const seen = new Set();
    const uniqueFacts = [];

    facts.forEach(fact => {
      // Create a unique key based on title and link (more reliable than title+summary)
      const key = `${fact.title.toLowerCase()}-${fact.link.toLowerCase()}`;

      if (!seen.has(key)) {
        seen.add(key);
        uniqueFacts.push(fact);
      }
    });

    return uniqueFacts;
  }

  filterRelevantFacts(facts, keywords = []) {
    // Filter facts that are relevant to Staatsliedenbuurt
    return facts.filter(fact => {
      const content = `${fact.title} ${fact.summary}`.toLowerCase();
      return keywords.some(keyword => content.includes(keyword.toLowerCase()));
    });
  }

  validateNewsFact(fact) {
    // Validate that the news fact has required fields
    return (
      fact.title &&
      fact.summary &&
      fact.source &&
      fact.date
    );
  }

  // Method to get news from a specific source using RSS approach
  async getNewsFromSource(sourceUrl, searchQuery = '') {
    try {
      // Use RSS approach for AT5.nl
      if (sourceUrl.includes('at5.nl')) {
        const rssFacts = await this.rssIntegration.getAT5NewsByKeyword(searchQuery);
        return rssFacts;
      }

      // For other sources, implement direct scraping or other methods
      return [];
    } catch (error) {
      console.error(`Error getting news from ${sourceUrl}:`, error);
      return [];
    }
  }
}