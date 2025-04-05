import Link from 'next/link';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterLinksProps {
    links: FooterLink[];
}

export default function FooterLinks({ links }: FooterLinksProps) {
    return (
        <div className="flex flex-col items-center md:items-start">
            {links.map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    className="block text-[18px] font-poppins font-normal text-white/60 hover:text-[#F2542D] transition-colors mb-3"
                    style={{ wordWrap: 'break-word' }}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
} 