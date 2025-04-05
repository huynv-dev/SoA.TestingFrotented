export interface MenuItem {
  name: string;
  url: string;
}

export interface Case {
  category: string;
  tagline: string;
  description: string;
  cta?: string;
}

export interface Address {
  name: string;
  location: string;
  phone: string;
}

export interface Review {
  author: string;
  review: string;
  date: string;
}

export interface Picto {
  title: string;
  description: string;
}

export interface CartePoint {
  name: string;
  website: string;
  address: string;
  phone: string | string[];
  free_call?: string;
  fax?: string;
  email?: string;
  activities: string[];
  marker_information: string[];
  coordinates?: {
    latitude: string;
    longitude: string;
  };
}

export interface PageData {
  id: string;
  language: string;
  head_menu: string[];
  banner_title: string[];
  banner_menu: string[];
  bloc_1: {
    title: string;
    subtitle: string;
    cases: Case[];
  };
  bloc_2: {
    title: string;
    cases: string[];
  };
  bloc_2_2: {
    title: string;
    btn_1: string[];
    btn_2: string[];
    btn_3: string;
    btn_4: string[];
    btn_5: string;
    btn_6: string;
  };
  bloc_3: {
    title: string;
    more_info: string;
    cases: Case[];
  };
  carte_point: CartePoint[];
  bloc_4: {
    title: string;
    subtitle: string;
    text_title: string;
    text: string;
    pictos: Picto[];
  };
  bloc_5: {
    title: string;
    text: string;
    reviews: Review[];
    footer: string;
  };
  bloc_6: {
    title: string;
    subtitle: string;
    text: string;
    button: string;
  };
  footer: {
    address: Address;
    links: MenuItem[];
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface AboutSection {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ExploreItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface MapLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  description: string;
}

export interface ApiResponse {
  menuItems: MenuItem[];
  address: Address;
  caseStudies: CaseStudy[];
  about: AboutSection;
  exploreItems: ExploreItem[];
  mapLocations: MapLocation[];
} 