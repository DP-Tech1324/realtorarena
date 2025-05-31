// Make all fields optional if you're not sure they'll always be present (safest for now)
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  province: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  square_feet?: number;
  status: 'published' | 'draft';
  description?: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
  cover_image?: string;
  images: string[];      // THIS is important!
  meta_keywords?: string;
  seo_title?: string;
  seo_description?: string;
  virtual_tour_url?: string;
  [key: string]: any;    // Allow extra keys just in case
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  photo: string;
  bio: string;
  specialties: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  image?: string;
}
