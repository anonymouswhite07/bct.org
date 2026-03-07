import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function SkeuCard({ children, className, hover = true, pressable = false, ...props }) {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            whileTap={pressable ? { scale: 0.98 } : {}}
            className={cn(
                "bg-cream rounded-2xl p-6 shadow-skeu transition-all duration-300",
                pressable && "cursor-pointer active:shadow-skeu-pressed",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
