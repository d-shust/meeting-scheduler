import { Button } from '@mui/material'
import { convertToTimezone } from '../../utils/date' 
import type { Slot } from '../../types/meeting'

interface SlotButtonProps {
    slot: Slot;
    timezone: string;
    isSelected: boolean;
    onSelect: (datetime: string) => void;
}

export const SlotButton = ({ slot, timezone, isSelected, onSelect }: SlotButtonProps) => (
    <Button
        variant={isSelected ? "contained" : "outlined"}
        color={isSelected ? "primary" : "inherit"}
        onClick={() => onSelect(slot.datetime)}
        sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '0.95rem',
            fontWeight: isSelected ? 600 : 400,
            borderColor: isSelected ? 'primary.main' : 'divider',
            backgroundColor: isSelected ? 'primary.main' : 'background.paper',
            '&:hover': {
                backgroundColor: isSelected ? 'primary.dark' : 'action.hover',
                borderColor: isSelected ? 'primary.dark' : 'text.primary',
            }
        }}
    >
        {convertToTimezone(slot.datetime, timezone)}
    </Button>
)