'use client';

import React from 'react';
import { Box } from '@mui/material';
import PersistentInput from '@/components/PersistentInput';

interface LayoutWithInputProps {
  children: React.ReactNode;
}

const LayoutWithInput: React.FC<LayoutWithInputProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'background.default',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          pb: { xs: 'calc(80px + env(safe-area-inset-bottom))', sm: 12 }, // Responsive bottom padding for input
          pt: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 3 },
          maxWidth: { xs: '100vw', sm: 900, md: 1200 },
          mx: 'auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </Box>

      {/* Persistent Input - Fixed at bottom */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'background.default',
          borderTop: '1px solid',
          borderColor: 'divider',
          p: { xs: 0.5, sm: 2 },
          backdropFilter: 'blur(10px)',
          width: '100vw',
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ maxWidth: { xs: '100vw', sm: 600 }, mx: 'auto' }}>
          <PersistentInput />
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutWithInput; 