import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Container, Typography, Box, Button, Paper, Divider } from '@mui/material'
import EventAvailableIcon from '@mui/icons-material/EventAvailable' 
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PublicIcon from '@mui/icons-material/Public'
import { getMeeting, removeMeeting } from '../../services/meeting-storage'
import { convertToTimezone } from '../../utils/date'

export const MeetingPage = () => {
  const navigate = useNavigate()
  const meeting = getMeeting()

  if (!meeting) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          No meeting scheduled
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          It looks like you haven't booked any time slots yet.
        </Typography>
        <Button 
          component={RouterLink} 
          to="/" 
          variant="contained"
          sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
        >
          Go to Scheduler
        </Button>
      </Container>
    )
  }

  const handleCancel = () => {
    removeMeeting()
    navigate('/')
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <EventAvailableIcon color="success" sx={{ fontSize: 36 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Scheduled Meeting
        </Typography>
      </Box>
      
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          borderRadius: 3, 
          backgroundColor: 'background.paper',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <CalendarTodayIcon color="action" />
          <Typography variant="h5" component="p" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {convertToTimezone(meeting.datetime, meeting.timezone)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PublicIcon color="action" />
          <Typography variant="body1" color="text.secondary">
            Timezone: <strong>{meeting.timezone}</strong>
          </Typography>
        </Box>
      </Paper>

      <Button 
        variant="contained" 
        color="error" 
        size="large"
        onClick={handleCancel}
        sx={{ 
          mt: 4, 
          width: { xs: '100%', sm: 'auto' },
          borderRadius: 2, 
          px: 4,
          py: 1.2,
          textTransform: 'none', 
          fontWeight: 600 
        }}
      >
        Cancel Meeting
      </Button>
    </Container>
  )
}