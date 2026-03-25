import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";

const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Donate", path: "/donate" },
];

export function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Prevent background scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <>
            {/* Top Navbar Bar */}
            <nav className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur-md border-b border-cream-dark shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-18">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <img
                            src="/assets/logo.png"
                            alt="Barthimaeu Charitable Trust Logo"
                            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                        />
                        <span className="text-base sm:text-xl font-bold tracking-tight text-slate-800">
                            Barthimaeu Trust
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden xl:flex items-center gap-6 2xl:gap-8">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-semibold transition-colors hover:text-primary whitespace-nowrap ${location.pathname === link.path ? "text-primary" : "text-slate-600"}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/donate"
                            className="ml-2 px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-skeu-sm hover:shadow-skeu transition-all"
                        >
                            Donate
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="xl:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-cream border border-cream-dark shadow-skeu-sm text-slate-800 active:shadow-skeu-pressed transition-all"
                        aria-label="Open Menu"
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </nav>

            {/* Full-Screen Mobile Menu Overlay — rendered via Portal to avoid stacking context issues */}
            {isOpen && createPortal(
                <div
                    className="fixed inset-0 z-[999] flex flex-col"
                    style={{ backgroundColor: "#f5f3ef" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/logo.png"
                                alt="Logo"
                                className="w-10 h-10 object-contain"
                            />
                            <span className="text-lg font-bold text-slate-800">Menu</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-11 h-11 flex items-center justify-center rounded-xl bg-cream border border-cream-dark shadow-skeu-sm text-slate-700 active:shadow-skeu-pressed"
                            aria-label="Close Menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        <div className="flex flex-col gap-2">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block w-full px-5 py-4 rounded-xl text-lg font-bold transition-all ${
                                        location.pathname === link.path
                                            ? "bg-primary text-white shadow-md"
                                            : "text-slate-800 hover:bg-slate-200/60 active:bg-slate-200"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="shrink-0 px-6 pb-6 pt-4 border-t border-slate-200 space-y-3">
                        <Link
                            to="/donate"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center bg-primary text-white py-4 rounded-xl text-lg font-black uppercase tracking-widest shadow-lg active:translate-y-px transition-all"
                        >
                            Donate Now
                        </Link>
                        <Link
                            to="/volunteer"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center bg-secondary text-white py-4 rounded-xl text-lg font-black uppercase tracking-widest shadow-lg active:translate-y-px transition-all"
                        >
                            Become a Volunteer
                        </Link>
                        <p className="text-center text-[10px] text-slate-400 mt-3 font-bold uppercase tracking-[0.2em]">
                            Barthimaeu Trust
                        </p>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
