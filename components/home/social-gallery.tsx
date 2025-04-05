import { Container } from '../ui/container';
import Image from 'next/image';
import Link from 'next/link';

interface SocialPost {
    image: string;
    title: string;
    description: string;
    date: string;
    author: string;
    authorLink: string;
}

const socialPosts: SocialPost[] = [
    {
        image: '/static/images/gallery-main.jpg',
        title: 'La famille',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqui',
        date: '24 Sep 2024',
        author: 'Anthony Durand',
        authorLink: '#'
    }
];

const instagramPosts = [
    {
        image: '/static/images/avocado.jpg',
        author: 'Anthony Durand',
        authorLink: '#'
    },
    {
        image: '/static/images/cherry.jpg',
        author: 'Anthony Durand',
        authorLink: '#'
    },
    {
        image: '/static/images/orange.jpg',
        author: 'Anthony Durand',
        authorLink: '#'
    },
    {
        image: '/static/images/orange-slice.jpg',
        author: 'Anthony Durand',
        authorLink: '#'
    }
];

export default function SocialGallery() {
    return (
        <section className="py-16 md:py-24 bg-[#E6F4F4]">
            <Container>
                <div className="mb-8">
                    <h2 className="text-[#562C2C] text-[32px] md:text-[48px] font-semibold font-poppins leading-[1.2] mb-4">
                        IMMORTALISEZ DES MOMENTS<br />
                        INOUBLIABLES AVEC <span className="text-[#F2542D]">#BASIC</span>
                    </h2>
                    <p className="text-[#562C2C] text-base max-w-[600px]">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* Main featured post */}
                    {socialPosts.map((post, index) => (
                        <div key={index} className="relative rounded-[24px] overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                width={1200}
                                height={600}
                                className="w-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent text-white">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-semibold">{post.title}</h3>
                                    <span>{post.date}</span>
                                </div>
                                <p className="mb-4">{post.description}</p>
                                <Link 
                                    href={post.authorLink}
                                    className="flex items-center gap-2 text-white hover:text-[#F2542D] transition-colors"
                                >
                                    <Image
                                        src="/static/images/instagram.svg"
                                        alt="Instagram"
                                        width={20}
                                        height={20}
                                    />
                                    {post.author}
                                    <Image
                                        src="/static/images/arrow-up-right.svg"
                                        alt="External link"
                                        width={16}
                                        height={16}
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Instagram posts grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {instagramPosts.map((post, index) => (
                            <Link 
                                key={index}
                                href={post.authorLink}
                                className="relative aspect-square rounded-[24px] overflow-hidden group"
                            >
                                <Image
                                    src={post.image}
                                    alt={post.author}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex items-center gap-2 text-white">
                                        <Image
                                            src="/static/images/instagram.svg"
                                            alt="Instagram"
                                            width={20}
                                            height={20}
                                        />
                                        {post.author}
                                        <Image
                                            src="/static/images/arrow-up-right.svg"
                                            alt="External link"
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <p className="text-center text-[#562C2C] text-sm mt-8">
                    Consultez <span className="font-medium">@BASIC</span> et <span className="text-[#F2542D] font-medium">#BASIC</span> pour découvrir les ex périences inoubliables des pourvoiries et activités BASIC.
                </p>
            </Container>
        </section>
    );
} 