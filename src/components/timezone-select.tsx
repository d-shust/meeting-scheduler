import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material'

interface Props {
  value: string
  onChange: (value: string) => void
}

const BASE_TIMEZONES = ['UTC', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC+4']

export const TimezoneSelect = ({ value, onChange }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  }

  const isValueInList = BASE_TIMEZONES.includes(value)

  return (
    <FormControl fullWidth sx={{ mb: 4, mt: 2 }}>
      <InputLabel id="timezone-select-label">Select Timezone</InputLabel>
      <Select
        labelId="timezone-select-label"
        id="timezone-select"
        value={value}
        label="Select Timezone"
        onChange={handleChange}
        sx={{ borderRadius: 2 }}
      >
        {BASE_TIMEZONES.map((tz) => (
          <MenuItem key={tz} value={tz}>
            {tz}
          </MenuItem>
        ))}
        
        {!isValueInList && value && (
          <MenuItem value={value}>
            {value} (Detected)
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}