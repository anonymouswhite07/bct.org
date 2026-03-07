import { SkeuCard } from "./SkeuCard";
import { cn } from "../../utils/cn";

export function StatCard({ number, label, className }) {
    return (
        <SkeuCard
            className={cn("flex flex-col items-center justify-center text-center p-8", className)}
            hover={true}
        >
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 drop-shadow-sm">
                {number}
            </div>
            <div className="text-lg font-medium text-slate-600">
                {label}
            </div>
        </SkeuCard>
    );
}
