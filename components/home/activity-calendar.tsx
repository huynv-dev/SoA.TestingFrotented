'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Paperclip, Send } from 'lucide-react';
import RichTextEditor from './richtext-editor';

interface CalendarDay {
  day: number;
  month: 'previous' | 'current' | 'next';
  status: 'available' | 'occupied' | '';
  date?: Date;
}

// Add busy dates
const BUSY_DATES = [
  new Date(2025, 0, 28),
  new Date(2025, 0, 29),
  new Date(2025, 2, 4), 
];

const isSameDate = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// English month names mapping
const MONTH_NAMES = [
  'July',       // January -> July
  'August',     // February -> August
  'September',  // March -> September
  'October',    // April -> October
  'November',   // May -> November
  'December',   // June -> December
  'January',    // July -> January
  'February',   // August -> February
  'March',      // September -> March
  'April',      // October -> April
  'May',        // November -> May
  'June'        // December -> June
];

export default function ActivityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // Start from January 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [messageContent, setMessageContent] = useState(
    '<h6>Heading 6</h6><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to</p>'
  );

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  // Use custom month display
  const currentMonthDisplay = MONTH_NAMES[currentDate.getMonth()];
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
      const isBusy = BUSY_DATES.some(busyDate => isSameDate(busyDate, currentDate));
      
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
      if (day.date >= today) setSelectedDate(day.date);
    }
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="w-full lg:max-w-4xl mx-auto p-4 font-sans overflow-y-auto">
      <h1 className="text-3xl text-center font-medium text-[#FF5733] mb-10">OUR ACTIVITIES</h1>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-center items-center mb-6">
          <button onClick={prevMonth} className="p-1 text-[#FF5733]" aria-label="Previous Month">
            <ChevronLeft />
          </button>
          <h2 className="mx-4 text-center">{currentMonthDisplay} {currentYearDisplay}</h2>
          <button onClick={nextMonth} className="p-1 text-[#FF5733]" aria-label="Next Month">
            <ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2 text-sm sm:text-base">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-2 text-center font-medium">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 text-sm">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`p-2 rounded-md border cursor-pointer transition-colors
                ${day.month !== 'current' ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                ${day.status === 'available' && day.month === 'current' ? 'border-[#FF5733] text-[#FF5733] hover:bg-[#FFF3F0]' : 'border-gray-200'}
                ${day.status === 'occupied' && day.month === 'current' ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : ''}
                ${selectedDate && day.date && selectedDate.getTime() === day.date.getTime() ? 'bg-[#FF5733] text-white border-[#FF5733]' : ''}`}
            >
              <div className="flex flex-col items-center">
                <div className="text-center">{day.day}</div>
                {day.month === 'current' && (
                  <div className={`text-xs hidden md:block ${
                    day.status === 'available' 
                      ? (selectedDate && day.date && selectedDate.getTime() === day.date.getTime() ? 'text-white' : 'text-[#FF5733]')
                      : 'text-gray-400'
                  }`}>
                    {day.status === 'available' ? 'Available' : day.status === 'occupied' ? 'Occupied' : ''}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedDate && (
          <div className="mt-4 p-3 bg-[#FFF3F0] border border-[#FF5733] rounded-md">
            <p className="text-[#FF5733]">
              Selected date: {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF5733]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 mb-2">Message:</label>
          <RichTextEditor
            initialValue={messageContent}
            onChange={setMessageContent}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="file-upload" className="block text-gray-700 mb-2">File:</label>
          <input type="file" id="file-upload" accept=".pdf" className="hidden" />
          <label htmlFor="file-upload" className="flex items-center text-blue-500 cursor-pointer">
            <Paperclip size={18} className="mr-2" />
            <span>Attachment</span>
          </label>
          <span className="ml-2 text-gray-400 text-sm">(PDF files only)</span>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50">Clear All</button>
          <button className="px-6 py-2 bg-[#FF5733] text-white rounded-full hover:bg-[#E64A19] flex items-center">
            <span>Send</span>
            <Send size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
