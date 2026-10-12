import React, { createContext, useContext, useState } from 'react';
import type { ScreenId, ServiceCategory, Helper, Booking, UrgencyLevel, FeedbackData, UserRole } from '../types';
import { SERVICE_CATEGORIES, HELPERS_DATA, INITIAL_BOOKING } from '../data/mockData';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentScreen: ScreenId;
  navigateTo: (screen: ScreenId) => void;
  goBack: () => void;
  screenHistory: ScreenId[];
  selectedCategory: ServiceCategory;
  setSelectedCategory: (cat: ServiceCategory) => void;
  selectedHelper: Helper;
  setSelectedHelper: (helper: Helper) => void;
  urgency: UrgencyLevel;
  setUrgency: (urgency: UrgencyLevel) => void;
  location: string;
  setLocation: (loc: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  offeredPrice: number;
  setOfferedPrice: (price: number) => void;
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
  bookingsList: Booking[];
  feedback: FeedbackData;
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackData>>;
  activeFilterCategory: string | null;
  setActiveFilterCategory: (catId: string | null) => void;
  isDeviceFrameView: boolean;
  setIsDeviceFrameView: (val: boolean) => void;
  createBookingFromForm: () => void;
  acceptOrder: (bookingId: string) => void;
  declineOrder: (bookingId: string) => void;
  updateOrderStatus: (bookingId: string, status: Booking['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('1-login');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>(['1-login']);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(SERVICE_CATEGORIES[0]);
  const [selectedHelper, setSelectedHelper] = useState<Helper>(HELPERS_DATA[0]);
  const [urgency, setUrgency] = useState<UrgencyLevel>('Normal');
  const [location, setLocation] = useState<string>('Whitefield, Bengaluru');
  const [notes, setNotes] = useState<string>('');
  const [offeredPrice, setOfferedPrice] = useState<number>(SERVICE_CATEGORIES[0].basePrice);
  const [booking, setBooking] = useState<Booking>(INITIAL_BOOKING);
  const [bookingsList, setBookingsList] = useState<Booking[]>([INITIAL_BOOKING]);
  const [feedback, setFeedback] = useState<FeedbackData>({ rating: 5, comment: '' });
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null);
  const [isDeviceFrameView, setIsDeviceFrameView] = useState<boolean>(false);

  const navigateTo = (screen: ScreenId) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const previousScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen(userRole === 'helper' ? 'helper-dashboard' : '2-home');
    }
  };

  const createBookingFromForm = () => {
    const newBooking: Booking = {
      id: 'TA' + Math.floor(100000 + Math.random() * 900000),
      customerName: 'Ananya Sen',
      customerPhone: '+91 98450 12345',
      serviceId: selectedCategory.id,
      serviceName: selectedCategory.name,
      helper: selectedHelper,
      dateTime: '25 May 2025, 10:00 AM',
      location: location || 'Whitefield, Bengaluru',
      urgency,
      notes: notes || 'Assistance requested with care and reliability.',
      offeredPrice: offeredPrice || selectedCategory.basePrice,
      status: 'pending',
      acceptedTime: '9:42 AM',
      onTheWayTime: '9:55 AM',
      estimatedArrivalMins: 8,
    };
    setBooking(newBooking);
    setBookingsList((prev) => [newBooking, ...prev]);
  };

  const acceptOrder = (bookingId: string) => {
    setBookingsList((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'accepted', acceptedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : b
      )
    );
    if (booking.id === bookingId) {
      setBooking((prev) => ({
        ...prev,
        status: 'accepted',
        acceptedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
    }
  };

  const declineOrder = (bookingId: string) => {
    setBookingsList((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'declined' } : b))
    );
    if (booking.id === bookingId) {
      setBooking((prev) => ({ ...prev, status: 'declined' }));
    }
  };

  const updateOrderStatus = (bookingId: string, status: Booking['status']) => {
    setBookingsList((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    if (booking.id === bookingId) {
      setBooking((prev) => ({ ...prev, status }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentScreen,
        navigateTo,
        goBack,
        screenHistory,
        selectedCategory,
        setSelectedCategory,
        selectedHelper,
        setSelectedHelper,
        urgency,
        setUrgency,
        location,
        setLocation,
        notes,
        setNotes,
        offeredPrice,
        setOfferedPrice,
        booking,
        setBooking,
        bookingsList,
        feedback,
        setFeedback,
        activeFilterCategory,
        setActiveFilterCategory,
        isDeviceFrameView,
        setIsDeviceFrameView,
        createBookingFromForm,
        acceptOrder,
        declineOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
