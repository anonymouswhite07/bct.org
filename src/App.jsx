import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import DesignSystem from "./pages/DesignSystem";
import About from "./pages/About";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Gallery from "./pages/Gallery";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import ThankYou from "./pages/ThankYou";
import Volunteer from "./pages/Volunteer";
import NotFound from "./pages/NotFound";

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
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
