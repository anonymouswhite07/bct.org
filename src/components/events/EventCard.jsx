import { SkeuCard } from "../ui/SkeuCard";
import { SkeuButton } from "../ui/SkeuButton";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function EventCard({ id, title, date, time, location, description, image, status }) {
    const isUpcoming = status === "upcoming";

    return (
        <SkeuCard className="flex flex-col h-full overflow-hidden !p-0 group">
            <div className="relative h-56 overflow-hidden bg-cream-dark/50">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold shadow-skeu-sm border">
                    {isUpcoming ? (
                        <span className="text-primary border-primary/20 bg-cream/90">Upcoming</span>
                    ) : (
                        <span className="text-slate-500 border-slate-200 bg-slate-100/90">Past Event</span>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 line-clamp-2 min-h-[64px]">{title}</h3>

                <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Calendar size={16} />
                        </div>
                        <span>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                            <Clock size={16} />
                        </div>
                        <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                            <MapPin size={16} />
                        </div>
                        <span className="truncate">{location}</span>
                    </div>
                </div>

                <p className="text-slate-600 mb-6 flex-grow line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <Link to={`/events/${id}`} className="mt-auto">
                    <SkeuButton variant={isUpcoming ? "primary" : "outline"} className="w-full shadow-skeu">
                        {isUpcoming ? "Register Now" : "View Details & Photos"}
                    </SkeuButton>
                </Link>
            </div>
        </SkeuCard>
    );
}
