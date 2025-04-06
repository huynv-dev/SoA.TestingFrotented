export type Language = 'en' | 'fr';

export interface CalendarTranslations {
    months: string[];
    daysOfWeek: string[];
    available: string;
    occupied: string;
    selectedDate: string;
    previousMonth: string;
    nextMonth: string;
}

export interface Translations {
    calendar: CalendarTranslations;
} 