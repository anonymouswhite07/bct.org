import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin, Landmark } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-slate-800 text-cream py-12 sm:py-16 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                {/* Brand Column */}
                <div className="sm:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/assets/logo.png" alt="Barthimaeu Charitable Trust Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
                        <h3 className="text-xl sm:text-2xl font-bold leading-tight">Barthimaeu Charitable Trust</h3>
                    </div>
                    <p className="text-sm text-slate-300 max-w-sm mb-6 leading-relaxed">
                        Empowering communities through health, education, and welfare. Dedicated to building a brighter future.
                    </p>
                    <div className="flex gap-3">
                        <a href="https://www.instagram.com/churchof_houseofworship?igsh=MXdrNjRzYzV0MG5law%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center hover:bg-primary transition-colors text-cream shadow-lg" aria-label="Instagram">
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 sm:mb-6">Quick Links</h4>
                    <ul className="space-y-2 sm:space-y-3 text-sm text-slate-300">
                        <li><Link to="/about" className="hover:text-cream transition-colors">About Us</Link></li>
                        <li><Link to="/programs" className="hover:text-cream transition-colors">Our Programs</Link></li>
                        <li><Link to="/gallery" className="hover:text-cream transition-colors">Gallery</Link></li>
                        <li><Link to="/contact" className="hover:text-cream transition-colors">Contact</Link></li>
                        <li><Link to="/donate" className="hover:text-cream transition-colors">Donate</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 sm:mb-6">Contact Info</h4>
                    <address className="text-sm text-slate-300 not-italic space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                            <p>7/121, House of Worship,<br />Veddappan Kattu Valvu,<br />Deevattipatty (Po), Kadayampatty (Tk),<br />Salem (Dt) 636351,<br />Tamil Nadu, South India</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-primary shrink-0" />
                            <p className="break-all">contact@bctsouthind.org</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-primary shrink-0" />
                            <p>+91 94425 29635 / 94862 27632</p>
                        </div>
                        <div className="flex items-start gap-3 pt-2">
                            <Landmark size={18} className="text-primary shrink-0 mt-0.5" />
                            <p className="leading-relaxed">
                                <strong className="text-cream underline underline-offset-4 decoration-primary mb-1 block">Official Bank Details</strong>
                                <span className="text-slate-200">Name: BHARTHIMAEU CHARITABLE TRUST</span><br />
                                <span className="text-slate-200">A/c: 4373101010037</span><br />
                                <span className="text-slate-200">IFSC: CNRB0016319</span><br />
                                <span className="text-slate-200 uppercase text-[11px] font-bold tracking-widest text-primary">CANARA BANK</span>
                            </p>
                        </div>
                    </address>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700 text-center text-xs sm:text-sm text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-3">
                <span>&copy; {new Date().getFullYear()} Barthimaeu Charitable Trust. All rights reserved.</span>
                <div className="space-x-4">
                    <Link to="/privacy" className="hover:text-cream">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-cream">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
