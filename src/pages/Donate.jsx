import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { Heart, CreditCard, Apple, Store, HelpCircle, CheckCircle2 } from "lucide-react";

const donationTiers = [
    { amount: 10, label: "Provide Meals", description: "Provides 5 nutritious meals to homeless families." },
    { amount: 25, label: "Support Education", description: "Covers books and school supplies for one student." },
    { amount: 50, label: "Medical Kit", description: "Provides essential medicines for our health camps." },
    { amount: 100, label: "Community Hub", description: "Supports maintenance of our community centers." },
];

export default function Donate() {
    const [selectedAmount, setSelectedAmount] = useState(25);
    const [customAmount, setCustomAmount] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [loading, setLoading] = useState(false);

    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

    const handleDonate = async () => {
        setLoading(true);
        // Simulation of Stripe Checkout Redirect
        setTimeout(() => {
            setLoading(false);
            alert(`Stripe Checkout Redirecting... Amount: $${finalAmount} | Type: ${isRecurring ? 'Monthly' : 'One-time'}`);
        }, 1500);
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
                        <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-skeu-sm">
                            <Heart size={40} fill="currentColor" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-4">
                            Support Our <span className="text-primary">Mission</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                            Your tax-deductible donation directly funds community uplifting programs across South India. Join us in making a lasting impact.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Donation App UI */}
            <Section className="pt-0 pb-32">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-12 items-start">

                        {/* Left Column: Form */}
                        <div className="flex-1 w-full order-2 lg:order-1">
                            <SkeuCard className="p-8 md:p-12" hover={false}>
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                    <h2 className="text-2xl font-bold text-slate-800">Select Donation</h2>
                                    <div className="flex bg-cream-dark/30 p-1 rounded-xl shadow-inner">
                                        <button
                                            onClick={() => setIsRecurring(false)}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!isRecurring ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                        >
                                            One-time
                                        </button>
                                        <button
                                            onClick={() => setIsRecurring(true)}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isRecurring ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                        >
                                            Monthly
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    {donationTiers.map((tier) => (
                                        <button
                                            key={tier.amount}
                                            onClick={() => {
                                                setSelectedAmount(tier.amount);
                                                setCustomAmount("");
                                            }}
                                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all shadow-skeu-sm ${selectedAmount === tier.amount && !customAmount
                                                    ? "border-primary bg-primary/5 shadow-skeu-pressed-sm translate-y-px"
                                                    : "border-transparent bg-cream hover:bg-slate-50"
                                                }`}
                                        >
                                            <span className="text-2xl font-black text-slate-800">${tier.amount}</span>
                                            <span className="text-xs text-slate-500 font-bold uppercase mt-1">One-time</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mb-10">
                                    <label className="block text-sm font-bold text-slate-700 mb-3">Custom Donation Amount ($)</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
                                        <input
                                            type="number"
                                            placeholder="Enter amount"
                                            className="w-full pl-12 pr-6 py-5 bg-cream-dark/20 rounded-2xl border-2 border-transparent focus:border-primary/30 focus:bg-white text-2xl font-bold text-slate-800 transition-all shadow-inner outline-none"
                                            value={customAmount}
                                            onChange={(e) => {
                                                setCustomAmount(e.target.value);
                                                setSelectedAmount(null);
                                            }}
                                        />
                                    </div>
                                </div>

                                <SkeuButton
                                    variant="primary"
                                    className="w-full py-6 text-xl shadow-skeu font-bold"
                                    onClick={handleDonate}
                                    disabled={loading || (!selectedAmount && !customAmount)}
                                >
                                    {loading ? "Processing..." : `Donate $${finalAmount || 0} ${isRecurring ? '/ Month' : 'Now'}`}
                                </SkeuButton>

                                <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-60">
                                    <div className="flex items-center gap-2 grayscale"><CreditCard size={20} /> <span className="text-xs font-bold uppercase">Secured by Stripe</span></div>
                                    <div className="flex items-center gap-2 grayscale"><Apple size={20} /> <span className="text-xs font-bold uppercase">Apple Pay Ready</span></div>
                                    <div className="flex items-center gap-2 grayscale"><Store size={20} /> <span className="text-xs font-bold uppercase">Google Pay</span></div>
                                </div>
                            </SkeuCard>

                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SkeuCard className="p-6 border-l-4 border-emerald-500" hover={false}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <CheckCircle2 size={24} className="text-emerald-500" />
                                        <h3 className="font-bold text-slate-800 text-lg">Tax Deductible</h3>
                                    </div>
                                    <p className="text-sm text-slate-500">We are a registered 501(c)(3) nonprofit. Your donation is fully tax-deductible under US law.</p>
                                </SkeuCard>
                                <SkeuCard className="p-6 border-l-4 border-primary" hover={false}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <HelpCircle size={24} className="text-primary" />
                                        <h3 className="font-bold text-slate-800 text-lg">Need Assistance?</h3>
                                    </div>
                                    <p className="text-sm text-slate-500">For donation-related inquiries or corporate matches, email us at accounts@trustngo.org</p>
                                </SkeuCard>
                            </div>
                        </div>

                        {/* Right Column: Impact Info */}
                        <div className="w-full lg:w-96 order-1 lg:order-2">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Where your money goes</h3>
                            <div className="space-y-6">
                                {donationTiers.map((tier) => (
                                    <div key={tier.amount} className="flex gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-white shadow-skeu-sm flex items-center justify-center shrink-0 text-primary font-bold group-hover:bg-primary group-hover:text-white transition-all">
                                            ${tier.amount}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{tier.label}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">{tier.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 bg-primary/10 rounded-2xl p-8 border border-primary/20">
                                <blockquote className="italic text-slate-700 mb-6 leading-relaxed relative">
                                    <span className="absolute -top-4 -left-2 text-4xl text-primary/20 font-serif">"</span>
                                    The scholarship provided by the trust didn't just pay my fees; it gave my family hope for a better future.
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="donor" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Rahul S.</p>
                                        <p className="text-xs text-slate-500">Sponsorship Beneficiary</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </Section>
        </div>
    );
}
