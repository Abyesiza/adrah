'use client';

// Contact page - Updated for mobile responsiveness and Material UI v7 compatibility
// Uses CSS Grid layouts instead of Material UI Grid components for better mobile experience

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import LayoutWithInput from '../layout-with-input';

export default function ContactPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <LayoutWithInput>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 3 } }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>
          Contact Us
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
          Get in touch with our team. We're here to help with any questions or support you need.
        </Typography>

        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            gap: { xs: 2, sm: 4 },
            mb: { xs: 3, sm: 6 }
          }}
        >
          {/* Contact Form */}
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
              Send us a Message
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              Fill out the form below and we'll get back to you as soon as possible.
            </Typography>
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: { xs: 2, sm: 3 }
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                size="medium"
                sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                size="medium"
                sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}
              />
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                size="medium"
                sx={{ fontSize: { xs: '0.95rem', sm: '1rem' }, gridColumn: { xs: '1', sm: '1 / -1' } }}
              />
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                size="medium"
                sx={{ fontSize: { xs: '0.95rem', sm: '1rem' }, gridColumn: { xs: '1', sm: '1 / -1' } }}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                size="medium"
                sx={{ fontSize: { xs: '0.95rem', sm: '1rem' }, gridColumn: { xs: '1', sm: '1 / -1' } }}
              />
              <Button
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.1rem' }, 
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 3, sm: 4 },
                  gridColumn: { xs: '1', sm: '1 / -1' }
                }}
              >
                Send Message
              </Button>
            </Box>
          </Paper>

          {/* Contact Information */}
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, height: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              We'd love to hear from you. Here are our contact details:
            </Typography>
            <List sx={{ mb: 3 }}>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary="support@adrah.com"
                  sx={{ 
                    '& .MuiListItemText-primary': { fontSize: { xs: '1rem', sm: '1.1rem' }, fontWeight: 600 },
                    '& .MuiListItemText-secondary': { fontSize: { xs: '0.95rem', sm: '1rem' } }
                  }}
                />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Phone"
                  secondary="+1 (555) 123-4567"
                  sx={{ 
                    '& .MuiListItemText-primary': { fontSize: { xs: '1rem', sm: '1.1rem' }, fontWeight: 600 },
                    '& .MuiListItemText-secondary': { fontSize: { xs: '0.95rem', sm: '1rem' } }
                  }}
                />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                  <LocationIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Address"
                  secondary="123 Innovation Street, Tech City, TC 12345"
                  sx={{ 
                    '& .MuiListItemText-primary': { fontSize: { xs: '1rem', sm: '1.1rem' }, fontWeight: 600 },
                    '& .MuiListItemText-secondary': { fontSize: { xs: '0.95rem', sm: '1rem' } }
                  }}
                />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Business Hours"
                  secondary="Monday - Friday: 9:00 AM - 6:00 PM"
                  sx={{ 
                    '& .MuiListItemText-primary': { fontSize: { xs: '1rem', sm: '1.1rem' }, fontWeight: 600 },
                    '& .MuiListItemText-secondary': { fontSize: { xs: '0.95rem', sm: '1rem' } }
                  }}
                />
              </ListItem>
            </List>
          </Paper>
        </Box>

        {/* Support Options */}
        <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, mb: { xs: 2, sm: 3 } }}>
          How Can We Help?
        </Typography>
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, sm: 3 }
          }}
        >
          {[
            { title: 'Email Support', description: 'Get help via email', icon: <EmailIcon /> },
            { title: 'Phone Support', description: 'Call us directly', icon: <PhoneIcon /> },
            { title: 'Live Chat', description: 'Chat with our team', icon: <ScheduleIcon /> },
            { title: 'Documentation', description: 'Browse our guides', icon: <LocationIcon /> },
          ].map((option, index) => (
            <Card key={index} elevation={2} sx={{ height: '100%', textAlign: 'center', p: { xs: 2, sm: 3 } }}>
              <CardContent>
                <Box sx={{ color: 'primary.main', fontSize: { xs: '2.5rem', sm: '3rem' }, mb: 2 }}>
                  {option.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {option.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                  {option.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* FAQ Section */}
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mt: { xs: 3, sm: 4 } }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
            Frequently Asked Questions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              {
                question: 'How do I get started with the AI navigation?',
                answer: 'Simply use the input box at the bottom of any page to describe what you want to do in natural language.'
              },
              {
                question: 'Is my data secure?',
                answer: 'Yes, we take security seriously. All data is encrypted and we follow industry best practices.'
              },
              {
                question: 'Can I customize the AI assistant?',
                answer: 'Currently, the AI assistant is pre-configured, but we\'re working on customization options.'
              },
            ].map((faq, index) => (
              <Box key={index} sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {faq.question}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                  {faq.answer}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </LayoutWithInput>
  );
} 