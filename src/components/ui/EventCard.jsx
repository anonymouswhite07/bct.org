import { SkeuCard } from "./SkeuCard";
import { SkeuButton } from "./SkeuButton";
import { Calendar, MapPin } from "lucide-react";

export function EventCard({ title, date, location, description, link = "#" }) {
    return (
        <SkeuCard className="flex flex-col h-full overflow-hidden !p-0">
            <div className="bg-primary/10 p-6 border-b border-primary/5">
                <h3 className="text-xl font-bold text-slate-800 line-clamp-2 min-h-[56px]">{title}</h3>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-600 mb-3 text-sm">
                    <Calendar size={16} className="text-primary" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 mb-4 text-sm">
                    <MapPin size={16} className="text-secondary" />
                    <span>{location}</span>
                </div>
                <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {description}
                </p>
                <SkeuButton variant="primary" className="w-full mt-auto" onClick={() => window.location.href = link}>
                    Register Now
                </SkeuButton>
            </div>
        </SkeuCard>
    );
}
