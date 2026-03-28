import { useState } from "react";
import { SkeuCard } from "./SkeuCard";
import { Linkedin, Mail } from "lucide-react";

export function TeamCard({ name, role, description, imageUrl }) {
    const [imgError, setImgError] = useState(false);

    // Generate initials from name for fallback
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <SkeuCard className="flex flex-col h-full text-center overflow-hidden !p-0">
            <div className="aspect-square relative overflow-hidden bg-cream-dark/50">
                {!imgError && imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={`${name} - ${role}`}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                        onError={() => setImgError(true)}
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                        <span className="text-5xl sm:text-6xl font-black text-primary/60">{initials}</span>
                    </div>
                )}
            </div>
            <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">{name}</h3>
                <p className="text-primary font-medium text-sm sm:text-base mb-3 sm:mb-4">{role}</p>
                <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 flex-grow">{description}</p>
                <div className="flex justify-center gap-4 mt-auto">
                    <a href="#" className="w-10 h-10 rounded-full bg-cream-dark/50 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-slate-600">
                        <Linkedin size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-cream-dark/50 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-slate-600">
                        <Mail size={18} />
                    </a>
                </div>
            </div>
        </SkeuCard>
    );
}
