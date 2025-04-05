import Link from 'next/link';

export default function CompanyInfo() {
    return (
        <div className="font-poppins text-[18px] leading-[24px] font-normal flex flex-col items-center md:items-start" style={{ wordWrap: 'break-word' }}>
            <Link href="/" className="inline-block text-2xl font-bold mb-4">
                Basic
            </Link>
            <p className="mb-2">(514) 904-6789</p>
            <p>Quebec, 3100 Boulevard<br />de la Côte-Vertu</p>
        </div>
    );
} 