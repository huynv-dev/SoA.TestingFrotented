'use client';
import { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { SectionHeader } from '../ui/section-header';
import { Container } from '../ui/container';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import RichTextEditor from '../ui/tiptap-editor';

// Add busy dates
const BUSY_DATES = [
  new Date(2025, 0, 28),
  new Date(2025, 0, 29),
  new Date(2025, 1, 4),
];

interface OurActivitiesProps {
  title: string;
  btn_1: string[];
  btn_2: string[];
  btn_3: string;
  btn_4: string[];
  btn_5: string;
  btn_6: string;
}

export default function OurActivities({
  title,
  btn_1,
  btn_2,
  btn_3,
  btn_4,
  btn_5,
  btn_6,
}: OurActivitiesProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ ...formData, selectedDate });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      file: null,
    });
    setSelectedDate(null);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <SectionHeader title={title} className="mb-8 md:mb-12" />
        
        <div className="mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Calendar */}
            <div className="mb-8">
              <Calendar
                onDateSelect={setSelectedDate}
                busyDates={BUSY_DATES}
              />
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div className="flex items-start gap-4 w-full">
                <label htmlFor="name" className="text-lg font-medium text-[#562C2C] min-w-[120px] pt-2">
                  {btn_1[0]}
                </label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={btn_1[1]}
                  className="flex-1"
                />
              </div>

              {/* Email Input */}
              <div className="flex items-start gap-4 w-full">
                <label htmlFor="email" className="text-lg font-medium text-[#562C2C] min-w-[120px] pt-2">
                  {btn_2[0]}
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={btn_2[1]}
                  className="flex-1 w-full"
                />
              </div>

              {/* Message Input */}
              <div className="flex items-start gap-4">
                <label htmlFor="message" className="text-lg font-medium text-[#562C2C] min-w-[120px] pt-2">
                  {btn_3}
                </label>
                <div className="flex-1">
                  <RichTextEditor
                    content={formData.message}
                    onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
                    placeholder="Write your message here..."
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="flex items-center gap-4">
                <label className="text-lg font-medium text-[#562C2C] min-w-[120px]">
                  {btn_4[0]}
                </label>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="file"
                    className="cursor-pointer flex items-center gap-2 text-[#1E88F9] hover:text-[#1E88F9]"
                  >
                    <Paperclip className="w-5 h-5" />
                    <span>{formData.file ? formData.file.name : btn_4[1]}</span>
                    <input
                      type="file"
                      id="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-gray-400 text-sm">{btn_4[2]}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 md:ml-[124px]">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className='w-full md:w-auto'
              >
                {btn_5}
              </Button>
              <Button
                type="submit"
                variant="primary"
                className='w-full md:w-auto'
              >
                {btn_6}
                <Image 
                  src="/static/images/send.svg" 
                  alt="send" 
                  width={24} 
                  height={24} 
                  className="ml-2" 
                />
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
