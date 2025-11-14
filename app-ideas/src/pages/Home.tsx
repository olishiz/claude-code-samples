import { useNavigate } from 'react-router-dom'
import { Box, Container, Typography, Card, CardContent, CardActionArea, Avatar, Chip } from '@mui/material'
import BinaryIcon from '@mui/icons-material/Transform'
import CalculatorIcon from '@mui/icons-material/Calculate'
import NotesIcon from '@mui/icons-material/StickyNote2'
import CarIcon from '@mui/icons-material/DirectionsCar'

interface AppCard {
  title: string
  description: string
  path: string
  icon: React.ReactElement
  color: string
  category: string
}

const apps: AppCard[] = [
  {
    title: 'Bin2Dec',
    description: 'Convert binary numbers to decimal format with ease. Perfect for learning number systems.',
    path: '/bin2dec',
    icon: <BinaryIcon sx={{ fontSize: 48 }} />,
    color: '#f97316',
    category: 'Converter',
  },
  {
    title: 'Calculator',
    description: 'A full-featured calculator for all your arithmetic needs. Simple and efficient.',
    path: '/calculator',
    icon: <CalculatorIcon sx={{ fontSize: 48 }} />,
    color: '#3b82f6',
    category: 'Tools',
  },
  {
    title: 'Notes',
    description: 'Create, edit, and manage your notes. All data stored locally in your browser.',
    path: '/notes',
    icon: <NotesIcon sx={{ fontSize: 48 }} />,
    color: '#10b981',
    category: 'Productivity',
  },
  {
    title: 'Car Sales',
    description: 'Explore Malaysian car market trends with interactive charts and detailed analytics.',
    path: '/car-sales',
    icon: <CarIcon sx={{ fontSize: 48 }} />,
    color: '#8b5cf6',
    category: 'Analytics',
  },
]

export function Home() {
  const navigate = useNavigate()

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '80vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            App Ideas Collection
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto', mb: 1 }}
          >
            A collection of useful web applications built with React and Material Design
          </Typography>
          <Chip
            label={`${apps.length} Apps Available`}
            color="primary"
            sx={{ mt: 2 }}
          />
        </Box>

        {/* Apps Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {apps.map((app) => (
            <Box key={app.path}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(app.path)}
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: app.color,
                          width: 64,
                          height: 64,
                        }}
                      >
                        {app.icon}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                          {app.title}
                        </Typography>
                        <Chip
                          label={app.category}
                          size="small"
                          sx={{
                            bgcolor: `${app.color}20`,
                            color: app.color,
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {app.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Footer Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Built with React, TypeScript, Material Design 3, and Tailwind CSS
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
