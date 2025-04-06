'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Language } from '~/types/i18n';
import { getDictionary } from '~/lib/getTranslation';

interface CalendarDay {
  day: number;
  month: 'previous' | 'current' | 'next';
  status: 'available' | 'occupied' | '';
  date?: Date;
}

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  busyDates?: Date[];
  language?: Language;
}

const isSameDate = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
};

export function Calendar({ onDateSelect, busyDates = [], language = 'fr' }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const dict = getDictionary(language);
  const months = dict.calendar.months;
  const daysOfWeek = dict.calendar.daysOfWeek;
  const t = (path: string) => path.split('.').reduce((o, k) => o?.[k], dict);
  const currentMonthDisplay = months[currentDate.getMonth()];
  const currentYearDisplay = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const firstDayMonday = firstDay === 0 ? 6 : firstDay - 1;
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = firstDayMonday - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, month: 'previous', status: '' });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const isBusy = busyDates.some(busyDate => isSameDate(busyDate, currentDate));

      days.push({
        day: i,
        month: 'current',
        status: isBusy ? 'occupied' : 'available',
        date: currentDate
      });
    }

    // Next month days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, month: 'next', status: '' });
    }

    setCalendarDays(days);
  };

  const handleDateClick = (day: CalendarDay) => {
    if (day.month === 'current' && day.status === 'available' && day.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (day.date >= today) {
        setSelectedDate(day.date);
        onDateSelect?.(day.date);
      }
    }
  };

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate, busyDates, language]);

  const getLocale = () => {
    switch (language) {
      case 'fr':
        return 'fr-FR';
      default:
        return 'en-US';
    }
  };

  const formatSelectedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString(getLocale(), options);
  };

  return (
    <div className="bg-white rounded-[24px] py-6 px-8 shadow-[0px_0px_30px_rgba(242,84,45,0.10)] outline outline-1 outline-secondary-500/30 -outline-offset-[1px]">
      <div className="flex justify-center items-center mb-8">
        <button onClick={prevMonth} className="p-1" aria-label={t('calendar.previousMonth')}>
          <Image
            src="/static/images/arrow-left.svg"
            alt={t('calendar.previousMonth')}
            width={24}
            height={24}
            className="text-primary-500"
          />
        </button>
        <h2 className="text-center text-[20px] text-secondary-500 font-medium font-poppins leading-[24px]">
          {currentMonthDisplay} {currentYearDisplay}
        </h2>
        <button onClick={nextMonth} className="p-1" aria-label={t('calendar.nextMonth')}>
          <Image
            src="/static/images/arrow-right.svg"
            alt={t('calendar.nextMonth')}
            width={24}
            height={24}
            className="text-primary-500"
          />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2 text-center text-[18px] text-secondary-500 font-semibold font-poppins leading-[24px]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={`md:min-h-[74px] px-4 py-2 rounded-[8px] border cursor-pointer transition-colors
              ${day.month !== 'current' ? 'bg-[#F5F5F5] border-[#DFDFDF] text-[#CCCCCC]' : 'bg-white'}
              ${day.status === 'available' && day.month === 'current' ? 'border-primary-500 bg-primary-300 text-primary-500' : 'border-gray-200'}
              ${day.status === 'occupied' && day.month === 'current' ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : ''}
              ${selectedDate && day.date && selectedDate.getTime() === day.date.getTime() ? 'bg-primary-50 border-primary-500' : ''}`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`text-center text-[20px] font-semibold font-poppins leading-[24px] ${day.month === 'current' && (day.status === 'occupied' || !day.status) ? 'text-[#999999]' :
                  selectedDate && day.date && selectedDate.getTime() === day.date.getTime() ? 'text-primary-500' :
                    day.month !== 'current' ? 'text-[#CCCCCC]' : 'text-secondary-500'
                }`}>{day.day}</div>
              {day.month === 'current' && (
                <div className={`text-[18px] font-normal font-poppins leading-[24px] hidden md:block ${day.status === 'available'
                    ? (selectedDate && day.date && selectedDate.getTime() === day.date.getTime() ? 'text-primary-500' : 'text-[#F2542D]')
                    : 'text-[#AAAAAA]'
                  }`}>
                  {day.status === 'available' ? t('calendar.status.available') : day.status === 'occupied' ? t('calendar.status.occupied') : ''}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-4 p-3 bg-[#FFF3F0] border border-primary-500 rounded-[8px]">
          <p className="text-primary-500">
            {t('calendar.selectedDate')}: {formatSelectedDate(selectedDate)}
          </p>
        </div>
      )}
    </div>
  );
} 