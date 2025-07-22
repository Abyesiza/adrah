'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Collapse,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import InputComponent from './input';
import { analyzeWithLLM, LLMRouteResponse } from '@/lib/llm-router';

interface PersistentInputProps {
  className?: string;
}

const WELCOME_KEY = 'adrah_llm_router_welcome_v2';
const WELCOME_MESSAGE =
  "Welcome to Adrah! I'm powered by AI to help you navigate. You can type or speak what you want to do, and I'll intelligently route you to the right page. For example, say 'Show me the dashboard' or 'I need to contact support'. I'll always be here at the bottom to help you navigate.";

// Try to select a smooth, female English voice
function getPreferredVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  // Prefer female, English, and smooth voices
  const preferred = voices.find(v =>
    v.lang.toLowerCase().startsWith('en') &&
    ((v.name.toLowerCase().includes('female')) ||
      v.name.toLowerCase().includes('woman') ||
      v.name.toLowerCase().includes('susan') ||
      v.name.toLowerCase().includes('samantha') ||
      v.name.toLowerCase().includes('zoe') ||
      v.name.toLowerCase().includes('lisa') ||
      v.name.toLowerCase().includes('karen') ||
      v.name.toLowerCase().includes('emma') ||
      v.name.toLowerCase().includes('olivia') ||
      v.name.toLowerCase().includes('lucy') ||
      v.name.toLowerCase().includes('jenny') ||
      v.name.toLowerCase().includes('amy') ||
      v.name.toLowerCase().includes('victoria')
    )
  );
  // Fallback to any English voice
  if (preferred) return preferred;
  const enVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
  return enVoice || null;
}

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); // Stop any ongoing speech
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1.05;
  utter.volume = 1;
  // Try to get a smooth, female voice
  const setVoice = () => {
    const voice = getPreferredVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  };
  // Some browsers load voices asynchronously
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = setVoice;
  } else {
    setVoice();
  }
}

const PersistentInput: React.FC<PersistentInputProps> = ({ className }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<LLMRouteResponse | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingAI, setIsUsingAI] = useState(false);
  const hasWelcomed = useRef(false);

  // Initial welcome/explanation (only once per session)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.localStorage.getItem(WELCOME_KEY)) {
      speak(WELCOME_MESSAGE);
      window.localStorage.setItem(WELCOME_KEY, '1');
      hasWelcomed.current = true;
    }
  }, []);

  // Speak routing feedback after analysis
  useEffect(() => {
    if (analysisResult && showSuggestions && !isAnalyzing) {
      // Use the dynamic TTS message from Gemini if available, otherwise fallback to the old logic
      if (analysisResult.ttsMessage) {
        speak(analysisResult.ttsMessage);
      } else {
        // Fallback to the old hardcoded logic
        const { intent } = analysisResult;
        const confidencePct = Math.round(intent.confidence * 100);
        const routeName = intent.route === '/' ? 'home' : intent.route.replace('/', '');
        
        let msg = `I analyzed your request using ${isUsingAI ? 'AI' : 'keyword matching'}. I am ${confidencePct} percent confident you want the ${routeName} page.`;
        
        if (intent.confidence > 0.7) {
          msg += ' I will take you there now.';
        } else {
          msg += ' Would you like me to take you there, or would you prefer to try a different request?';
        }
        
        speak(msg);
      }
    }
  }, [analysisResult, showSuggestions, isAnalyzing, isUsingAI]);

  const handleUserInput = async (message: string) => {
    if (!message.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    setShowSuggestions(true);
    setIsUsingAI(false);
    
    try {
      const result = await analyzeWithLLM(message);
      setAnalysisResult(result);
      setIsUsingAI(true); // If we get here, the AI API worked
      
      if (result.intent.confidence > 0.7) {
        setTimeout(() => {
          router.push(result.intent.route);
          setShowSuggestions(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze your request. Please try again.');
      setIsUsingAI(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNavigate = (route: string) => {
    router.push(route);
    setShowSuggestions(false);
    setAnalysisResult(null);
  };

  const handleSuggestionClick = (action: string) => {
    console.log('Suggested action:', action);
  };

  return (
    <Box
      className={className}
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        width: '100%',
        pb: { xs: 'env(safe-area-inset-bottom)', sm: 0 },
        background: 'transparent',
        boxShadow: isMobile ? '0 -2px 16px 0 rgba(0,0,0,0.25)' : 'none',
        transition: 'box-shadow 0.2s',
      }}
    >
      <Paper
        elevation={isMobile ? 12 : 8}
        sx={{
          p: { xs: 0.5, sm: 1.5 },
          borderRadius: { xs: 2, sm: 3 },
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          maxWidth: { xs: '100vw', sm: 600 },
          mx: 'auto',
          mb: { xs: 0.5, sm: 2 },
        }}
      >
        <InputComponent
          onSendMessage={handleUserInput}
          placeholder="Type or say what you want..."
          disabled={isAnalyzing}
          fullWidth
        />
      </Paper>
      <Collapse in={showSuggestions}>
        <Box sx={{ mt: 1, px: { xs: 0.5, sm: 0 } }}>
          {isAnalyzing && (
            <Paper elevation={2} sx={{ p: { xs: 1, sm: 1.5 }, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2" sx={{ fontSize: { xs: '0.93rem', sm: '0.95rem' } }}>
                  Analyzing your request with AI...
                </Typography>
              </Box>
            </Paper>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 1, fontSize: { xs: '0.93rem', sm: '0.95rem' } }}>
              {error}
            </Alert>
          )}
          {analysisResult && (
            <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 }, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '0.98rem', sm: '1rem' }, fontWeight: 500 }}>
                  I understand you want to:
                </Typography>
                {isUsingAI && (
                  <Chip
                    label="AI Powered"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem', height: 20 }}
                  />
                )}
              </Box>
              <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.93rem', sm: '0.95rem' } }}>
                {analysisResult.intent.description}
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                  Confidence: {Math.round(analysisResult.intent.confidence * 100)}%
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                  {analysisResult.intent.keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' }, height: 22 }}
                    />
                  ))}
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {analysisResult.reasoning}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <Button
                  variant="contained"
                  onClick={() => handleNavigate(analysisResult.intent.route)}
                  sx={{ minWidth: 90, fontSize: { xs: '0.93rem', sm: '0.95rem' }, py: 0.5, px: 1.5, height: 32 }}
                >
                  Go to {analysisResult.intent.route === '/' ? 'Home' : analysisResult.intent.route.slice(1)}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowSuggestions(false)}
                  sx={{ fontSize: { xs: '0.93rem', sm: '0.95rem' }, py: 0.5, px: 1.5, height: 32 }}
                >
                  Cancel
                </Button>
              </Box>
              {analysisResult.suggestedActions && (
                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom>
                    Suggested actions:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    {analysisResult.suggestedActions.map((action, index) => (
                      <Chip
                        key={index}
                        label={action}
                        size="small"
                        onClick={() => handleSuggestionClick(action)}
                        sx={{ cursor: 'pointer', fontSize: { xs: '0.75rem', sm: '0.8rem' }, height: 22 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default PersistentInput; 