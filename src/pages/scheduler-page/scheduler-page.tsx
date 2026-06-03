import { Container, Typography, Box, Button, Paper } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

import { TimezoneSelect } from '../../components/timezone-select'
import { ExistingMeetingState } from '../../components/existing-meeting-state'
import { SlotGrid } from './slot-grid'
import { useScheduler } from '../../hooks/use-scheduler'

export const SchedulerPage = () => {
    const {
        timezone,
        setTimezone,
        selectedDate,
        selectedSlot,
        setSelectedSlot,
        filteredSlots,
        existingMeeting,
        handleShouldDisableDate,
        handleConfirm,
        handleDateChange,
        getLocalSlotDate
    } = useScheduler()

    if (existingMeeting) {
        return <ExistingMeetingState />
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Meeting Scheduler
            </Typography>
            <TimezoneSelect value={timezone} onChange={setTimezone} />
            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 4, 
                alignItems: 'flex-start',
                mb: 4 
            }}>
                <Paper variant="outlined" sx={{ borderRadius: 3, p: 1, boxSizing: 'border-box', width: { xs: '100%', md: 'auto' } }}>
                    <DateCalendar 
                        value={selectedDate} 
                        onChange={handleDateChange}
                        shouldDisableDate={handleShouldDisableDate}
                        disablePast 
                    />
                </Paper>
                <Box sx={{ flex: 1, width: '100%' }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                        Available Slots for {selectedDate ? selectedDate.format('MMMM DD') : ''}
                    </Typography>

                    <SlotGrid 
                        slots={filteredSlots}
                        selectedSlot={selectedSlot}
                        timezone={timezone}
                        onSelectSlot={setSelectedSlot}
                        getLocalSlotDate={getLocalSlotDate}
                    />
                </Box>
            </Box>
            <Button
                variant="contained"
                color="success"
                size="large"
                disabled={!selectedSlot}
                onClick={handleConfirm}
                sx={{ borderRadius: 2, px: 6, py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
                Confirm
            </Button>
        </Container>
    )
}