'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  IconButton,
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Send as SendIcon,
} from '@mui/icons-material';

interface InputComponentProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const InputComponent: React.FC<InputComponentProps> = ({
  onSendMessage,
  placeholder = "Type your message or speak...",
  disabled = false,
  fullWidth = true,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
        setInputValue(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!isSupported) return;

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setInputValue('');
      recognitionRef.current?.start();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      setTranscript('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper
        elevation={2}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderRadius: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <TextField
          ref={inputRef}
          fullWidth
          multiline
          maxRows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '& fieldset': {
                borderColor: 'divider',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        
        <IconButton
          onClick={toggleListening}
          disabled={!isSupported || disabled}
          color={isListening ? 'error' : 'primary'}
          sx={{
            backgroundColor: isListening ? 'error.light' : 'primary.light',
            color: 'white',
            '&:hover': {
              backgroundColor: isListening ? 'error.main' : 'primary.main',
            },
            '&:disabled': {
              backgroundColor: 'action.disabledBackground',
              color: 'action.disabled',
            },
          }}
        >
          {isListening ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <MicIcon />
          )}
        </IconButton>
        
        <IconButton
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || disabled}
          color="primary"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '&:disabled': {
              backgroundColor: 'action.disabledBackground',
              color: 'action.disabled',
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
      
      {isListening && (
        <Box sx={{ mt: 1, p: 1, backgroundColor: 'info.light', borderRadius: 1 }}>
          <Typography variant="caption" color="info.contrastText">
            🎤 Listening... {transcript && `"${transcript}"`}
          </Typography>
        </Box>
      )}
      
      {!isSupported && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Note: Speech recognition is not supported in this browser. You can still type your message.
        </Typography>
      )}
    </Box>
  );
};

export default InputComponent;
