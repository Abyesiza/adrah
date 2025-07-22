'use client';

import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import LayoutWithInput from '../layout-with-input';

export default function AnalyticsPage() {
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
          Analytics Dashboard
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
          Comprehensive insights and data analysis
        </Typography>

        {/* Key Metrics */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 4 }
          }}
        >
          {[
            { title: 'Total Revenue', value: '$125,430', change: '+12.5%', icon: <TrendingUpIcon />, color: 'success' },
            { title: 'Active Users', value: '8,942', change: '+8.2%', icon: <BarChartIcon />, color: 'primary' },
            { title: 'Conversion Rate', value: '3.2%', change: '+0.5%', icon: <PieChartIcon />, color: 'info' },
            { title: 'Avg. Session', value: '4m 32s', change: '+2.1%', icon: <TimelineIcon />, color: 'warning' },
          ].map((metric, index) => (
            <Card key={index} elevation={2} sx={{ minWidth: 0, p: { xs: 2, sm: 3 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: `${metric.color}.main`, mr: 1, fontSize: { xs: '2rem', sm: '2.5rem' } }}>
                    {metric.icon}
                  </Box>
                  <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                    {metric.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  {metric.value}
                </Typography>
                <Chip
                  label={metric.change}
                  color={metric.color as any}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, mb: 1 }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Charts Section */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: { xs: 2, sm: 4 },
            mb: { xs: 2, sm: 4 }
          }}
        >
          {/* Traffic Overview */}
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 0 } }}>
            <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              Traffic Overview
            </Typography>
            <Box sx={{ height: { xs: 120, sm: 200 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', borderRadius: 2, mb: 2 }}>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                📊 Chart Placeholder
              </Typography>
            </Box>
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                gap: 1
              }}
            >
              {[
                { label: 'Direct', value: 45, color: 'primary' },
                { label: 'Organic', value: 30, color: 'success' },
                { label: 'Referral', value: 15, color: 'warning' },
                { label: 'Social', value: 10, color: 'info' },
              ].map((source, index) => (
                <Box key={index}>
                  <Typography variant="body2" gutterBottom sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                    {source.label}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={source.value}
                    color={source.color as any}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {source.value}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* User Demographics */}
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              User Demographics
            </Typography>
            <Box sx={{ height: { xs: 120, sm: 200 }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', borderRadius: 2, mb: 2 }}>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                🥧 Pie Chart Placeholder
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { age: '18-24', percentage: 25, color: '#1976d2' },
                { age: '25-34', percentage: 35, color: '#2e7d32' },
                { age: '35-44', percentage: 20, color: '#ed6c02' },
                { age: '45+', percentage: 20, color: '#9c27b0' },
              ].map((demo, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: demo.color }} />
                  <Typography variant="body2" sx={{ flex: 1, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                    {demo.age}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                    {demo.percentage}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Performance Metrics */}
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 } }}>
          <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            Performance Metrics
          </Typography>
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 2
            }}
          >
            {[
              { metric: 'Page Load Time', value: '2.3s', target: '2.0s', status: 'warning' },
              { metric: 'Server Response', value: '180ms', target: '200ms', status: 'success' },
              { metric: 'Uptime', value: '99.9%', target: '99.5%', status: 'success' },
              { metric: 'Error Rate', value: '0.1%', target: '0.5%', status: 'success' },
            ].map((perf, index) => (
              <Box key={index}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {perf.metric}
                </Typography>
                <Typography variant="h4" color={`${perf.status}.main`} gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '1.7rem' } }}>
                  {perf.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                  Target: {perf.target}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Quick Actions */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: { xs: 2, sm: 4 } }}>
          {[
            'Export Report',
            'Generate Insights',
            'Schedule Report',
            'Share Dashboard',
          ].map((action, index) => (
            <Button
              key={index}
              variant="contained"
              size={isMobile ? 'medium' : 'large'}
              sx={{ minWidth: 120, fontSize: { xs: '0.98rem', sm: '1.05rem' }, py: 1, px: 2 }}
            >
              {action}
            </Button>
          ))}
        </Box>
      </Container>
    </LayoutWithInput>
  );
} 