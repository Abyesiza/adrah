'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Card, CardContent, useTheme } from '@mui/material';
import LayoutWithInput from './layout-with-input';

export default function HomePage() {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ensure we're on the client side to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
    // Set mobile state after client-side detection
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    setIsMobile(mediaQuery.matches);
    
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <LayoutWithInput>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 3 } }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>
          Welcome to Adrah
        </Typography>
        
        <Typography variant="h5" color="text.secondary" align="center" sx={{ mb: { xs: 3, sm: 6 }, fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
          AI-powered intelligent navigation
        </Typography>

        {/* Hero Section */}
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 6 }, mb: { xs: 3, sm: 6 }, textAlign: 'center', borderRadius: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.5rem' } }}>
            🎯 Smart Navigation
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Describe what you want to do, and our AI will take you there instantly.
          </Typography>
        </Paper>

        {/* Features Grid */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: { xs: 2, sm: 4 }, 
            mb: { xs: 3, sm: 6 }
          }}
        >
          {[
            {
              title: 'Voice & Text',
              description: 'Speak or type naturally',
              icon: '🎤',
              color: 'primary'
            },
            {
              title: 'Smart Routing',
              description: 'AI understands your intent',
              icon: '🧠',
              color: 'success'
            },
            {
              title: 'Always Here',
              description: 'Input stays with you everywhere',
              icon: '📍',
              color: 'info'
            },
            {
              title: 'Smart Help',
              description: 'Get suggestions and quick actions',
              icon: '💡',
              color: 'warning'
            }
          ].map((feature, index) => (
            <Card key={index} elevation={2} sx={{ minWidth: 0 }}>
              <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 } }}>
                <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2.5rem', sm: '3rem' } }}>
                  {feature.icon}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Available Pages */}
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: { xs: 2, sm: 4 }, fontSize: { xs: '1.3rem', sm: '2rem' } }}>
          Explore Our Pages
        </Typography>
        
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: { xs: 2, sm: 3 }, 
            mb: { xs: 3, sm: 6 }
          }}
        >
          {[
            { name: 'Dashboard', desc: 'Main control panel' },
            { name: 'About', desc: 'Company and team info' },
            { name: 'Contact', desc: 'Get support and help' },
            { name: 'Analytics', desc: 'Data and insights' },
          ].map((page, index) => (
            <Card key={index} elevation={2} sx={{ textAlign: 'center', minWidth: 0 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {page.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {page.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </LayoutWithInput>
  );
}