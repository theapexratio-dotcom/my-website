
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { SignupPage } from './pages/SignupPage.tsx';
import { ClientDashboard } from './pages/ClientDashboard.tsx';
import { CoachPortal } from './pages/CoachPortal.tsx';
import { LibraryPage } from './pages/LibraryPage.tsx';
import { TransformationsPage } from './pages/TransformationsPage.tsx';
import { AcademyPage } from './pages/AcademyPage.tsx';
import { OnboardingPage } from './pages/OnboardingPage.tsx';
import { MembershipPage } from './pages/MembershipPage.tsx';
import { AboutCoach } from './pages/AboutCoach.tsx';
import { CheckInPage } from './pages/CheckInPage.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import { UserProfile } from './types.ts';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('apex_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (email: string, pass: string) => {
    // Admin Check
    if (email === 'richardalameen@gmail.com' && pass === 'APEX') {
      const admin: UserProfile = {
        uid: 'admin',
        email,
        displayName: 'Richard Al-ameen',
        isCoach: true,
        serviceType: 'Online',
        sessionBalance: 0,
        sessionHistory: [],
        bookedDates: [],
        subscriptionStatus: 'Active',
        paymentStatus: 'Paid',
        progressHistory: [],
        photoHistory: [],
        checkInHistory: [],
        transformations: [],
        assignedExercises: []
      };
      setUser(admin);
      localStorage.setItem('apex_auth', 'true');
      localStorage.setItem('apex_is_admin', 'true');
      localStorage.setItem('apex_user', JSON.stringify(admin));
      window.location.hash = '#/coach-portal';
      return;
    }
    
    // Default Mock User
    const mockUser: UserProfile = {
      uid: 'user123',
      email,
      displayName: 'Alex Johnson',
      isCoach: false,
      serviceType: 'Face-to-Face',
      sessionBalance: 8,
      sessionHistory: [],
      bookedDates: [],
      subscriptionStatus: 'Active',
      paymentStatus: 'Paid',
      currentWeight: '85',
      targetWeight: '78',
      mainGoal: 'Elite Performance',
      progressHistory: [],
      photoHistory: [],
      checkInHistory: [],
      transformations: [],
      assignedExercises: []
    };
    setUser(mockUser);
    localStorage.setItem('apex_auth', 'true');
    localStorage.setItem('apex_is_admin', 'false');
    localStorage.setItem('apex_user', JSON.stringify(mockUser));
    window.location.hash = '#/dashboard';
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('apex_auth');
    localStorage.removeItem('apex_is_admin');
    localStorage.removeItem('apex_user');
    window.location.hash = '#/login';
  };

  const isCoachPortal = window.location.hash.includes('coach-portal');

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
        {!isCoachPortal && <Navbar isAuthenticated={!!user} onLogout={handleLogout} />}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/about-coach" element={<AboutCoach />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={user && !user.isCoach ? <ClientDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/check-in" element={user && !user.isCoach ? <CheckInPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/coach-portal" element={user && user.isCoach ? <CoachPortal onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/transformations" element={<TransformationsPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {!isCoachPortal && <Footer />}
      </div>
    </Router>
  );
};

export default App;
