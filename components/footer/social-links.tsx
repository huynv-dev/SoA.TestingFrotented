import Link from 'next/link';
import Image from 'next/image';

interface SocialLink {
    icon: string;
    href: string;
    label: string;
}

const socialLinks: SocialLink[] = [
    { icon: '/static/images/facebook.svg', href: '#', label: 'Facebook' },
    { icon: '/static/images/instagram.svg', href: '#', label: 'Instagram' },
    { icon: '/static/images/youtube.svg', href: '#', label: 'YouTube' },
];

export default function SocialLinks() {
    return (
        <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
                <Link
                    key={social.label}
                    href={social.href}
                    className="bg-primary-500 rounded-full p-1 hover:opacity-80 transition-opacity"
                    aria-label={social.label}
                >
                    <Image
                        src={social.icon}
                        alt={social.label}
                        width={24}
                        height={24}
                    />
                </Link>
            ))}
        </div>
    );
} 