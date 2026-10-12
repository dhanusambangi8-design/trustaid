import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopPresentationBar } from './components/common/TopPresentationBar';
import { PhoneFrame } from './components/common/PhoneFrame';
import { Screen1Login } from './components/screens/Screen1Login';
import { Screen2Home } from './components/screens/Screen2Home';
import { Screen3RequestHelp } from './components/screens/Screen3RequestHelp';
import { Screen4Categories } from './components/screens/Screen4Categories';
import { Screen5Helpers } from './components/screens/Screen5Helpers';
import { Screen6ProviderProfile } from './components/screens/Screen6ProviderProfile';
import { Screen7Confirmation } from './components/screens/Screen7Confirmation';
import { Screen8Tracking } from './components/screens/Screen8Tracking';
import { Screen9Feedback } from './components/screens/Screen9Feedback';
import { Screen10ThankYou } from './components/screens/Screen10ThankYou';
import { ScreenHelperDashboard } from './components/screens/ScreenHelperDashboard';

const MainRouter: React.FC = () => {
  const { currentScreen } = useApp();

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case '1-login':
        return <Screen1Login />;
      case '2-home':
        return <Screen2Home />;
      case '3-request':
        return <Screen3RequestHelp />;
      case '4-categories':
        return <Screen4Categories />;
      case '5-helpers':
        return <Screen5Helpers />;
      case '6-profile':
        return <Screen6ProviderProfile />;
      case '7-confirm':
        return <Screen7Confirmation />;
      case '8-track':
        return <Screen8Tracking />;
      case '9-feedback':
        return <Screen9Feedback />;
      case '10-thankyou':
        return <Screen10ThankYou />;
      case 'helper-dashboard':
      case 'helper-orders':
        return <ScreenHelperDashboard />;
      default:
        return <Screen2Home />;
    }
  };

  return (
    <div className="h-screen h-[100dvh] overflow-hidden bg-slate-900 flex flex-col font-sans antialiased text-slate-800">
      <TopPresentationBar />
      <PhoneFrame>
        {renderCurrentScreen()}
      </PhoneFrame>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
