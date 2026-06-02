import { Link as RouterLink } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material'

export const ExistingMeetingState = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Meeting Scheduler
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        You already have a scheduled meeting.
      </Typography>
      <Button 
        component={RouterLink} 
        to="/meeting" 
        variant="contained" 
        size="large"
        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
      >
        View Scheduled Meeting
      </Button>
    </Container>
  )
}