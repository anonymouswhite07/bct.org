import { supabase } from "../lib/supabase";

// Static data removed to allow full CMS control. 
// Any new events should be added via the Admin Dashboard.
export const staticEvents = [];

// Bridge function to get all events (Supabase live)
export const getEventsData = async () => {
    try {
        const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    } catch (err) {
        console.error("Error fetching events from Supabase:", err);
        return [];
    }
};

export const galleryCategories = ["All", "Events", "Education Programs", "Medical Camps", "Food Distribution", "Volunteers", "Community", "Women Empowerment"];
