export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

export interface HeaderProps {
  className?: string;
} 