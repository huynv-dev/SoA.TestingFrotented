import { SITE_METADATA } from './site-metadata'

interface NavItem {
  href: string
  title: string
  children?: NavItem[]
}

export const HEADER_NAV_LINKS: NavItem[] = [
  { href: '/', title: 'Về chúng tôi' },
  { 
    href: '/hotels', 
    title: 'Khách sạn',
    children: [
      { href: '/hotels/beach', title: 'Khách sạn biển' },
      { href: '/hotels/city', title: 'Khách sạn thành phố' },
      { href: '/hotels/resort', title: 'Resort & Spa' }
    ]
  },
  { 
    href: '/discount', 
    title: 'Ưu đãi',
    children: [
      { href: '/dining/restaurants', title: 'Nhà hàng' },
      { href: '/dining/bars', title: 'Bar & Lounge' },
      { href: '/dining/cafe', title: 'Café' }
    ]
  },
  { 
    href: '/services', 
    title: 'Dịch vụ',
    children: [
      { href: '/services/spa', title: 'Spa & Wellness' },
      { href: '/services/gym', title: 'Phòng tập Gym' },
      { href: '/services/pool', title: 'Hồ bơi' },
      { href: '/services/events', title: 'Tổ chức sự kiện' }
    ]
  },
  { href: '/news', title: 'Tin tức' },
]

export const FOOTER_NAV_LINKS = [
  { href: '/hotels', title: 'Khách sạn', emoji: 'hotel' },
  { href: '/dining', title: 'Ẩm thực', emoji: 'fork-and-knife' },
  { href: '/services', title: 'Dịch vụ', emoji: 'sparkles' },
  { href: '/about', title: 'Về chúng tôi', emoji: 'information' },
  { href: '/contact', title: 'Liên hệ', emoji: 'telephone' },
]

export const FOOTER_LEGAL_LINKS = [
  { title: 'Hướng dẫn đặt phòng', href: '/booking-guide' },
  { title: 'Điều khoản dịch vụ', href: '/terms' },
  { title: 'Chính sách bảo mật', href: '/privacy' },
  { title: 'Hỗ trợ', href: 'mailto:support@mandalahotel.com.vn' },
]
