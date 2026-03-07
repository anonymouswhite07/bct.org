import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Get Involved", path: "/get-involved" },
];

export function Navbar() {
    const location = useLocation();

    return (
        <nav className="sticky top-0 z-50 w-full bg-cream/80 backdrop-blur-md px-6 py-4 border-b border-cream-dark shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tighter text-slate-800 flex items-center gap-2">
                    <span className="whitespace-nowrap">Barthimaeu Trust</span>
                </Link>
                <div className="hidden md:flex gap-6 items-center">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`relative px-2 py-1 text-sm font-medium transition-colors ${location.pathname === link.path ? "text-primary font-bold" : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                    <Link
                        to="/get-involved"
                        className="ml-4 px-4 py-2 bg-slate-800 text-cream rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors shadow-sm"
                    >
                        Donate
                    </Link>
                </div>
            </div>
        </nav>
    );
}
