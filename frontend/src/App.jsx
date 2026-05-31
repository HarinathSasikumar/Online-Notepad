import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PinnedPage from './pages/PinnedPage';
import ArchivedPage from './pages/ArchivedPage';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAFBFC' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-indigo flex items-center justify-center animate-pulse">
          </div>
          <p className="text-slate-700 text-sm font-medium">Loading SmartNotes Pro...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public route (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// App with modal state lifted for Layout
const AppRoutes = () => {
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <NotesProvider>
              <Layout onCreateNote={() => {}} />
            </NotesProvider>
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pinned" element={<PinnedPage />} />
        <Route path="/archived" element={<ArchivedPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#FFFFFF',
              color: '#020617',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              padding: '12px 16px',
              fontSize: '0.875rem',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: { primary: '#10B981', secondary: '#FFFFFF' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#FFFFFF' },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

