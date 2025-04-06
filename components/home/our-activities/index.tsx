'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/ui/section-header';
import { Calendar } from '@/components/ui/calendar';
import RichTextEditor from '@/components/ui/tiptap-editor';
import { FormGroup } from './form-group';
import { FileUpload } from './file-upload';

const BUSY_DATES = [
  new Date(2025, 0, 28),
  new Date(2025, 0, 29),
  new Date(2025, 1, 4),
];

interface OurActivitiesProps {
  title: string;
  btn_1: string[]; // [label, placeholder]
  btn_2: string[]; // [label, placeholder]
  btn_3: string;
  btn_4: string[]; // [label, placeholder, note]
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
    console.log({ ...formData, selectedDate });
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '', file: null });
    setSelectedDate(null);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <SectionHeader title={title} className="mb-8 md:mb-12" />

        <form onSubmit={handleSubmit} className="space-y-8 mx-auto">
          <Calendar onDateSelect={setSelectedDate} busyDates={BUSY_DATES} />

          <div className="space-y-6">
            <FormGroup label={btn_1[0]}>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder={btn_1[1]}
              />
            </FormGroup>

            <FormGroup label={btn_2[0]}>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder={btn_2[1]}
              />
            </FormGroup>

            <FormGroup label={btn_3}>
              <RichTextEditor
                content={formData.message}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, message: value }))
                }
                placeholder="Write your message here..."
              />
            </FormGroup>

            <FormGroup label={btn_4[0]}>
              <FileUpload
                file={formData.file}
                onChange={handleFileChange}
                placeholder={btn_4[1]}
                note={btn_4[2]}
              />
            </FormGroup>
          </div>

          <div className="flex justify-end gap-4 pt-4 md:ml-[124px]">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="w-full md:w-auto"
            >
              {btn_5}
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto"
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
      </Container>
    </section>
  );
}
