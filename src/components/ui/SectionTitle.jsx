import { cn } from "../../utils/cn";

export function SectionTitle({ title, subtitle, className }) {
    return (
        <div className={cn("mb-12 text-center", className)}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 inline-block relative">
                {title}
                <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-secondary rounded-full shadow-skeu-sm"></div>
            </h2>
            {subtitle && (
                <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-lg">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
