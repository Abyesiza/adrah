'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import LayoutWithInput from '../layout-with-input';

export default function AboutPage() {
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
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>
          About Us
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
          Learn more about our mission, vision, and the team behind our innovative solutions.
        </Typography>

        {/* Mission & Vision */}
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2, sm: 4 }
          }}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, height: '100%' }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, lineHeight: 1.6 }}>
                To revolutionize the way users interact with web applications by providing intelligent, 
                voice-powered navigation that makes technology more accessible and intuitive for everyone.
              </Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, height: '100%' }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, lineHeight: 1.6 }}>
                A future where technology adapts to human communication patterns, making digital 
                experiences as natural as having a conversation with a helpful assistant.
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Team Section */}
        <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, mb: { xs: 2, sm: 3 } }}>
          Meet Our Team
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 2, sm: 3 }
        }}>
          {[
            { name: 'John Doe', role: 'CEO', avatar: 'JD' },
            { name: 'Jane Smith', role: 'CTO', avatar: 'JS' },
            { name: 'Mike Johnson', role: 'Designer', avatar: 'MJ' },
            { name: 'Sarah Wilson', role: 'Developer', avatar: 'SW' },
          ].map((member, index) => (
            <Card key={index} elevation={2} sx={{ height: '100%', textAlign: 'center', p: { xs: 2, sm: 3 } }}>
              <CardContent>
                <Avatar
                  sx={{
                    width: { xs: 60, sm: 80 },
                    height: { xs: 60, sm: 80 },
                    mx: 'auto',
                    mb: 2,
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    bgcolor: 'primary.main',
                  }}
                >
                  {member.avatar}
                </Avatar>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {member.name}
                </Typography>
                <Chip
                  label={member.role}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Values Section */}
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mt: { xs: 3, sm: 4 }, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
            Our Values
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            We believe in creating technology that empowers users and enhances their digital experiences.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              'Innovation',
              'Accessibility',
              'User-Centric',
              'Quality',
              'Collaboration',
            ].map((value, index) => (
              <Chip
                key={index}
                label={value}
                color="primary"
                variant="outlined"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, p: 1, mb: 1 }}
              />
            ))}
          </Box>
        </Paper>
      </Container>
    </LayoutWithInput>
  );
} 