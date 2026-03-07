import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { HandHeart, Users, Heart, GraduationCap, Stethoscope, Utensils } from "lucide-react";

export default function GetInvolved() {
    const [activeForm, setActiveForm] = useState("volunteer");
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
            {/* Hero Section */}
            <section className="relative w-full pt-20 pb-16 px-4 bg-cream overflow-hidden">
                <Container className="text-center max-w-3xl mx-auto">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                            <HandHeart size={40} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-4">
                            Get <span className="text-primary">Involved</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                            Your contribution, no matter how big or small, helps us build a more equitable world. Choose how you'd like to support our mission.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Options Section */}
            <Section className="pt-0">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <SkeuCard
                            className={`p-8 text-center cursor-pointer transition-all ${activeForm === "volunteer" ? "ring-2 ring-primary bg-primary/5" : ""}`}
                            onClick={() => setActiveForm("volunteer")}
                        >
                            <Users size={48} className="text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Volunteer</h3>
                            <p className="text-slate-600">Join our on-ground team and directly impact lives.</p>
                        </SkeuCard>

                        <SkeuCard
                            className={`p-8 text-center cursor-pointer transition-all ${activeForm === "donate" ? "ring-2 ring-primary bg-primary/5" : ""}`}
                            onClick={() => setActiveForm("donate")}
                        >
                            <Heart size={48} className="text-secondary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Donate</h3>
                            <p className="text-slate-600">Support our financial needs for sustainable growth.</p>
                        </SkeuCard>

                        <SkeuCard
                            className={`p-8 text-center cursor-pointer transition-all ${activeForm === "partner" ? "ring-2 ring-primary bg-primary/5" : ""}`}
                            onClick={() => setActiveForm("partner")}
                        >
                            <HandHeart size={48} className="text-emerald-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Partner</h3>
                            <p className="text-slate-600">Corporate and community-level collaborations.</p>
                        </SkeuCard>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <SkeuCard className="p-8 md:p-12" hover={false}>
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <HandHeart size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h3>
                                    <p className="text-slate-600">Your interest has been recorded. Our team will contact you shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-slate-800 capitalize">{activeForm} Application</h2>
                                        <p className="text-slate-600 mt-2">Please fill out the form below and we will get back to you within 48 hours.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                            <input type="text" required placeholder="John Doe" className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                            <input type="email" required placeholder="john@example.com" className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                                            <input type="tel" placeholder="+1 (555) 000-0000" className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-slate-700">{activeForm === "donate" ? "Area of Interest" : "Skills / Expertise"}</label>
                                            <select className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner text-slate-700">
                                                <option>Education Support</option>
                                                <option>Healthcare Camps</option>
                                                <option>Food Distribution</option>
                                                <option>Women Empowerment</option>
                                                <option>Community Welfare</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <label className="text-sm font-semibold text-slate-700">Why do you want to join us?</label>
                                            <textarea rows="4" className="px-4 py-3 rounded-xl border border-slate-200 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner resize-none" placeholder="Share your motivation..."></textarea>
                                        </div>
                                        <div className="md:col-span-2 pt-4">
                                            <SkeuButton type="submit" variant="primary" className="w-full py-4 text-lg">
                                                Submit Application
                                            </SkeuButton>
                                        </div>
                                    </form>
                                </>
                            )}
                        </SkeuCard>
                    </div>
                </Container>
            </Section>

            {/* Ways to Support */}
            <Section className="bg-cream-dark/20 pb-32">
                <Container>
                    <SectionTitle title="Specific Programs to Support" subtitle="You can choose to direct your contribution to specific areas of our trust's work." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {[
                            { icon: GraduationCap, title: "Sponsor a Student", desc: "Covers books, uniform, and tuition for a child for one full academic year." },
                            { icon: Stethoscope, title: "Medical Kit Fund", desc: "Provides specialized medicine and hygiene kits for our rural health camps." },
                            { icon: Utensils, title: "Community Kitchen", desc: "Helps us serve over 500 hot meals daily to the homeless in the city." },
                        ].map((program, idx) => (
                            <SkeuCard key={idx} className="p-8 text-center flex flex-col h-full">
                                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-primary mx-auto mb-6 shadow-skeu-sm">
                                    <program.icon size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-slate-800 mb-3">{program.title}</h4>
                                <p className="text-slate-600 mb-6 flex-grow">{program.desc}</p>
                                <SkeuButton variant="outline" className="w-full">Support Now</SkeuButton>
                            </SkeuCard>
                        ))}
                    </div>
                </Container>
            </Section>
        </div>
    );
}
