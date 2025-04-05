import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  title: string;
  className?: string;
  titleClassName?: string;
}

export const SectionHeader = ({
  title,
  className,
  titleClassName,
}: SectionHeaderProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-4">
        <div className="h-[1px] md:h-[2px] w-full bg-[#BBBBBB]" />
        <h2 className={cn(
          'text-[24px] md:text-[52px] font-semibold text-primary-500 text-center whitespace-normal break-words',
          'font-poppins leading-[1.2] md:leading-[1.2] px-4 max-w-full md:max-w-[80%]',
          titleClassName
        )}>
          {title}
        </h2>
        <div className="h-[1px] md:h-[2px] w-full bg-[#BBBBBB]" />
      </div>
    </div>
  );
};

export default SectionHeader; 