import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { Property } from '@/types/Property';

export function transformPropertyFromDb(db: any): Property {
  return {
    id: db.id,
    title: db.title,
    address: db.address,
    city: db.city,
    province: db.province,
    price: Number(db.price) || 0,
    bedrooms: Number(db.bedrooms) || 0,
    bathrooms: Number(db.bathrooms) || 0,
    property_type: db.property_type || db.propertyType || '',
    square_feet: db.square_feet ?? db.squareFeet ?? 0,
    status: (db.status === 'published' || db.status === 'draft')
      ? db.status
      : (['for-sale', 'for-rent'].includes(db.status) ? 'published' : 'draft'),
    description: db.description || '',
    featured: Boolean(db.featured),
    created_at: db.created_at,
    updated_at: db.updated_at,
    cover_image: db.cover_image || db.coverImage || '',
    images: Array.isArray(db.images)
      ? db.images
      : typeof db.images === 'string'
        ? [db.images]
        : [],
    ...db, // preserve any extra fields
  };
}