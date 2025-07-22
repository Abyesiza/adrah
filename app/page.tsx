'use client';

import React from 'react';
import { Container, Typography, Box, Paper, Card, CardContent, Button, Chip } from '@mui/material';
import LayoutWithInput from './layout-with-input';

export default function HomePage() {
  return (
    <LayoutWithInput>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welcome to Adrah
        </Typography>
        
        <Typography variant="h5" color="text.secondary" align="center" sx={{ mb: 6 }}>
          Experience the future of intelligent navigation with AI-powered routing
        </Typography>

        {/* Hero Section */}
        <Paper elevation={3} sx={{ p: 6, mb: 6, textAlign: 'center', borderRadius: 4 }}>
          <Typography variant="h3" gutterBottom>
            🎯 Smart Navigation, Powered by AI
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Simply describe what you want to do, and our AI will take you there instantly.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              'Show me the dashboard',
              'I need to contact support',
              'Tell me about the company',
              'View my analytics',
            ].map((example, index) => (
              <Chip
                key={index}
                label={example}
                color="primary"
                variant="outlined"
                sx={{ fontSize: '1rem', p: 1 }}
              />
            ))}
          </Box>
        </Paper>

        {/* Features Grid */}
        <Box sx={{ display: 'flex', gap: 4, mb: 6, flexWrap: 'wrap' }}>
          {[
            {
              title: 'Voice & Text Input',
              description: 'Speak naturally or type your requests. Our AI understands both.',
              icon: '🎤',
              color: 'primary'
            },
            {
              title: 'Intelligent Routing',
              description: 'AI analyzes your intent and routes you to the right page instantly.',
              icon: '🧠',
              color: 'success'
            },
            {
              title: 'Always Accessible',
              description: 'The input stays with you on every page for seamless navigation.',
              icon: '📍',
              color: 'info'
            },
            {
              title: 'Smart Suggestions',
              description: 'Get helpful suggestions and quick actions based on your needs.',
              icon: '💡',
              color: 'warning'
            }
          ].map((feature, index) => (
            <Card key={index} elevation={2} sx={{ flex: 1, minWidth: 250 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                  {feature.icon}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* How It Works */}
        <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            How It Works
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { step: '1', title: 'Describe', desc: 'Tell us what you want to do' },
              { step: '2', title: 'Analyze', desc: 'AI understands your intent' },
              { step: '3', title: 'Route', desc: 'Navigate to the right page' },
              { step: '4', title: 'Complete', desc: 'Get what you need instantly' },
            ].map((step, index) => (
              <Box key={index} sx={{ textAlign: 'center', minWidth: 150 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  {step.step}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Available Pages */}
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Explore Our Pages
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', mb: 6 }}>
          {[
            { name: 'Dashboard', desc: 'Main control panel and overview', keywords: ['dashboard', 'main', 'overview'] },
            { name: 'About', desc: 'Learn about our company and team', keywords: ['about', 'company', 'team'] },
            { name: 'Contact', desc: 'Get in touch and find support', keywords: ['contact', 'support', 'help'] },
            { name: 'Analytics', desc: 'View data and insights', keywords: ['analytics', 'data', 'reports'] },
          ].map((page, index) => (
            <Card key={index} elevation={2} sx={{ minWidth: 200, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {page.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {page.desc}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {page.keywords.map((keyword, kIndex) => (
                    <Chip
                      key={kIndex}
                      label={keyword}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Try It Now */}
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom>
            Ready to Try It?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Use the AI assistant below to navigate anywhere on our site. Just describe what you want to do!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              'Take me to the dashboard',
              'I want to learn about the company',
              'Help me contact support',
              'Show me some analytics',
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="contained"
                size="large"
                sx={{ textTransform: 'none' }}
              >
                {suggestion}
              </Button>
            ))}
          </Box>
        </Paper>
      </Container>
    </LayoutWithInput>
  );
}