import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
        <Box sx={{ p: 3 }}>
          <Stack spacing={2} sx={{ p: 3 }} direction="row" alignItems="center">
            <Box
              component="img"
              src="/assets/logo.png"
              alt="SellEase Logo"
              sx={{
                width: 30,
                height: 30,
                objectFit: 'contain',
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #6EC6FF, #2196F3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                letterSpacing: 2,
                textTransform: 'uppercase',
                textShadow: '2px 2px 6px rgba(33, 150, 243, 0.5)',
              }}
            >
              SELLEASE
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
          color: 'var(--mui-palette-common-white)',
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography color="inherit" sx={{ fontSize: '24px', lineHeight: '32px', textAlign: 'center' }} variant="h1">
              Welcome to{' '}
              <Box component="span" sx={{ color: '#15b79e' }}>
                Devias Kit
              </Box>
            </Typography>
            <Typography align="center" variant="subtitle1">
              A professional template that comes with ready-to-use MUI components.
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              alt="Widgets"
              src="/assets/auth-widgets.png"
              sx={{ height: 'auto', width: '100%', maxWidth: '600px' }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
