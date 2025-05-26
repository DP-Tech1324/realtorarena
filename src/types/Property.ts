
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  province: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: 'house' | 'condo' | 'townhouse' | 'land';
  status: 'for-sale' | 'for-rent' | 'sold' | 'pending';
  featured: boolean;
  description: string;
  images: string[];
  mlsNumber?: string;
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string;
  virtualTourUrl?: string;
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
