import Image from 'next/image';

interface ActivityFilterListProps {
  cases: string[];
  activeFilter: string | null;
  setActiveFilter: (value: string | null) => void;
  icons: string[];
}

export default function ActivityFilterList({ cases, activeFilter, setActiveFilter, icons }: ActivityFilterListProps) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6">
      {cases.map((activity, index) => (
        <button
          key={activity}
          className={`border rounded-[40px] px-4 sm:px-6 py-1.5 sm:py-2 transition flex items-center justify-center sm:justify-start gap-2 sm:gap-3 ${
            activeFilter === activity ? 'bg-orange-600 border-orange-600' : 'border-orange-300'
          } ${index === cases.length - 1 ? 'col-span-2 sm:col-auto max-w-[200px] mx-auto sm:max-w-none sm:mx-0' : ''}`}
          onClick={() => setActiveFilter(activeFilter === activity ? null : activity)}
        >
          <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0">
            <Image
              src={icons[index % icons.length]}
              alt={activity}
              height={20}
              width={20}
              className={`object-contain transition-colors ${activeFilter === activity ? 'brightness-0 invert' : ''}`}
            />
          </div>
          <span className={`text-[16px] sm:text-[20px] font-medium capitalize line-clamp-1 ${activeFilter === activity ? 'text-white' : 'text-[#562C2C]'}`}>
            {activity}
          </span>
        </button>
      ))}
    </div>
  );
}