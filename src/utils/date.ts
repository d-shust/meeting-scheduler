import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const convertToTimezone = (utcDate: string, timezone: string): string => {
    const offsetStr = timezone.replace('UTC', '')
    const offset = offsetStr ? Number(offsetStr) : 0
    return dayjs.utc(utcDate).add(offset, 'hour').format('DD MMM YYYY, HH:mm')
}

export const getDefaultTimezone = (): string => {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZoneName: 'shortOffset',
    })
    const parts = formatter.formatToParts(new Date())
    const tzName = parts.find((p) => p.type === 'timeZoneName')?.value || 'GMT'

    return tzName.replace('GMT', 'UTC')
}