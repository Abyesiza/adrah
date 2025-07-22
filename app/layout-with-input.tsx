'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PersistentInput from '@/components/PersistentInput';

interface LayoutWithInputProps {
  children: React.ReactNode;
}

const LayoutWithInput: React.FC<LayoutWithInputProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

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
          pb: { xs: 'calc(60px + env(safe-area-inset-bottom))', sm: 8 }, // Reduced bottom padding for input
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
      {isClient && (
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
            p: { xs: 0.25, sm: 1 }, // Reduced padding
            backdropFilter: 'blur(10px)',
            width: '100vw',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ maxWidth: { xs: '100vw', sm: 600 }, mx: 'auto' }}>
            <PersistentInput />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LayoutWithInput; 