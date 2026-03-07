import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { PartyPopper, CheckCircle2, Share2, Download } from "lucide-react";

export default function ThankYou() {
    const [searchParams] = useSearchParams();
    const amount = searchParams.get("amount") || "25";
    const transactionId = searchParams.get("t_id") || "txn_7355608";
    const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const fadeIn = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="w-full bg-cream min-h-screen pt-20 pb-32">
            <Container className="max-w-2xl mx-auto">
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                    <SkeuCard className="p-12 md:p-16 text-center shadow-xl" hover={false}>
                        <div className="w-24 h-24 bg-rose-100 flex items-center justify-center rounded-full mx-auto mb-8 shadow-skeu-sm text-rose-500">
                            <PartyPopper size={48} />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
                            Thank You!
                        </h1>

                        <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
                            Your generous contribution of <span className="font-bold text-slate-800">${amount}</span> has been successfully processed. You are helping us build a more equitable world.
                        </p>

                        <div className="bg-primary/5 rounded-2xl p-8 mb-10 border border-primary/10 text-left space-y-4">
                            <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Transaction ID</span>
                                <span className="text-lg font-mono text-slate-800">{transactionId}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Date</span>
                                <span className="text-lg font-bold text-slate-800">{date}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Status</span>
                                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                                    <CheckCircle2 size={18} />
                                    <span>Successful</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <SkeuButton variant="primary" className="flex-1 py-4 text-lg">
                                <Download size={20} className="mr-2" /> Download Tax Receipt
                            </SkeuButton>
                            <SkeuButton variant="outline" className="flex-1 py-4 text-lg">
                                <Share2 size={20} className="mr-2" /> Share Impact
                            </SkeuButton>
                        </div>

                        <div className="mt-12">
                            <Link to="/">
                                <SkeuButton variant="outline" className="w-full">Back to Home</SkeuButton>
                            </Link>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 text-sm text-slate-500">
                            <p>A confirmation email with your official tax receipt has been sent to your email address. Our Tax ID: 12-3456789</p>
                        </div>
                    </SkeuCard>
                </motion.div>
            </Container>
        </div>
    );
}
