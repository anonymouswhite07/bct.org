import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { Heart, Home, ArrowRight, ShieldCheck } from "lucide-react";

export default function ThankYou() {
    const navigate = useNavigate();

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="w-full bg-cream min-h-screen flex items-center justify-center px-4 py-16">
            <Container className="max-w-2xl mx-auto">
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                    <SkeuCard className="text-center p-8 sm:p-12 md:p-16" hover={false}>
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-emerald-200"
                        >
                            <Heart size={48} fill="currentColor" />
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
                            Payment Received!
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-600 mb-6 leading-relaxed max-w-md mx-auto">
                            Thank you for your generous donation and for submitting your payment proof.
                        </p>

                        <div className="flex items-center justify-center gap-2 mb-10 p-4 bg-emerald-50 rounded-xl max-w-sm mx-auto border border-emerald-200 text-emerald-700">
                            <ShieldCheck size={20} className="shrink-0" />
                            <p className="text-sm font-medium">Your submission is being reviewed by our team.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <SkeuButton
                                variant="primary"
                                className="w-full sm:w-auto px-8 py-4 text-lg font-bold"
                                onClick={() => navigate("/")}
                            >
                                <Home size={20} className="mr-2" />
                                Back to Home
                            </SkeuButton>
                            <SkeuButton
                                variant="outline"
                                className="w-full sm:w-auto px-8 py-4 text-lg font-bold bg-white"
                                onClick={() => navigate("/programs")}
                            >
                                Our Programs
                                <ArrowRight size={18} className="ml-2" />
                            </SkeuButton>
                        </div>

                    </SkeuCard>
                </motion.div>
            </Container>
        </div>
    );
}
