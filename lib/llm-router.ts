export interface RouteIntent {
  route: string;
  confidence: number;
  description: string;
  keywords: string[];
}

export interface LLMRouteResponse {
  intent: RouteIntent;
  reasoning: string;
  suggestedActions?: string[];
  ttsMessage: string;
}

// Define available routes and their descriptions
const AVAILABLE_ROUTES = {
  '/': {
    description: 'Home page - general information and overview',
    keywords: ['home', 'main', 'overview', 'start', 'beginning', 'welcome']
  },
  '/about': {
    description: 'About page - information about the company, team, or project',
    keywords: ['about', 'company', 'team', 'story', 'mission', 'vision', 'who we are']
  },
  '/contact': {
    description: 'Contact page - ways to get in touch, contact information',
    keywords: ['contact', 'reach', 'email', 'phone', 'support', 'help', 'get in touch']
  },
  '/dashboard': {
    description: 'Dashboard - main user interface, overview of data and controls',
    keywords: ['dashboard', 'main', 'overview', 'control panel', 'home', 'user interface']
  },
  '/profile': {
    description: 'User profile - personal information, settings, preferences',
    keywords: ['profile', 'account', 'settings', 'preferences', 'personal', 'my info']
  },
  '/analytics': {
    description: 'Analytics page - data analysis, charts, statistics',
    keywords: ['analytics', 'data', 'charts', 'statistics', 'reports', 'insights', 'metrics']
  },
  '/settings': {
    description: 'Settings page - configuration, preferences, system settings',
    keywords: ['settings', 'configuration', 'preferences', 'options', 'setup', 'config']
  },
  '/help': {
    description: 'Help page - documentation, FAQ, support resources',
    keywords: ['help', 'support', 'faq', 'documentation', 'guide', 'tutorial', 'how to']
  }
};

// Simple intent analysis function (fallback when API is not available)
export async function analyzeUserIntent(userInput: string): Promise<LLMRouteResponse> {
  const input = userInput.toLowerCase().trim();
  
  // Simple keyword matching (fallback)
  let bestMatch: RouteIntent | null = null;
  let highestConfidence = 0;
  
  for (const [route, routeInfo] of Object.entries(AVAILABLE_ROUTES)) {
    let confidence = 0;
    let matchedKeywords: string[] = [];
    
    // Check for exact route matches
    if (input.includes(route.slice(1)) && route !== '/') {
      confidence += 0.8;
      matchedKeywords.push(route.slice(1));
    }
    
    // Check for keyword matches
    for (const keyword of routeInfo.keywords) {
      if (input.includes(keyword)) {
        confidence += 0.3;
        matchedKeywords.push(keyword);
      }
    }
    
    // Check for description matches
    const descriptionWords = routeInfo.description.toLowerCase().split(' ');
    for (const word of descriptionWords) {
      if (word.length > 3 && input.includes(word)) {
        confidence += 0.1;
      }
    }
    
    if (confidence > highestConfidence) {
      highestConfidence = confidence;
      bestMatch = {
        route,
        confidence: Math.min(confidence, 1),
        description: routeInfo.description,
        keywords: matchedKeywords
      };
    }
  }
  
  // Default to home if no good match
  if (!bestMatch || bestMatch.confidence < 0.2) {
    bestMatch = {
      route: '/',
      confidence: 0.5,
      description: 'Home page - general information and overview',
      keywords: ['default']
    };
  }
  
                return {
                intent: bestMatch,
                reasoning: `Based on your input "${userInput}", I detected keywords: ${bestMatch.keywords.join(', ')}. This suggests you want to ${bestMatch.description.toLowerCase()}.`,
                suggestedActions: generateSuggestedActions(bestMatch.route),
                ttsMessage: generateTTSMessage(bestMatch, userInput)
              };
}

function generateSuggestedActions(route: string): string[] {
  const actions: { [key: string]: string[] } = {
    '/': ['View overview', 'Explore features', 'Get started'],
    '/about': ['Learn about the team', 'Read our story', 'See our mission'],
    '/contact': ['Send us a message', 'Call us', 'Get support'],
    '/dashboard': ['View your data', 'Check analytics', 'Manage settings'],
    '/profile': ['Update information', 'Change preferences', 'View account'],
    '/analytics': ['View reports', 'Export data', 'Create charts'],
    '/settings': ['Configure options', 'Change preferences', 'System setup'],
    '/help': ['Browse FAQ', 'Read documentation', 'Contact support']
  };
  
  return actions[route] || ['Continue exploring', 'Get help'];
}

function generateTTSMessage(intent: RouteIntent, userInput: string): string {
  const confidencePct = Math.round(intent.confidence * 100);
  const routeName = intent.route === '/' ? 'home' : intent.route.replace('/', '');
  
  if (intent.confidence > 0.7) {
    return `I understand you want to visit the ${routeName} page. I'm ${confidencePct}% confident that's what you're looking for. I'll take you there now.`;
  } else {
    return `I think you might want the ${routeName} page, but I'm only ${confidencePct}% sure. Would you like me to take you there, or would you prefer to try a different request?`;
  }
}

// Function to integrate with Gemini API
export async function analyzeWithLLM(userInput: string): Promise<LLMRouteResponse> {
  try {
    // Call our Gemini API endpoint
    const response = await fetch('/api/analyze-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Validate the response structure
    if (!result.intent || !result.intent.route) {
      throw new Error('Invalid response structure from API');
    }
    
    return result;
    
  } catch (error) {
    console.error('Error analyzing intent with Gemini API:', error);
    console.log('Falling back to simple keyword analysis...');
    
    // Fallback to simple analysis
    return await analyzeUserIntent(userInput);
  }
} 