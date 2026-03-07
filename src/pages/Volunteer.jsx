import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { UserPlus, Mail, Phone, MapPin, CheckCircle2, Heart } from "lucide-react";

export default function Volunteer() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        interest: "Community Programs"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulation of DB storage (Firebase/Supabase)
        console.log("Stewardship: Adding new volunteer to database...", formData);
        setTimeout(() => setSubmitted(false), 8000);
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
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 shadow-skeu-sm ring-8 ring-white/50">
                            <UserPlus size={40} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-4">
                            Become a <span className="text-primary">Volunteer</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                            Your time is the most valuable gift you can give. Join our network of registered volunteers and help us serve on the ground.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Main Form & Benefits */}
            <Section className="pt-0 pb-32">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                        {/* Left Column: Benefits & Registration */}
                        <div className="flex-1 w-full order-2 lg:order-1">
                            <SkeuCard className="p-8 md:p-12" hover={false}>
                                {submitted ? (
                                    <div className="text-center py-20">
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-skeu-sm border border-green-200">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Registration Received!</h2>
                                        <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
                                            Thank you for stepping up, {formData.name.split(' ')[0]}. Our coordinator will contact you shortly to schedule an orientation call.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Volunteer Application</h2>
                                        <p className="text-slate-500 mb-10">Please provide your details to join our official stewardship network.</p>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                                                    <input type="text" required placeholder="Full Name" className="px-5 py-4 rounded-xl border-2 border-transparent bg-cream-dark/20 focus:border-primary/30 focus:bg-white text-slate-800 transition-all shadow-inner outline-none"
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                                                    <input type="email" required placeholder="Email Address" className="px-5 py-4 rounded-xl border-2 border-transparent bg-cream-dark/20 focus:border-primary/30 focus:bg-white text-slate-800 transition-all shadow-inner outline-none"
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                                    <input type="tel" required placeholder="+1 (555) 000-0000" className="px-5 py-4 rounded-xl border-2 border-transparent bg-cream-dark/20 focus:border-primary/30 focus:bg-white text-slate-800 transition-all shadow-inner outline-none"
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-bold text-slate-700">Area of Interest</label>
                                                    <select className="px-5 py-4 rounded-xl border-2 border-transparent bg-cream-dark/20 focus:border-primary/30 focus:bg-white text-slate-700 transition-all shadow-inner outline-none font-medium"
                                                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                                    >
                                                        <option>Community Programs</option>
                                                        <option>Education Support</option>
                                                        <option>Events & Logistics</option>
                                                        <option>Fundraising</option>
                                                        <option>Healthcare Camps</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-bold text-slate-700">City</label>
                                                    <input type="text" required placeholder="e.g. Salem" className="px-5 py-4 rounded-xl border-2 border-transparent bg-cream-dark/20 focus:border-primary/30 focus:bg-white text-slate-800 transition-all shadow-inner outline-none"
                                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-sm font-bold text-slate-700">State</label>
                                                    <input type="text" required placeholder="e.g. TN" className="px-5 py-4 rounded-xl border-2 border-transparent bg-cream-dark/20 focus:border-primary/30 focus:bg-white text-slate-800 transition-all shadow-inner outline-none"
                                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                <SkeuButton type="submit" variant="primary" className="w-full py-5 text-xl shadow-skeu font-bold">
                                                    Become a Volunteer
                                                </SkeuButton>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </SkeuCard>
                        </div>

                        {/* Right Column: Information */}
                        <div className="w-full lg:w-96 order-1 lg:order-2 space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Why Volunteer?</h3>
                                <div className="space-y-8 mt-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center shrink-0 shadow-skeu-sm">
                                            <Heart size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">Make an Impact</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed mt-1">See the direct results of your efforts in the smiles of the communities we serve.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 shadow-skeu-sm">
                                            <UserPlus size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">Build Community</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed mt-1">Meet like-minded passionate individuals and build lifelong connections.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0 shadow-skeu-sm">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">Leadership Skills</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed mt-1">Take charge of events and programs, developing crucial management and soft skills.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800 rounded-3xl p-10 text-white relative overflow-hidden group shadow-xl">
                                <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-white/10 transition-colors">
                                    <CheckCircle2 size={120} strokeWidth={1} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 relative z-10">Volunteer Orientation</h3>
                                <p className="text-slate-400 mb-8 relative z-10 font-light leading-relaxed">
                                    Once you register, our team will invite you for a virtual orientation session to discuss current needs and safe-guarding protocols.
                                </p>
                                <div className="flex items-center gap-3 relative z-10 border-t border-white/10 pt-6">
                                    <Mail size={18} className="text-secondary" />
                                    <span className="text-sm text-slate-300 font-medium">volunteers@trustngo.org</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </Section>
        </div>
    );
}
