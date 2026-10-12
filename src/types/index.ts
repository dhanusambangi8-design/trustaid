export type ServiceCategoryId = 
  | 'hospital' 
  | 'medicine' 
  | 'grocery' 
  | 'transport' 
  | 'documentation' 
  | 'companionship';

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  icon: string;
  description: string;
  availableHelpers: number;
  basePrice: number;
  priceUnit: string;
}

export interface Helper {
  id: string;
  name: string;
  avatar: string;
  serviceId: ServiceCategoryId;
  serviceName: string;
  rating: number;
  reviewsCount: number;
  helpsCompleted: number;
  distanceKm: number;
  isOnline: boolean;
  isVerified: boolean;
  verificationOrg?: string; // e.g. "Worknot & Regler" verified
  about: string;
  badges: string[];
  priceRate: number;
  minAcceptedPrice: number;
}

export type UrgencyLevel = 'Low' | 'Normal' | 'High';

export type UserRole = 'customer' | 'helper';

export interface Booking {
  id: string;
  customerName: string;
  customerPhone?: string;
  serviceId: ServiceCategoryId;
  serviceName: string;
  helper: Helper;
  dateTime: string;
  location: string;
  urgency: UrgencyLevel;
  notes: string;
  offeredPrice: number;
  status: 'pending' | 'accepted' | 'declined' | 'on_the_way' | 'in_progress' | 'completed';
  acceptedTime?: string;
  onTheWayTime?: string;
  estimatedArrivalMins: number;
}

export interface FeedbackData {
  rating: number;
  comment: string;
}

export type ScreenId = 
  | '1-login'
  | '2-home'
  | '3-request'
  | '4-categories'
  | '5-helpers'
  | '6-profile'
  | '7-confirm'
  | '8-track'
  | '9-feedback'
  | '10-thankyou'
  | 'helper-dashboard'
  | 'helper-orders';
