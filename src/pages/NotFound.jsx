import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";
import { SkeuButton } from "../components/ui/SkeuButton";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] bg-cream flex flex-col items-center justify-center p-6 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-lg w-full bg-white/40 backdrop-blur-sm border border-slate-200 rounded-3xl p-10 md:p-14 shadow-skeu relative overflow-hidden"
            >
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
                        <AlertCircle size={48} strokeWidth={2.5} />
                    </div>
                    
                    <h1 className="text-8xl md:text-9xl font-extrabold text-slate-800 tracking-tighter shadow-sm mb-4">
                        404
                    </h1>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-4">
                        Page Not Found
                    </h2>
                    
                    <p className="text-slate-500 mb-10 text-lg leading-relaxed max-w-sm mx-auto">
                        We couldn't locate the page you're searching for. It might have been moved or permanently deleted.
                    </p>
                    
                    <Link to="/" className="inline-block w-full sm:w-auto">
                        <SkeuButton variant="primary" className="w-full sm:min-w-[200px] flex items-center justify-center gap-3 py-4 text-base font-bold shadow-skeu">
                            <Home size={20} />
                            Return to Homepage
                        </SkeuButton>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
