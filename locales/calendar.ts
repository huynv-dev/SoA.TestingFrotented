export const calendarTranslations = {
    en: {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        available: 'Available',
        occupied: 'Occupied',
        selectedDate: 'Selected date',
        previousMonth: 'Previous Month',
        nextMonth: 'Next Month'
    },
    fr: {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        daysOfWeek: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        available: 'Libre',
        occupied: 'Occupé',
        selectedDate: 'Date sélectionnée',
        previousMonth: 'Mois précédent',
        nextMonth: 'Mois suivant'
    },
    vi: {
        months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        daysOfWeek: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        available: 'Trống',
        occupied: 'Đã đặt',
        selectedDate: 'Ngày đã chọn',
        previousMonth: 'Tháng trước',
        nextMonth: 'Tháng sau'
    }
} as const;

export type Language = keyof typeof calendarTranslations;
export type TranslationKeys = keyof typeof calendarTranslations.en; 