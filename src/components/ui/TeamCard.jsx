import { SkeuCard } from "./SkeuCard";
import { Linkedin, Mail } from "lucide-react";

export function TeamCard({ name, role, description, imageUrl }) {
    return (
        <SkeuCard className="flex flex-col h-full text-center overflow-hidden !p-0">
            <div className="aspect-square relative overflow-hidden bg-cream-dark/50">
                <img
                    src={imageUrl}
                    alt={`${name} - ${role}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800">{name}</h3>
                <p className="text-primary font-medium mb-4">{role}</p>
                <p className="text-slate-600 mb-6 flex-grow">{description}</p>
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
