import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ContentPage from "./pages/ContentPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserLoginPage from "./pages/UserLoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<ContentPage type="package" title="Travel Packages" />} />
          <Route path="/visa-services" element={<ContentPage type="visa" title="Visa Services" />} />
          <Route path="/travel-desk" element={<ContentPage type="desk" title="Travel Desk Services" />} />
          <Route path="/cms" element={<ContentPage type="cms" title="CMS Pages" />} />
          <Route path="/gallery" element={<ContentPage type="gallery" title="Image Gallery" />} />
          <Route path="/testimonials" element={<ContentPage type="testimonial" title="Testimonials" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
