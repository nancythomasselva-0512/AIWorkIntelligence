export class CategorizationEngine {
  private static readonly rules = [
    {
      category: 'Website Development',
      keywords: ['website', 'web application', 'frontend', 'backend', 'react', 'nextjs', 'ui', 'ux', 'landing page']
    },
    {
      category: 'Mobile Application Development',
      keywords: ['mobile app', 'android', 'ios', 'flutter', 'react native', 'apk']
    },
    {
      category: 'Technical Support',
      keywords: ['troubleshooting', 'support', 'issue fixed', 'installation', 'configuration', 'maintenance']
    },
    {
      category: 'Debugging',
      keywords: ['bug', 'debug', 'error', 'fix', 'issue resolved']
    },
    {
      category: 'Meeting',
      keywords: ['meeting', 'discussion', 'client call', 'review', 'presentation']
    },
    {
      category: 'Infrastructure Management',
      keywords: ['dns', 'server', 'network', 'firewall', 'google workspace', 'microsoft 365']
    },
    {
      category: 'AI & Innovation',
      keywords: ['ai', 'machine learning', 'automation', 'chatbot', 'innovation']
    }
  ];

  static analyze(text: string) {
    if (!text) {
      return { category: 'General', subCategory: null, tags: '' };
    }

    const lowerText = text.toLowerCase();
    const scores: { category: string; score: number; matchedKeywords: string[] }[] = [];

    for (const rule of this.rules) {
      let score = 0;
      const matchedKeywords: string[] = [];

      for (const keyword of rule.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          score++;
          matchedKeywords.push(keyword);
        }
      }

      if (score > 0) {
        scores.push({ category: rule.category, score, matchedKeywords });
      }
    }

    // Sort descending by score
    scores.sort((a, b) => b.score - a.score);

    if (scores.length === 0) {
      return { category: 'General', subCategory: null, tags: '' };
    }

    const primary = scores[0];
    const secondary = scores.length > 1 ? scores[1] : null;

    // Collect all matched keywords across all rules for tags
    const allMatchedKeywords = new Set<string>();
    for (const s of scores) {
      for (const kw of s.matchedKeywords) {
        allMatchedKeywords.add(kw);
      }
    }

    const tagsArray = Array.from(allMatchedKeywords).map(kw => {
      // capitalize first letter and remove spaces for hashtag format
      return `#${kw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`;
    });

    return {
      category: primary.category,
      subCategory: secondary ? secondary.category : null,
      tags: tagsArray.join(', ')
    };
  }
}
