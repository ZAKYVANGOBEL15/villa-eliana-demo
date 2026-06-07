export interface GalleryImage {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'wellness' | 'surroundings';
  imageUrl: string;
  description: string;
  details: string[];
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BookingInquiry {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  villaSuite: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
}

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}
