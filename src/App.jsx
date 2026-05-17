import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Loader2 } from "lucide-react";

// Lazy Load Pages for Mobile Performance 
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramDetails = lazy(() => import("./pages/ProgramDetails"));
const Events = lazy(() => import("./pages/Events"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const Gallery = lazy(() => import("./pages/Gallery"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const Contact = lazy(() => import("./pages/Contact"));
const Donate = lazy(() => import("./pages/Donate"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const DesignSystem = lazy(() => import("./pages/DesignSystem"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Full-screen loader for smooth transitions
function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cream/80 backdrop-blur-sm z-50">
      <Loader2 size={48} className="text-primary animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
