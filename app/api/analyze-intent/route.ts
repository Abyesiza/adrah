import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Define available routes for the AI to choose from
    const availableRoutes = {
      '/': 'Home page - general information and overview',
      '/about': 'About page - information about the company, team, or project',
      '/contact': 'Contact page - ways to get in touch, contact information',
      '/dashboard': 'Dashboard - main user interface, overview of data and controls',
      '/analytics': 'Analytics page - data analysis, charts, statistics',
      '/settings': 'Settings page - configuration, preferences, system settings',
      '/help': 'Help page - documentation, FAQ, support resources'
    };

    const prompt = `You are an AI assistant that helps users navigate a website by understanding their intent and routing them to the appropriate page. You also provide natural, conversational responses for text-to-speech.

Available routes and their descriptions:
${Object.entries(availableRoutes).map(([route, desc]) => `- ${route}: ${desc}`).join('\n')}

User input: "${userInput}"

Please analyze the user's intent and respond with a JSON object in this exact format:
{
  "intent": {
    "route": "/route-path",
    "confidence": 0.85,
    "description": "Brief description of what the user wants",
    "keywords": ["keyword1", "keyword2"]
  },
  "reasoning": "Explain why you chose this route based on the user's input",
  "suggestedActions": ["action1", "action2", "action3"],
  "ttsMessage": "A natural, conversational message to speak to the user about the analysis and next steps"
}

Rules:
1. Choose the most appropriate route from the available routes above
2. Confidence should be between 0.1 and 1.0
3. Include relevant keywords from the user's input
4. Provide clear reasoning for your choice
5. Suggest 2-3 relevant actions the user might want to take
6. Create a natural, conversational TTS message that:
   - Acknowledges what the user said
   - Explains what you understood
   - Mentions the confidence level naturally
   - Describes the destination page
   - If confidence > 0.7, indicate you'll take them there
   - If confidence < 0.7, ask if they want to proceed or try again
   - Keep it conversational and friendly, not robotic
7. If the user's intent is unclear, default to "/" with lower confidence

Example TTS messages:
- High confidence: "I understand you want to see the dashboard. I'm 85% confident that's what you're looking for. I'll take you there now."
- Low confidence: "I think you might want to contact support, but I'm only 60% sure. Would you like me to take you to the contact page, or would you prefer to try a different request?"

Respond only with the JSON object, no additional text.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    
    // Try to parse the JSON response
    let parsedResponse;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate the response structure
    if (!parsedResponse.intent || !parsedResponse.intent.route) {
      throw new Error('Invalid response structure from AI');
    }

    // Ensure the route is valid
    if (!availableRoutes[parsedResponse.intent.route as keyof typeof availableRoutes]) {
      parsedResponse.intent.route = '/';
      parsedResponse.intent.confidence = Math.max(0.1, parsedResponse.intent.confidence * 0.5);
    }

    // Ensure TTS message exists, fallback if not
    if (!parsedResponse.ttsMessage) {
      const confidencePct = Math.round(parsedResponse.intent.confidence * 100);
      const routeName = parsedResponse.intent.route === '/' ? 'home' : parsedResponse.intent.route.replace('/', '');
      
      if (parsedResponse.intent.confidence > 0.7) {
        parsedResponse.ttsMessage = `I understand you want to visit the ${routeName} page. I'm ${confidencePct}% confident that's what you're looking for. I'll take you there now.`;
      } else {
        parsedResponse.ttsMessage = `I think you might want the ${routeName} page, but I'm only ${confidencePct}% sure. Would you like me to take you there, or would you prefer to try a different request?`;
      }
    }

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error('Error in analyze-intent API:', error);
    
    // Fallback response
    return NextResponse.json({
      intent: {
        route: '/',
        confidence: 0.3,
        description: 'Home page - general information and overview',
        keywords: ['fallback']
      },
      reasoning: 'Unable to analyze your request. Taking you to the home page.',
      suggestedActions: ['Try rephrasing your request', 'Browse the menu', 'Contact support'],
      ttsMessage: 'I had trouble understanding your request. I\'ll take you to the home page where you can explore our features.'
    });
  }
} 