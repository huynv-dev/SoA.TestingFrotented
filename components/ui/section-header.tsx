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
      <div className="flex items-center w-full gap-4">
        <div className="h-[2px] w-full bg-[#BBBBBB]" />
        <h2 className={cn(
          'text-[52px] font-semibold text-primary-500 whitespace-nowrap font-poppins uppercase leading-[60px]',
          titleClassName
        )}>
          {title}
        </h2>
        <div className="h-[2px] w-full bg-[#BBBBBB]" />
      </div>
    </div>
  );
};

export default SectionHeader; 