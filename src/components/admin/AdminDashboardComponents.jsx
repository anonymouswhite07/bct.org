import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { SkeuCard } from "../ui/SkeuCard";
import { SkeuButton } from "../ui/SkeuButton";
import { 
    LayoutDashboard, Users, Image as ImageIcon, CalendarDays, 
    LogOut, Loader2, UploadCloud, Trash, Heart, Download, Maximize2, AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staticEvents, galleryCategories } from "../../data/events";
import { programCategories, staticProgramsData } from "../../data/programs";
import { GalleryUpload } from "../GalleryUpload";
import { supabase } from "../../lib/supabase";

// Reusable Components inside Admin Dashboard structure to simulate complex CMS.
export function DashboardLayout({ children }) {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "programs", label: "Manage Programs", icon: Users },
        { id: "events", label: "Manage Events", icon: CalendarDays },
        { id: "gallery", label: "Manage Gallery", icon: ImageIcon },
        { id: "donations", label: "Manage Donations", icon: Heart },
    ];

    return (
        <div className="min-h-screen flex bg-cream">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-slate-800 text-cream fixed h-full flex flex-col z-20 shadow-xl overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Barthimaeu Admin</h2>
                    <p className="text-slate-400 text-sm">Content Management System</p>
                </div>

                <nav className="flex-1 mt-6">
                    <ul className="space-y-2 px-4">
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                        ? "bg-primary text-white font-medium shadow-skeu-sm"
                                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                        }`}
                                >
                                    <tab.icon size={20} />
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 mt-auto border-t border-slate-700">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        Logout Securely
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen w-full relative z-0">
                <div className="max-w-6xl mx-auto pb-24">
                    <AnimatePresence mode="wait">
                        {activeTab === "overview" && (
                            <motion.div key="overview" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                <OverviewPanel />
                            </motion.div>
                        )}
                        {activeTab === "gallery" && (
                            <motion.div key="gallery" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                <GalleryManager />
                            </motion.div>
                        )}
                        {activeTab === "events" && (
                            <motion.div key="events" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                <EventManager />
                            </motion.div>
                        )}
                        {activeTab === "programs" && (
                            <motion.div key="programs" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                <ProgramManager />
                            </motion.div>
                        )}
                        {activeTab === "donations" && (
                            <motion.div key="donations" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                <DonationManager />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

// ----------------------------------------------------
// Sub-panels
// ----------------------------------------------------

function OverviewPanel() {
    const [stats, setStats] = useState({ programs: 0, events: 0, gallery: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const { count: progCount } = await supabase.from('programs').select('*', { count: 'exact', head: true });
            const { count: evCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
            const { count: galleryCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true });
            
            setStats({
                programs: (progCount || 0) + staticProgramsData.length,
                events: (evCount || 0) + staticEvents.length,
                gallery: (galleryCount || 0) + 15 // Approx static ones
            });
            setLoading(false);
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2">Welcome back, Admin. Here are the latest website metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SkeuCard className="p-6 border-t-4 border-primary/50" hover={false}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{loading ? '...' : stats.programs}</p>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Active Programs</p>
                        </div>
                    </div>
                </SkeuCard>

                <SkeuCard className="p-6 border-t-4 border-secondary/50" hover={false}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                            <CalendarDays size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{loading ? '...' : stats.events}</p>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Total Events</p>
                        </div>
                    </div>
                </SkeuCard>

                <SkeuCard className="p-6 border-t-4 border-emerald-500/50" hover={false}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600">
                            <ImageIcon size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{loading ? '...' : stats.gallery}</p>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Gallery Photos</p>
                        </div>
                    </div>
                </SkeuCard>

                <SkeuCard className="p-6 border-t-4 border-rose-500/50" hover={false}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-600">
                            <Heart size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">4,200+</p>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Reg. Volunteers</p>
                        </div>
                    </div>
                </SkeuCard>
            </div>

            <div className="mt-12 bg-white/50 border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
                <p className="text-slate-600 mb-8 max-w-xl">
                    Use the navigation links on the left to upload new events, modify community programs, and publish Cloudinary-synched media immediately into production.
                </p>
                <SkeuButton variant="primary" onClick={() => window.location.href = '/'}>Return to Live Website</SkeuButton>
            </div>
        </div>
    );
}


function GalleryManager() {
    const [liveGallery, setLiveGallery] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSupabaseGallery = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("gallery")
            .select("*")
            .order("created_at", { ascending: false });
        
        if (!error && data) {
            setLiveGallery(data.map(item => ({ id: item.id, url: item.image_url })));
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSupabaseGallery();
    }, []);

    const handleUploadComplete = (url) => {
        // Just refresh the data, the upload component already saved to supabase
        fetchSupabaseGallery();
    };

    const handleDelete = async (url, id) => {
        if (window.confirm("Permanent: Delete photo from cloud databases?")) {
            if (id) {
                await supabase.from("gallery").delete().eq("id", id);
            }
            // Optimistic rendering
            setLiveGallery(liveGallery.filter(i => i.url !== url));
            fetchSupabaseGallery();
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Gallery Manager</h1>
                <p className="text-slate-500 mt-2">Manage your Cloudinary media library remotely backed by Supabase.</p>
            </div>

            <GalleryUpload onUploadSuccess={handleUploadComplete} />

            <div className="flex justify-between items-center mt-12 mb-6">
                <h3 className="text-xl font-bold text-slate-800">Uploaded Photos</h3>
                <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">{liveGallery.length} Cloud Images</span>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center items-center">
                    <Loader2 size={32} className="text-primary animate-spin" />
                </div>
            ) : liveGallery.length === 0 ? (
                <div className="py-20 text-center bg-white/50 border border-dashed border-slate-300 rounded-3xl">
                    <p className="text-slate-400">No live uploads found yet. Use the tool above to start your gallery.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {liveGallery.map((image, i) => (
                        <div key={i} className="relative aspect-square group rounded-xl overflow-hidden shadow-sm border border-slate-100">
                            <img src={image.url} alt="live gallery" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <button 
                                    onClick={() => handleDelete(image.url, image.id)}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-primary/80 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-white rounded-md uppercase tracking-widest">
                                Live ({image.id ? image.id.substring(0,4) : 'url'})
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function EventManager() {
    const [events, setEvents] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", category: "Community", status: "upcoming", description: "" });

    const fetchEvents = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            setEvents(data);
        } else {
            setEvents([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('events')
            .insert([{
                ...newEvent
            }]);
        
        if (error) {
            console.error("Error saving event:", error);
            alert("Failed to save event to database.");
        } else {
            fetchEvents();
            setIsAdding(false);
            setNewEvent({ title: "", date: "", location: "", category: "Community", status: "upcoming", description: "" });
        }
    };

    const handleDelete = async (id) => {
        if (!id.toString().startsWith('event_')) { // Don't delete static ones
            if (window.confirm("Archive this live event?")) {
                const { error } = await supabase.from('events').delete().eq('id', id);
                if (error) console.error(error);
                fetchEvents();
            }
        } else {
            alert("Cannot delete system-defined events.");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Event Manager</h1>
                    <p className="text-slate-500 mt-2">Create and manage upcoming community drives.</p>
                </div>
                {!isAdding && (
                    <SkeuButton variant="primary" onClick={() => setIsAdding(true)}>
                        + Create New Event
                    </SkeuButton>
                )}
            </div>

            {isAdding && (
                <SkeuCard className="p-8 border-2 border-primary/20 bg-primary/5">
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Event Title</label>
                                <input 
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner"
                                    value={newEvent.title}
                                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                                    placeholder="e.g. Free Eye Checkup Camp"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Date</label>
                                <input 
                                    required
                                    type="date"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner"
                                    value={newEvent.date}
                                    onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Location</label>
                                <input 
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner"
                                    value={newEvent.location}
                                    onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                                    placeholder="e.g. Salem Primary School"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Category</label>
                                    <select 
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner"
                                        value={newEvent.category}
                                        onChange={e => setNewEvent({...newEvent, category: e.target.value})}
                                    >
                                        {galleryCategories.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Status</label>
                                    <select 
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner"
                                        value={newEvent.status}
                                        onChange={e => setNewEvent({...newEvent, status: e.target.value})}
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="past">Past</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Short Description</label>
                            <textarea 
                                required
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner resize-none"
                                value={newEvent.description}
                                onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                                placeholder="Describe the purpose of this event..."
                            />
                        </div>
                        <div className="flex gap-4">
                            <SkeuButton type="submit" variant="primary">Publish Event</SkeuButton>
                            <SkeuButton type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</SkeuButton>
                        </div>
                    </form>
                </SkeuCard>
            )}

            <SkeuCard hover={false} className="p-0 overflow-hidden border border-slate-200 font-sans shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-tight">Event Title</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-tight">Date</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-tight">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-tight text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-slate-800">{event.title}</p>
                                    <p className="text-xs text-slate-500">{event.location}</p>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap">
                                    {new Date(event.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${event.status === "upcoming" ? "bg-green-100 text-green-700 border border-green-200" : "bg-slate-100 text-slate-600 border border-slate-200"
                                        }`}>
                                        {event.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        className="text-red-400 hover:text-red-600 p-2" 
                                        onClick={() => handleDelete(event.id)}
                                        title="Delete Event"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </SkeuCard>
        </div>
    );
}

function ProgramManager() {
    const [programs, setPrograms] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [newProgram, setNewProgram] = useState({ 
        title: "", category: "Community", description: "", longDescription: "", impact: "", objectives: "", imageFile: null 
    });

    const fetchPrograms = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            setPrograms(data.map(p => ({
                ...p,
                id: p.id,
                title: p.title,
                category: p.category,
                image: p.image,
                description: p.description,
                longDescription: p.longDescription,
                impact: p.impact,
                objectives: p.objectives ? (Array.isArray(p.objectives) ? p.objectives : p.objectives.split('\n')) : []
            })));
        } else {
            setPrograms([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setUploading(true);
        let imageUrl = "https://images.unsplash.com/photo-1593113563332-e1e1ba1f2214?q=80&w=600&auto=format&fit=crop";

        if (newProgram.imageFile) {
            try {
                const formData = new FormData();
                formData.append("file", newProgram.imageFile);
                formData.append("upload_preset", "trust_upload");
                formData.append("folder", "trust-programs");

                const response = await fetch("https://api.cloudinary.com/v1_1/dcxaldazg/image/upload", {
                    method: "POST",
                    body: formData,
                });
                
                if (response.ok) {
                    const data = await response.json();
                    imageUrl = data.secure_url;
                } else {
                    alert("Image upload failed.");
                    setUploading(false);
                    return;
                }
            } catch (err) {
                console.error("Upload error", err);
                alert("Upload failed.");
                setUploading(false);
                return;
            }
        }

        const entry = { 
            title: newProgram.title,
            category: newProgram.category,
            description: newProgram.description,
            longDescription: newProgram.longDescription,
            impact: newProgram.impact,
            objectives: newProgram.objectives ? newProgram.objectives.split('\n').filter(o => o.trim() !== '') : [],
            image: imageUrl
        };
        
        const { error } = await supabase.from('programs').insert([entry]);

        if (error) {
            console.error("Supabase Error", error);
            alert("Database write error.");
        } else {
            fetchPrograms();
            setIsAdding(false);
            setNewProgram({ title: "", category: "Community", description: "", longDescription: "", impact: "", objectives: "", imageFile: null });
        }
        setUploading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanently archive this program? This action cannot be undone.")) {
            // Check if it's a supabase ID (string/uuid) or static (number)
            if (typeof id === 'string' || typeof id === 'number') {
                const { error } = await supabase.from('programs').delete().eq('id', id);
                if (error) {
                    console.error("Database deletion error:", error);
                    // Even if database fails (e.g. static item not in DB), we update UI optimistically
                }
                setPrograms(programs.filter(p => p.id !== id));
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Program Manager</h1>
                    <p className="text-slate-500 mt-2">Manage ongoing foundational initiatives and metrics.</p>
                </div>
                {!isAdding && (
                    <SkeuButton variant="primary" onClick={() => setIsAdding(true)}>
                        + Add New Program
                    </SkeuButton>
                )}
            </div>

            {isAdding && (
                <SkeuCard className="p-8 border-2 border-primary/20 bg-primary/5">
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Program Title</label>
                                <input 
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner"
                                    value={newProgram.title}
                                    onChange={e => setNewProgram({...newProgram, title: e.target.value})}
                                    placeholder="e.g. Village Electrification"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Category</label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner"
                                    value={newProgram.category}
                                    onChange={e => setNewProgram({...newProgram, category: e.target.value})}
                                >
                                    {programCategories.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Cover Photo (Upload)</label>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                    onChange={e => setNewProgram({...newProgram, imageFile: e.target.files[0]})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Our Impact (Short Metric)</label>
                                <input 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner"
                                    value={newProgram.impact}
                                    onChange={e => setNewProgram({...newProgram, impact: e.target.value})}
                                    placeholder="e.g. 5,000+ Students Supported"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Short Summary (Card View)</label>
                            <textarea 
                                required
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner resize-none"
                                value={newProgram.description}
                                onChange={e => setNewProgram({...newProgram, description: e.target.value})}
                                placeholder="Brief objective of the program shown on cards..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">About the Program (Full Page Details)</label>
                            <textarea 
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner resize-y"
                                value={newProgram.longDescription}
                                onChange={e => setNewProgram({...newProgram, longDescription: e.target.value})}
                                placeholder="Write the full description and history of the program here..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Key Objectives (One per line)</label>
                            <textarea 
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary shadow-inner resize-y leading-relaxed"
                                value={newProgram.objectives}
                                onChange={e => setNewProgram({...newProgram, objectives: e.target.value})}
                                placeholder="Increase local literacy.&#10;Provide daily meals.&#10;Support local businesses."
                            />
                        </div>
                        <div className="flex gap-4">
                            <SkeuButton type="submit" variant="primary" disabled={uploading}>
                                {uploading ? <div className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Uploading & Saving...</div> : "Launch Program"}
                            </SkeuButton>
                            <SkeuButton type="button" variant="outline" onClick={() => setIsAdding(false)} disabled={uploading}>Cancel</SkeuButton>
                        </div>
                    </form>
                </SkeuCard>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program) => (
                    <SkeuCard key={program.id} className="p-0 overflow-hidden flex flex-col h-full bg-white shadow-sm hover:shadow-skeu-sm" hover={false}>
                        <div className="h-40 w-full overflow-hidden relative">
                            <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-xs font-bold rounded-md shadow flex items-center gap-2">
                                {program.category}
                            </div>
                            {program.impact && (
                                <div className="absolute bottom-2 left-2 bg-primary/90 text-white px-2 py-1 text-[10px] font-bold rounded-md shadow">
                                    {program.impact}
                                </div>
                            )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-6">{program.description}</p>

                            <div className="mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                                <button className="py-2 px-4 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-colors text-sm" onClick={() => alert('Editing live program not yet implemented. Please delete and recreate.')}>
                                    Edit Mode
                                </button>
                                <button className="py-2 px-4 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-500 hover:text-white transition-colors text-sm" onClick={() => handleDelete(program.id)}>
                                    Archive
                                </button>
                            </div>
                        </div>
                    </SkeuCard>
                ))}
            </div>
        </div>
    );
}

function DonationManager() {
    const [donations, setDonations] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    const fetchDonations = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            setDonations(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Archive this record?")) {
            const { error } = await supabase.from('donations').delete().eq('id', id);
            if (error) console.error(error);
            fetchDonations();
        }
    };

    const filteredDonations = filter === "All" 
        ? donations 
        : donations.filter(d => (d.status || "Pending") === filter);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Donation Proofs</h1>
                    <div className="flex gap-4 mt-4">
                        {["All", "Pending", "Verified", "Rejected"].map(f => (
                            <button 
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                                    filter === f 
                                    ? "bg-primary text-white shadow-md scale-105" 
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <SkeuButton variant="outline" className="flex-1 flex items-center justify-center gap-2" onClick={() => window.print()}>
                        <Download size={18} /> Print Audit
                    </SkeuButton>
                </div>
            </div>

            {donations.length === 0 ? (
                <div className="py-32 text-center bg-white border border-slate-200 rounded-3xl shadow-skeu-inner">
                    <p className="text-slate-400 font-medium">No donation proofs submitted yet.</p>
                </div>
            ) : (
                <SkeuCard hover={false} className="p-0 overflow-hidden border border-slate-200 font-sans shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-tighter">Donor Details</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-tighter">Amount</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-tighter">Proof File</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-tighter text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredDonations.map((donation) => (
                                <tr key={donation.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-800">{donation.name}</p>
                                        <p className="text-[10px] text-slate-400 font-mono">{donation.date}</p>
                                    </td>
                                    <td className="px-6 py-4 font-black text-emerald-600 text-lg">
                                        ₹{donation.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        {donation.fileName && donation.fileName.startsWith('http') ? (
                                            <div className="group relative w-16 h-16 cursor-zoom-in">
                                                <img 
                                                    src={donation.fileName} 
                                                    alt="Proof" 
                                                    className="w-full h-full object-cover rounded-lg border border-slate-200 shadow-sm group-hover:scale-105 transition-transform" 
                                                />
                                                <a 
                                                    href={donation.fileName} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity"
                                                >
                                                    <Maximize2 size={16} />
                                                </a>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-slate-400 font-medium text-xs italic">
                                                <AlertCircle size={14} /> Legacy Record
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex flex-col gap-2 scale-90 origin-right">
                                            <select 
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border outline-none cursor-pointer ${
                                                    donation.status === "Verified" 
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                                        : donation.status === "Rejected"
                                                        ? "bg-red-50 text-red-700 border-red-200"
                                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                                }`}
                                                value={donation.status || "Pending"}
                                                onChange={async (e) => {
                                                    const newStatus = e.target.value;
                                                    try {
                                                        const { error } = await supabase.from('donations').update({ status: newStatus }).eq('id', donation.id);
                                                        if (error) throw error;
                                                        fetchDonations();
                                                    } catch (err) {
                                                        console.error("Status Update Failed:", err);
                                                        alert("Update Failed! Please ensure you have added the 'status' column in your Supabase SQL Editor as instructed.");
                                                    }
                                                }}
                                            >
                                                <option value="Pending">🕒 PENDING</option>
                                                <option value="Verified">✅ VERIFIED</option>
                                                <option value="Rejected">❌ REJECTED</option>
                                            </select>
                                            <button 
                                                className="text-red-400 hover:text-red-700 flex items-center justify-end gap-1 text-[10px] uppercase font-bold" 
                                                onClick={() => handleDelete(donation.id)}
                                            >
                                                <Trash size={12} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </SkeuCard>
            )}
        </div>
    );
}
