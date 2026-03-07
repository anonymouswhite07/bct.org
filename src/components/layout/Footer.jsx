import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-slate-800 text-cream py-16 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-2xl font-bold mb-4">Barthimaeu Charitable Trust</h3>
                    <p className="text-sm text-slate-300 max-w-sm mb-6 leading-relaxed">
                        Empowering communities through health, education, and welfare. Dedicated to building a brighter future.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-primary transition-colors text-cream" aria-label="Facebook">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-primary transition-colors text-cream" aria-label="Twitter">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-primary transition-colors text-cream" aria-label="Instagram">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-primary transition-colors text-cream" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-slate-300">
                        <li><Link to="/about" className="hover:text-cream transition-colors">About Us</Link></li>
                        <li><Link to="/programs" className="hover:text-cream transition-colors">Our Programs</Link></li>
                        <li><Link to="/events" className="hover:text-cream transition-colors">Events</Link></li>
                        <li><Link to="/gallery" className="hover:text-cream transition-colors">Gallery</Link></li>
                        <li><Link to="/contact" className="hover:text-cream transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
                    <address className="text-sm text-slate-300 not-italic space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                            <p>123 NGO Street, Goodwill Area<br />City, State, 12345</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-primary shrink-0" />
                            <p>contact@bctsouthind.org</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-primary shrink-0" />
                            <p>+1 234 567 8900</p>
                        </div>
                    </address>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-700 text-center text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
                <span>&copy; {new Date().getFullYear()} Barthimaeu Charitable Trust. All rights reserved.</span>
                <div className="space-x-4">
                    <Link to="/privacy" className="hover:text-cream">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-cream">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
