import { Paperclip } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  note?: string;
}

export const FileUpload = ({ file, onChange, placeholder, note }: FileUploadProps) => (
  <div className="flex items-center gap-2">
    <label
      htmlFor="file"
      className="cursor-pointer flex items-center gap-2 text-[#1E88F9] hover:text-[#1E88F9] pt-2"
    >
      <Paperclip className="w-5 h-5" />
      <span>{file ? file.name : placeholder}</span>
      <input
        type="file"
        id="file"
        accept=".pdf"
        onChange={onChange}
        className="hidden"
      />
    </label>
    {note && <span className="text-gray-400 text-sm pt-2">{note}</span>}
  </div>
);
