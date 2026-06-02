import type { Meeting } from '../types/meeting'

const STORAGE_KEY = 'meeting'

export const saveMeeting = (meeting: Meeting) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(meeting),
  )
}

export const getMeeting = (): Meeting | null => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }
  return JSON.parse(raw)
}

export const removeMeeting = () => {
  localStorage.removeItem(STORAGE_KEY)
}