import { SkeuCard } from "./SkeuCard";
import { SkeuButton } from "./SkeuButton";
import { ArrowRight } from "lucide-react";

export function ProgramCard({ icon: Icon, title, description, link = "#" }) {
    return (
        <SkeuCard className="flex flex-col h-full">
            <div className="w-14 h-14 bg-cream-dark rounded-full flex items-center justify-center text-primary mb-6 shadow-skeu-sm">
                {Icon && <Icon size={28} strokeWidth={2.5} />}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
            <p className="text-slate-600 mb-6 flex-grow">{description}</p>
            <div className="mt-auto">
                <SkeuButton variant="outline" className="w-full justify-between group" onClick={() => window.location.href = link}>
                    <span>Learn More</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </SkeuButton>
            </div>
        </SkeuCard>
    );
}
