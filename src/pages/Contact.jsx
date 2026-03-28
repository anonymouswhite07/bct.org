import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { Mail, Phone, MapPin, Send, HelpCircle } from "lucide-react";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="w-full bg-cream min-h-screen">
            {/* Hero Header */}
            <section className="relative w-full pt-20 pb-16 px-4 bg-cream overflow-hidden">
                <Container className="text-center max-w-3xl mx-auto">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                            <Mail size={40} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-4">
                            Contact <span className="text-primary">Us</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                            Have questions, feedback, or want to explore partnerships? We'd love to hear from you. Leave us a message and our team will be in touch.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Main Content */}
            <Section className="pt-0 pb-32">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                        {/* Contact Information */}
                        <div className="w-full lg:w-96 space-y-12">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                <SectionTitle title="Call or Visit" className="text-left" />
                                <div className="space-y-8 mt-12">
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 shadow-skeu-sm">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-800 mb-1">Our Location</h4>
                                            <p className="text-slate-600">7/121, House of Worship,<br />Veddappan Kattu Valvu,<br />Deevattipatty (Po), Kadayampatty (Tk),<br />Salem (Dt) 636351, Tamil Nadu</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0 shadow-skeu-sm">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-800 mb-1">Phone Number</h4>
                                            <p className="text-slate-600">+91 94425 29635<br />+91 94862 27632<br />Mon - Sat: 9:00 AM - 6:00 PM</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 shrink-0 shadow-skeu-sm">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-800 mb-1">Email Support</h4>
                                            <p className="text-slate-600 font-medium text-primary underline underline-offset-4">contact@bctsouthind.org</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* FAQ Preview or Help card */}
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                <SkeuCard className="p-8 mt-12 border-l-4 border-primary" hover={false}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <HelpCircle size={24} className="text-primary" />
                                        <h3 className="text-xl font-bold text-slate-800">Need Help?</h3>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                        Check our Help page for frequently asked questions about volunteering, donations, and trust reporting.
                                    </p>
                                    <SkeuButton variant="outline" className="w-full text-sm">View FAQs</SkeuButton>
                                </SkeuCard>
                            </motion.div>
                        </div>

                        {/* Contact Form Column */}
                        <div className="flex-1">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                <SkeuCard className="p-8 md:p-12 relative overflow-hidden" hover={false}>
                                    {submitted ? (
                                        <div className="text-center py-20">
                                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Send size={40} className="ml-1" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                                            <p className="text-xl text-slate-600">Your message has been successfully delivered our team will reach back very soon.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Send a Message</h2>
                                            <p className="text-slate-600 mb-10">We're here to assist you and answer any questions you may have.</p>

                                            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                                        <input type="text" required placeholder="John Doe" className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner" />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                                        <input type="email" required placeholder="john@example.com" className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2 w-full text-left">
                                                    <label className="text-sm font-semibold text-slate-700">Phone Number (Optional)</label>
                                                    <input type="tel" placeholder="+1 (555) 000-0000" className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner" />
                                                </div>

                                                <div className="flex flex-col gap-2 w-full text-left">
                                                    <label className="text-sm font-semibold text-slate-700">Subject</label>
                                                    <select className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner text-slate-700">
                                                        <option>General Inquiry</option>
                                                        <option>Donation Help</option>
                                                        <option>Volunteer Opportunity</option>
                                                        <option>Media & Partnership</option>
                                                        <option>Corporate Social Responsibility</option>
                                                    </select>
                                                </div>

                                                <div className="flex flex-col gap-2 w-full text-left">
                                                    <label className="text-sm font-semibold text-slate-700">Your Message</label>
                                                    <textarea rows="6" required className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner resize-none" placeholder="How can we help you?"></textarea>
                                                </div>

                                                <SkeuButton type="submit" variant="primary" className="w-full md:w-auto md:px-12 py-4 text-lg mt-4 self-start">
                                                    <Send size={20} className="mr-2" /> Send Message
                                                </SkeuButton>
                                            </form>
                                        </>
                                    )}
                                </SkeuCard>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Map Mockup */}
            <section className="w-full h-[50vh] min-h-[400px] mb-20 px-4 md:px-12">
                <SkeuCard className="w-full h-full p-2 border-none overflow-hidden" hover={false}>
                    <div className="w-full h-full bg-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center">
                        {/* Simulating Map Embed */}
                        <div className="absolute inset-0 bg-cover bg-center grayscale opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop')" }}></div>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl pulse-animation"
                        >
                            <MapPin className="text-white drop-shadow" size={32} />
                        </motion.div>
                        <div className="absolute bottom-6 left-6 z-10 p-4 bg-white/80 backdrop-blur rounded-xl shadow-lg border border-white/50 max-w-sm hidden md:block">
                            <h4 className="font-bold text-slate-800 mb-1">Barthimaeu Charitable Trust</h4>
                            <p className="text-sm text-slate-600">7/121, House of Worship, Veddappan Kattu Valvu, Deevattipatty, Salem 636351, Tamil Nadu</p>
                        </div>
                    </div>
                </SkeuCard>
            </section>
        </div>
    );
}
