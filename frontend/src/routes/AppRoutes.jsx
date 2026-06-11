import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Journals from '../pages/Journals';
import ContactUs from '../pages/ContactUs';
import AdvancedSearch from '../pages/AdvancedSearch';
import SearchDetail from '../pages/SearchDetail';

// Admin pages
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminJournals from '../pages/admin/AdminJournals';
import AddEditJournal from '../pages/admin/AddEditJournal';
import AdminArticles from '../pages/admin/AdminArticles';
import AddEditArticle from '../pages/admin/AddEditArticle';
import BulkUpload from '../pages/admin/BulkUpload';
import ContactAdmin from '../pages/admin/ContactAdmin';
import PrivacyPolicy from '../pages/FooterPages/PrivacyPolicy';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
      <Route path="/journals" element={<MainLayout><Journals /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ContactUs /></MainLayout>} />
      <Route path="/advanced-search" element={<MainLayout><AdvancedSearch /></MainLayout>} />
      <Route path="/search" element={<SearchDetail />} />
      <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />

      {/* Auth */}
      <Route path="/login" element={<AdminLogin />} />

      {/* Admin (Protected) */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/journals" element={<ProtectedRoute><AdminJournals /></ProtectedRoute>} />
      <Route path="/admin/journals/add" element={<ProtectedRoute><AddEditJournal /></ProtectedRoute>} />
      <Route path="/admin/journals/:id/edit" element={<ProtectedRoute><AddEditJournal /></ProtectedRoute>} />
      <Route path="/admin/journals/:id" element={<ProtectedRoute><AddEditJournal /></ProtectedRoute>} />
      <Route path="/admin/articles" element={<ProtectedRoute><AdminArticles /></ProtectedRoute>} />
      <Route path="/admin/articles/add" element={<ProtectedRoute><AddEditArticle /></ProtectedRoute>} />
      <Route path="/admin/articles/import" element={<ProtectedRoute><BulkUpload /></ProtectedRoute>} />
      <Route path="/admin/articles/:id/edit" element={<ProtectedRoute><AddEditArticle /></ProtectedRoute>} />
      <Route path="/admin/bulk-upload" element={<ProtectedRoute><BulkUpload /></ProtectedRoute>} />
      <Route path="/admin/upload" element={<ProtectedRoute><BulkUpload /></ProtectedRoute>} />
      <Route path="/admin/contactadmin" element={<ProtectedRoute><ContactAdmin/></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
