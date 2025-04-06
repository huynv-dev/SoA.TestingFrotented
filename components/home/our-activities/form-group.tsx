import type { ReactNode } from 'react';

interface FormGroupProps {
  label: string;
  children: ReactNode;
}

export const FormGroup = ({ label, children }: FormGroupProps) => (
  <div className="flex items-start gap-4 w-full">
    <label className="text-lg font-medium text-[#562C2C] min-w-[120px] pt-2">
      {label}
    </label>
    <div className="flex-1 m-auto">{children}</div>
  </div>
);
