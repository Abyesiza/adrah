'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import LayoutWithInput from '../layout-with-input';

export default function DashboardPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <LayoutWithInput>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 3 } }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>
          Dashboard
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
          Welcome back! Here's what's happening with your account.
        </Typography>

        {/* Quick Stats */}
        <Box sx={{ mb: { xs: 2, sm: 4 } }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, sm: 3 }
          }}>
            {[
              { title: 'Total Users', value: '1,234', icon: <PeopleIcon />, color: 'primary' },
              { title: 'Revenue', value: '$45,678', icon: <TrendingUpIcon />, color: 'success' },
              { title: 'Analytics', value: '89%', icon: <AssessmentIcon />, color: 'info' },
              { title: 'Settings', value: 'Active', icon: <SettingsIcon />, color: 'warning' },
            ].map((stat, index) => (
              <Card key={index} elevation={2} sx={{ minWidth: 0, p: { xs: 2, sm: 3 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: `${stat.color}.main`, mr: 1, fontSize: { xs: '2rem', sm: '2.5rem' } }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: { xs: 2, sm: 4 }
        }}>
          {/* Left Column */}
          <Box>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                Recent Activity
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { action: 'New user registered', time: '2 minutes ago', type: 'user' },
                  { action: 'Analytics report generated', time: '15 minutes ago', type: 'analytics' },
                  { action: 'Settings updated', time: '1 hour ago', type: 'settings' },
                  { action: 'Contact form submitted', time: '2 hours ago', type: 'contact' },
                ].map((activity, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0.5, sm: 0 } }}>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                      <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                        {activity.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                    <Chip
                      label={activity.type}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, mt: { xs: 0.5, sm: 0 } }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                System Performance
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'CPU Usage', value: 65, color: 'primary' },
                  { label: 'Memory Usage', value: 45, color: 'success' },
                  { label: 'Storage Usage', value: 78, color: 'warning' },
                  { label: 'Network', value: 92, color: 'error' },
                ].map((metric, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>{metric.label}</Typography>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>{metric.value}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={metric.value}
                      color={metric.color as any}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Right Column */}
          <Box>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  'View Analytics',
                  'Manage Users',
                  'Update Settings',
                  'Generate Report',
                  'Contact Support',
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    fullWidth
                    sx={{ justifyContent: 'flex-start', fontSize: { xs: '0.98rem', sm: '1.05rem' }, py: 1 }}
                  >
                    {action}
                  </Button>
                ))}
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                Recent Messages
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { sender: 'John Doe', message: 'Need help with analytics', time: '5m ago' },
                  { sender: 'Jane Smith', message: 'Settings configuration question', time: '1h ago' },
                  { sender: 'Mike Johnson', message: 'Great work on the dashboard!', time: '2h ago' },
                ].map((msg, index) => (
                  <Box key={index} sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                    <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.98rem', sm: '1.05rem' } }}>
                      {msg.sender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                      {msg.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {msg.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Bottom Section */}
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mt: { xs: 2, sm: 4 }, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.7rem' } }}>
            Need Something Specific?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '1rem', sm: '1.15rem' } }}>
            Use the AI assistant below to quickly navigate to any section or get help with specific tasks.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              'Show me analytics',
              'I need help',
              'Update my profile',
              'Contact support',
            ].map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                color="primary"
                variant="outlined"
                sx={{ cursor: 'pointer', fontSize: { xs: '0.9rem', sm: '1rem' }, p: 1, mb: 1 }}
              />
            ))}
          </Box>
        </Paper>
      </Container>
    </LayoutWithInput>
  );
} 