import { motion } from "framer-motion";

export function PageContainer({ children, className = "" }) {
    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-8 ${className}`}
        >
            {children}
        </motion.main>
    );
}
