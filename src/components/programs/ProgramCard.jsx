import { SkeuCard } from "../ui/SkeuCard";
import { SkeuButton } from "../ui/SkeuButton";
import { ArrowRight, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export function ProgramCard({ id, icon: Icon, image, title, description, impact }) {
    return (
        <SkeuCard className="flex flex-col h-full !p-0 overflow-hidden group">
            <div className="relative h-48 overflow-hidden bg-cream-dark/50">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary">
                        {Icon && <Icon size={64} opacity={0.2} />}
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm p-2 rounded-full shadow-skeu-sm">
                    {Icon && <Icon size={24} className="text-primary" />}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
                <p className="text-slate-600 mb-5 flex-grow line-clamp-3 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-700 bg-primary/10 py-2 px-3 rounded-lg w-full">
                    <Activity size={16} className="text-primary shrink-0" />
                    <span className="truncate">{impact}</span>
                </div>

                <Link to={`/programs/${id}`}>
                    <SkeuButton variant="outline" className="w-full justify-between items-center group-hover:bg-primary group-hover:text-white transition-all">
                        <span>Learn More</span>
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </SkeuButton>
                </Link>
            </div>
        </SkeuCard>
    );
}
