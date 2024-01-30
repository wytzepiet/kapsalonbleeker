import { getDayOfWeek, type DateValue } from "@internationalized/date";

export type timeString = `${number}:${number}`;
type ClosedDay = { day: string; opened: false };
type OpenDay = { day: string; opened: boolean; openingTime: timeString; closingTime: timeString };
export type Day = OpenDay | ClosedDay;
export type OpeningHours = [Day, Day, Day, Day, Day, Day, Day];


export const openingHours: Day[] = [
    { day: 'Maandag', opened: false },
    { day: 'Dinsdag', opened: true, openingTime: '07:30', closingTime: '18:00' },
    { day: 'Woensdag', opened: true, openingTime: '07:30', closingTime: '18:00' },
    { day: 'Donderdag', opened: true, openingTime: '07:30', closingTime: '18:00' },
    { day: 'Vrijdag', opened: true, openingTime: '07:30', closingTime: '21:00' },
    { day: 'Zaterdag', opened: true, openingTime: '07:30', closingTime: '16:00' },
    { day: 'Zondag', opened: false }
]

export const timeSlots: timeString[] = [
    '07:30',
    '08:00',
    '08:20',
    '08:40',
    '09:10',
    '09:40',
    '10:00',
    '10:20',
    '10:40',
    '11:00',
    '11:30',
    '13:00',
    '13:20',
    '13:40',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:20',
    '16:40',
    '17:00',
    '17:30',
    '19:00',
    '19:20',
    '19:40',
    '20:00',
    '20:20'
];

export function dateFromTimeString(time: timeString | undefined) {
    if (!time) return new Date();
    const timeSplit = time.split(':');
    const timeDate = new Date();
    timeDate.setHours(Number(timeSplit[0]), Number(timeSplit[1]), 0, 0);
    return timeDate;
}

export function getAvailableTimes(dateValue: DateValue): timeString[] {
    const day = openingHours[getDayOfWeek(dateValue, 'nl')];
    if (!day.opened) return [];

    const times: timeString[] = [];
    const openingDate = dateFromTimeString(day.openingTime);
    const closingDate = dateFromTimeString(day.closingTime);
    timeSlots.forEach((time) => {
        const timeDate = dateFromTimeString(time);
        if (timeDate >= openingDate && timeDate < closingDate) times.push(time);
    });
    return times;
}



