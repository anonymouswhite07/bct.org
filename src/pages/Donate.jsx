import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { Heart, Upload, AlertCircle, Smartphone, Camera, CheckCircle2, QrCode } from "lucide-react";

const donationTiers = [
    { amount: 500, label: "Meals", description: "Feeds homeless families." },
    { amount: 1000, label: "Education", description: "Helps student schooling." },
    { amount: 2000, label: "Medical", description: "Funds rural health camps." },
];

export default function Donate() {
    const navigate = useNavigate();
    const [selectedAmount, setSelectedAmount] = useState(1000);
    const [customAmount, setCustomAmount] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    
    // Payment Proof Form State
    const [showProofForm, setShowProofForm] = useState(false);
    const [donorName, setDonorName] = useState("");
    const [screenshot, setScreenshot] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    // Set UPI Details from Environment Variables
    const upiId = import.meta.env.VITE_UPI_ID || "trustname@upi";
    const payeeName = import.meta.env.VITE_UPI_PAYEE_NAME || "TrustName";
    const upiLink = finalAmount > 0 
        ? `upi://pay?pa=${upiId}&pn=${payeeName}&am=${finalAmount}&cu=INR&tn=Donation` 
        : "";

    // Feature Detection for UPI App Redirection vs QR Code
    useEffect(() => {
        const checkDevice = () => {
            const mobileDetect = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            setIsMobile(mobileDetect);
        };
        checkDevice();
    }, []);

    const handlePay = () => {
        if (!finalAmount || finalAmount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        setError(null);
        
        // Use anchor click method for more reliable deep linking
        const link = document.createElement("a");
        link.href = upiLink;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Fallback message if app fails to bind
        setTimeout(() => {
            alert("If your payment app did not open, please use the QR code below.");
        }, 2000);
        
        // Expose proof form after clicking pay
        setTimeout(() => setShowProofForm(true), 1500);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setScreenshot(e.target.files[0]);
        }
    };

    const handleSubmitProof = async (e) => {
        e.preventDefault();
        
        if (!donorName || !screenshot) {
            setError("Please provide your name and upload a screenshot.");
            return;
        }

        setLoading(true);
        setError(null);

        // Here you would upload to Firebase/Supabase/Cloudinary if backend existed.
        const mockSubmission = {
            name: donorName,
            amount: finalAmount,
            fileName: screenshot.name,
            date: new Date().toISOString()
        };
        console.log("Saving Donation Proof:", mockSubmission);

        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        navigate("/thank-you");
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="w-full bg-cream min-h-screen">
            <section className="relative w-full pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 bg-cream overflow-hidden">
                <Container className="text-center max-w-3xl mx-auto">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-skeu-sm">
                            <Heart size={36} fill="currentColor" />
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
                            Support Our <span className="text-primary">Mission</span>
                        </h1>
                        <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
                            Direct, secure UPI transfer. No payment gateways, 100% of your donation reaches the community.
                        </p>
                    </motion.div>
                </Container>
            </section>

            <Section className="pt-0 pb-20 sm:pb-32">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        
                        {/* Process Column */}
                        <div className="flex-1 w-full order-2 lg:order-1">
                            
                            {/* 1. AMOUNT SELECTION */}
                            <SkeuCard className="p-6 sm:p-8 mb-8" hover={false}>
                                <h2 className="text-xl font-bold text-slate-800 mb-6">1. Select Donation Amount</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                    {donationTiers.map((tier) => (
                                        <button
                                            key={tier.amount}
                                            onClick={() => {
                                                setSelectedAmount(tier.amount);
                                                setCustomAmount("");
                                                setError(null);
                                            }}
                                            className={`p-4 rounded-2xl border-2 transition-all shadow-skeu-sm ${selectedAmount === tier.amount && !customAmount
                                                ? "border-primary bg-primary/5 shadow-skeu-pressed-sm translate-y-px"
                                                : "border-transparent bg-cream hover:bg-slate-50"
                                            }`}
                                        >
                                            <span className="text-xl font-black text-slate-800">₹{tier.amount}</span>
                                        </button>
                                    ))}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Custom Amount (₹)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Enter donation amount"
                                        value={customAmount}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value);
                                            setSelectedAmount(null);
                                            setError(null);
                                        }}
                                        className="w-full px-4 py-4 bg-cream-dark/20 rounded-2xl border-2 border-transparent focus:border-primary/30 focus:bg-white text-xl font-bold text-slate-800 shadow-inner outline-none"
                                    />
                                </div>
                                {error && (
                                    <div className="mt-4 flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700">
                                        <AlertCircle size={20} />
                                        <p className="text-sm font-medium">{error}</p>
                                    </div>
                                )}
                            </SkeuCard>

                            {/* 2. PAYMENT */}
                            <SkeuCard className="p-6 sm:p-8 text-center" hover={false}>
                                <h2 className="text-xl font-bold text-slate-800 mb-2">2. Complete Payment</h2>
                                
                                <p className="text-slate-600 mb-6">
                                    {isMobile 
                                        ? "For mobile: Tap your preferred app below. Your device will prompt available UPI apps." 
                                        : "For desktop: Scan QR using your phone."}
                                </p>

                                {finalAmount > 0 ? (
                                    <div className="flex flex-col items-center w-full">
                                        
                                        {/* Dynamic UI depending strictly on device UserAgent */}
                                        {isMobile ? (
                                            <div className="w-full">
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <SkeuButton variant="outline" className="flex flex-col items-center justify-center py-4 gap-2 border-2 border-slate-100 bg-white hover:border-blue-500" onClick={handlePay}>
                                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl shadow-inner">G</div>
                                                        <span className="font-bold text-slate-700">Google Pay</span>
                                                    </SkeuButton>
                                                    <SkeuButton variant="outline" className="flex flex-col items-center justify-center py-4 gap-2 border-2 border-slate-100 bg-white hover:border-purple-600" onClick={handlePay}>
                                                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xl shadow-inner">Pe</div>
                                                        <span className="font-bold text-slate-700">PhonePe</span>
                                                    </SkeuButton>
                                                    <SkeuButton variant="outline" className="flex flex-col items-center justify-center py-4 gap-2 border-2 border-slate-100 bg-white hover:border-sky-500" onClick={handlePay}>
                                                        <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 font-bold text-xl shadow-inner">Pay</div>
                                                        <span className="font-bold text-slate-700">Paytm</span>
                                                    </SkeuButton>
                                                    <div className="flex flex-col items-center justify-center py-4 gap-2 border-2 border-slate-100 bg-slate-50 rounded-2xl opacity-50 cursor-not-allowed">
                                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl shadow-inner">P</div>
                                                        <span className="font-bold text-slate-500 flex flex-col items-center leading-tight">PayPal <span className="text-[10px] uppercase tracking-wider mt-0.5">Soon</span></span>
                                                    </div>
                                                </div>
                                                
                                                {/* Fallback QR Code for Mobile */}
                                                <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center">
                                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Fallback Option</p>
                                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                                        <QRCodeSVG value={upiLink} size={140} level="M" fgColor="#1e293b" />
                                                    </div>
                                                    <p className="text-xs font-semibold text-slate-500 mt-3 text-center px-4">
                                                        If buttons fail, take a screenshot of this QR and upload it in your UPI app's scanner.
                                                    </p>
                                                    <SkeuButton variant="outline" className="mt-4 w-full text-sm font-bold" onClick={() => setShowProofForm(true)}>
                                                        I have scanned & paid
                                                    </SkeuButton>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-skeu-sm border-2 border-primary/20 mt-2">
                                                <QRCodeSVG 
                                                    value={upiLink} 
                                                    size={220}
                                                    level="M"
                                                    fgColor="#1e293b" 
                                                />
                                                <p className="mt-6 text-slate-700 font-semibold flex items-center justify-center gap-2 text-center w-full">
                                                    <QrCode size={18} className="shrink-0" />
                                                    Scan this QR using your UPI app to complete payment.
                                                </p>
                                                
                                                {/* Trust Logos */}
                                                <div className="flex gap-3 justify-center mt-6 pt-5 border-t border-slate-100 w-full opacity-80">
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm shadow-sm ring-1 ring-slate-100/50">G</div>
                                                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 font-bold flex items-center justify-center text-sm shadow-sm ring-1 ring-slate-100/50">Pe</div>
                                                    <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-500 font-bold flex items-center justify-center text-sm shadow-sm ring-1 ring-slate-100/50">Pay</div>
                                                    <div className="h-8 px-3 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-xs shadow-sm ring-1 ring-slate-100/50">UPI</div>
                                                </div>

                                                <SkeuButton 
                                                    variant="outline" 
                                                    className="mt-6 w-full font-bold"
                                                    onClick={() => setShowProofForm(true)}
                                                >
                                                    I have scanned & paid
                                                </SkeuButton>
                                            </div>
                                        )}
                                        
                                    </div>
                                ) : (
                                    <p className="text-slate-400 italic">Please enter an amount above to proceed.</p>
                                )}
                            </SkeuCard>

                            {/* 3. VERIFICATION (Appears after Pay button click or "scanned" button) */}
                            {showProofForm && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-8">
                                    <SkeuCard className="p-6 sm:p-8 border-t-4 border-emerald-500" hover={false}>
                                        <h2 className="text-xl font-bold text-slate-800 mb-3">3. Verification</h2>
                                        <p className="text-slate-600 mb-6 font-medium">Upload payment screenshot for verification.</p>
                                        
                                        <form onSubmit={handleSubmitProof} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    required
                                                    value={donorName}
                                                    onChange={(e) => setDonorName(e.target.value)}
                                                    placeholder="Enter your name" 
                                                    className="w-full px-4 py-4 bg-cream-dark/20 rounded-xl outline-none border focus:border-emerald-400 focus:bg-white shadow-inner" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Amount Paid (₹)</label>
                                                <input 
                                                    type="number" 
                                                    value={finalAmount}
                                                    disabled
                                                    className="w-full px-4 py-4 bg-slate-100/50 rounded-xl text-slate-500 font-bold outline-none cursor-not-allowed border" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Payment Screenshot</label>
                                                <div 
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="w-full border-2 border-dashed border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50 rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center"
                                                >
                                                    <input 
                                                        type="file" 
                                                        ref={fileInputRef} 
                                                        onChange={handleFileChange} 
                                                        accept="image/*" 
                                                        className="hidden" 
                                                    />
                                                    {screenshot ? (
                                                        <div className="text-emerald-700 flex flex-col items-center">
                                                            <CheckCircle2 size={32} className="mb-2 text-emerald-500" />
                                                            <span className="font-semibold">{screenshot.name}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="text-emerald-600 flex flex-col items-center">
                                                            <Camera size={36} className="mb-3 opacity-80" />
                                                            <span className="font-semibold mb-1">Upload Receipt</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <SkeuButton type="submit" variant="primary" className="w-full py-5 text-lg" disabled={loading}>
                                                {loading ? "Submitting..." : <><Upload size={20} className="inline mr-2" /> Submit Payment Proof</>}
                                            </SkeuButton>
                                        </form>
                                    </SkeuCard>
                                </motion.div>
                            )}

                        </div>

                        {/* Impact Info Column */}
                        <div className="w-full lg:w-80 order-1 lg:order-2 shrink-0">
                            <SkeuCard hover={false} className="p-6 bg-slate-50 border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-4 pb-3 border-b border-slate-200">Impact</h3>
                                <div className="space-y-5">
                                    {donationTiers.map((tier) => (
                                        <div key={tier.amount} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary text-xs font-bold">
                                                ₹{tier.amount}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm">{tier.label}</h4>
                                                <p className="text-xs text-slate-500">{tier.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SkeuCard>
                        </div>

                    </div>
                </Container>
            </Section>
        </div>
    );
}
