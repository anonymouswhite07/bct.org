import { BookOpen, Stethoscope, Utensils, Users, Wrench, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";

// Static data removed to allow full CMS control. 
// Any new programs should be added via the Admin Dashboard.
export const staticProgramsData = [];

// Bridge function now prioritizes live data
export const getProgramsData = async () => {
    try {
        const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        // Map database fields to frontend expectations if necessary
        return data.map(p => ({
            ...p,
            id: p.id,
            title: p.title,
            category: p.category,
            image: p.image,
            description: p.description,
            longDescription: p.longDescription,
            impact: p.impact,
            objectives: p.objectives ? (Array.isArray(p.objectives) ? p.objectives : p.objectives.split('\n')) : []
        }));
    } catch (err) {
        console.error("Error fetching programs from Supabase:", err);
        return [];
    }
};

export const programCategories = ["All Programs", "Education", "Health", "Community", "Women Empowerment"];
