import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'
import { getDefaultTimezone } from '../utils/date'
import { saveMeeting, getMeeting } from '../services/meeting-storage'
import type { Slot } from '../types/meeting'
import slotsData from '../mocks/exp-slots.json'

const getLocalSlotDate = (utcDateStr: string, tz: string): Dayjs => {
    const offsetStr = tz.replace('UTC', '')
    const offset = offsetStr ? Number(offsetStr) : 0
    return dayjs.utc(utcDateStr).add(offset, 'hour')
}

export const useScheduler = () => {
    const navigate = useNavigate()
    const [existingMeeting] = useState(() => getMeeting())
    const [timezone, setTimezone] = useState<string>(getDefaultTimezone())
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
    const [selectedSlot, setSelectedSlot] = useState<string>('')

    const slots: Slot[] = slotsData

    const availableDatesSet = useMemo(() => {
        const dates = slots.map(slot => getLocalSlotDate(slot.datetime, timezone).format('YYYY-MM-DD'))
        return new Set(dates)
    }, [slots, timezone])

    const filteredSlots = useMemo(() => {
        if (!selectedDate) return []
        return slots.filter((slot) => 
            getLocalSlotDate(slot.datetime, timezone).isSame(selectedDate, 'day')
        )
    }, [slots, selectedDate, timezone])

    const handleShouldDisableDate = (date: Dayjs) => {
        return !availableDatesSet.has(date.format('YYYY-MM-DD'))
    }

    const handleConfirm = () => {
        if (!selectedSlot) return
        saveMeeting({ datetime: selectedSlot, timezone })
        navigate('/meeting')
    }

    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate)
        setSelectedSlot('')
    }

    const handleTimezoneChange = (newTimezone: string) => {
        setTimezone(newTimezone)
        setSelectedSlot('')
    }

    return {
        timezone,
        setTimezone: handleTimezoneChange,
        selectedDate,
        selectedSlot,
        setSelectedSlot,
        filteredSlots,
        existingMeeting,
        handleShouldDisableDate,
        handleConfirm,
        handleDateChange,
        getLocalSlotDate
    }
}