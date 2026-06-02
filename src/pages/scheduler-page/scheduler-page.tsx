import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Box, Button } from '@mui/material'
import { TimezoneSelect } from '../../components/timezone-select'
import { getDefaultTimezone } from '../../utils/date'
import { saveMeeting, getMeeting } from '../../services/meeting-storage'
import type { Slot } from '../../types/meeting'

import slotsData from '../../mocks/exp-slots.json'
import { ExistingMeetingState } from '../../components/existing-meeting-state'
import { SlotButton } from './slot-button'

export const SchedulerPage = () => {
    const [timezone, setTimezone] = useState<string>(getDefaultTimezone())
    const [selectedSlot, setSelectedSlot] = useState<string>('')
    const navigate = useNavigate()
    const existingMeeting = getMeeting()

    const slots: Slot[] = slotsData

    const handleConfirm = () => {
        if (!selectedSlot) return
        saveMeeting({ datetime: selectedSlot, timezone })
        navigate('/meeting')
    }

    if (existingMeeting) {
        return <ExistingMeetingState />
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Meeting Scheduler
            </Typography>
            <TimezoneSelect value={timezone} onChange={setTimezone} />
            <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                Available Slots
            </Typography>
            <Box sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                mb: 4
            }}>
                {slots.map((slot) => (
                    <SlotButton
                        key={slot.datetime}
                        slot={slot}
                        timezone={timezone}
                        isSelected={selectedSlot === slot.datetime}
                        onSelect={setSelectedSlot}
                    />
                ))}
            </Box>
            <Button
                variant="contained"
                color="success"
                size="large"
                disabled={!selectedSlot}
                onClick={handleConfirm}
                sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
                Confirm
            </Button>
        </Container>
    )
}