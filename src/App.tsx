import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';

// Certificate Pages
import Ceh from './pages/certificates/Ceh';
import Cisa from './pages/certificates/Cisa';
import Cipp from './pages/certificates/Cipp';
import Dpdp from './pages/certificates/Dpdp';
import Iso from './pages/certificates/Iso';
import Aaia from './pages/certificates/Aaia';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import UserConsent from './pages/UserConsent';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';

// User Dashboard Pages
import UserDashboard from './pages/user/Dashboard';
import CreatePractice from './pages/user/CreatePractice';
import PracticeTest from './pages/user/PracticeTest';
import Reports from './pages/user/Reports';
import Settings from './pages/user/Settings';

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import UploadQuestions from './pages/admin/UploadQuestions';
import Questions from './pages/admin/Questions';
import ContentManager from './pages/admin/ContentManager';

const PublicLayout: React.FC = () => {
  const hostname = window.location.hostname;

  // Detect if we are on a certificate subdomain
  const isCehSub = hostname.includes('ceh.csqna.com');
  const isCisaSub = hostname.includes('cisa.csqna.com');
  const isCippSub = hostname.includes('cipp.csqna.com');
  const isDpdpSub = hostname.includes('dpdp.csqna.com');
  const isIsoSub = hostname.includes('iso.csqna.com');
  const isAaiaSub = hostname.includes('aaia.csqna.com');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            isCehSub ? <Ceh /> :
            isCisaSub ? <Cisa /> :
            isCippSub ? <Cipp /> :
            isDpdpSub ? <Dpdp /> :
            isIsoSub ? <Iso /> :
            isAaiaSub ? <Aaia /> :
            <Home />
          } />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/user-consent-agreement" element={<UserConsent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyemail/:token" element={<VerifyEmail />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/ceh" element={<Ceh />} />
          <Route path="/cisa" element={<Cisa />} />
          <Route path="/cipp" element={<Cipp />} />
          <Route path="/dpdp" element={<Dpdp />} />
          <Route path="/iso" element={<Iso />} />
          <Route path="/aaia" element={<Aaia />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const ProtectedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if ((user.role as string) === 'admin' || (user.role as string) === '0x88') return <Navigate to="/admin/dashboard" />;
  return <>{children}</>;
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if ((user.role as string) !== 'admin' && (user.role as string) !== '0x88') return <Navigate to="/panel/dashboard" />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Pages Layout */}
          <Route path="/*" element={<PublicLayout />} />

          {/* Candidate protected routes */}
          <Route
            path="/panel/*"
            element={
              <ProtectedUserRoute>
                <Routes>
                  <Route element={<UserLayout />}>
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="create" element={<CreatePractice />} />
                    <Route path="test/:testId" element={<PracticeTest />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="dashboard" />} />
                  </Route>
                </Routes>
              </ProtectedUserRoute>
            }
          />

          {/* Admin protected routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <Routes>
                  <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="questions" element={<Questions />} />
                    <Route path="upload" element={<UploadQuestions />} />
                    <Route path="content" element={<ContentManager />} />
                    <Route path="*" element={<Navigate to="dashboard" />} />
                  </Route>
                </Routes>
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
