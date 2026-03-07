import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function SkeuButton({
    children,
    variant = "primary",
    className,
    ...props
}) {
    const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all shadow-skeu-sm hover:shadow-skeu active:shadow-skeu-pressed-sm flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        outline: "bg-cream text-primary border border-primary/20",
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 2 }}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
}
