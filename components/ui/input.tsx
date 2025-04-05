import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="flex items-center gap-4 w-full">
        {label && (
          <label className="text-[#562C2C] text-2xl font-normal font-poppins capitalize break-words min-w-[120px]">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex md:h-51 w-full rounded-[123px] border border-[#562c2c4d] bg-white px-4 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#AAAAAA] placeholder:text-[18px] placeholder:font-poppins placeholder:font-normal focus-visible:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-secondary-500/30 focus-visible:-outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0px_0px_30px_rgba(242,84,45,0.10)]",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input } 