import { Box, Button, Typography } from '@mui/material'
import type { Slot } from '../../types/meeting'
import { Dayjs } from 'dayjs'

interface SlotGridProps {
    slots: Slot[]
    selectedSlot: string
    timezone: string
    onSelectSlot: (datetime: string) => void
    getLocalSlotDate: (utcDateStr: string, tz: string) => Dayjs
}

export const SlotGrid = ({ slots, selectedSlot, timezone, onSelectSlot, getLocalSlotDate }: SlotGridProps) => {
    if (slots.length === 0) {
        return (
            <Typography color="text.secondary" sx={{ fontStyle: 'italic', mt: 2 }}>
                No available slots for this date.
            </Typography>
        )
    }

    return (
        <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
            {slots.map((slot) => {
                const isSelected = selectedSlot === slot.datetime
                const localTime = getLocalSlotDate(slot.datetime, timezone).format('HH:mm')
                
                return (
                    <Button
                        key={slot.datetime}
                        variant={isSelected ? "contained" : "outlined"}
                        color={isSelected ? "primary" : "inherit"}
                        onClick={() => onSelectSlot(slot.datetime)}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: isSelected ? 600 : 400,
                            borderColor: isSelected ? 'primary.main' : 'divider',
                            backgroundColor: isSelected ? 'primary.main' : 'background.paper',
                            '&:hover': {
                                backgroundColor: isSelected ? 'primary.dark' : 'action.hover',
                                borderColor: isSelected ? 'primary.dark' : 'text.primary',
                            }
                        }}
                    >
                        {localTime}
                    </Button>
                )
            })}
        </Box>
    )
}