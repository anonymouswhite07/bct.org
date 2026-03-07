import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { SkeuCard } from "../ui/SkeuCard";
import { SkeuButton } from "../ui/SkeuButton";
import { LayoutDashboard, Users, Image as ImageIcon, CalendarDays, LogOut, Loader2, UploadCloud, Trash, Heart, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { eventsData, galleryData } from "../../data/events";
import { programsData, programCategories } from "../../data/programs";

// Sample Donation Data for DB simulation
const donationsData = [
    { id: "txn_001", name: "Jonathan Doe", amount: 100, date: "2026-03-05", status: "Completed", type: "One-time" },
    { id: "txn_002", name: "Sarah Miller", amount: 25, date: "2026-03-04", status: "Completed", type: "Monthly" },
    { id: "txn_003", name: "Robert Wilson", amount: 50, date: "2026-03-02", status: "Completed", type: "One-time" },
    { id: "txn_004", name: "Emily Davis", amount: 10, date: "2026-03-01", status: "Completed", type: "Monthly" },
];

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
                    <h2 className="text-2xl font-bold tracking-tight mb-2">TrustAdmin</h2>
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
                            <p className="text-2xl font-bold text-slate-800">{programsData.length}</p>
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
                            <p className="text-2xl font-bold text-slate-800">{eventsData.length}</p>
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
                            <p className="text-2xl font-bold text-slate-800">{galleryData.length}</p>
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
                <SkeuButton variant="primary" onClick={() => alert('View website mode.')}>Visit Live Website</SkeuButton>
            </div>
        </div>
    );
}

function GalleryManager() {
    const [uploading, setUploading] = useState(false);

    const handleSimulateUpload = () => {
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            alert('Mock: Imagined Cloudinary Upload Complete. Image URL generated.');
        }, 1500);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Gallery Manager</h1>
                    <p className="text-slate-500 mt-2">Upload and categorize Cloudinary images.</p>
                </div>
            </div>

            {/* Cloudinary Upload Simulator Area */}
            <SkeuCard className="border-2 border-dashed border-primary/30 p-12 text-center bg-primary/5" hover={false}>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                    <UploadCloud size={36} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Upload New Media</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Drag and drop your high-resolution event photos here. They will be uploaded and optimized automatically using our Cloudinary pipeline.
                </p>

                <div className="max-w-xl mx-auto grid grid-cols-2 gap-4 mb-8 text-left">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Image Title</label>
                        <input type="text" className="w-full px-4 py-2 bg-white rounded-lg border border-slate-200" placeholder="e.g. Winter Distribution Drive" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select className="w-full px-4 py-2 bg-white rounded-lg border border-slate-200 text-slate-700">
                            {programCategories.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <SkeuButton variant="primary" onClick={handleSimulateUpload} disabled={uploading}>
                    {uploading ? (
                        <><Loader2 className="animate-spin mr-2" size={20} /> Processing Upload...</>
                    ) : (
                        "Browse Files"
                    )}
                </SkeuButton>
            </SkeuCard>

            {/* Gallery Mock Overview */}
            <h3 className="text-xl font-bold text-slate-800 mt-12 mb-6">Recent Uploads</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryData.slice(0, 8).map((image, i) => (
                    <div key={i} className="relative aspect-square group rounded-xl overflow-hidden shadow-sm">
                        <img src={image.url} alt="mock gallery" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg">
                                <Trash size={18} />
                            </button>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 text-xs text-white rounded-md">
                            {image.category}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function EventManager() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Event Manager</h1>
                    <p className="text-slate-500 mt-2">Create, modify, or archive upcoming drives.</p>
                </div>
                <SkeuButton variant="primary" onClick={() => alert('Mock Create New Event interface triggered.')}>
                    + Create New Event
                </SkeuButton>
            </div>

            <SkeuCard hover={false} className="p-0 overflow-hidden border border-slate-200 font-sans shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Event Title</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {eventsData.map((event) => (
                            <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-slate-800">{event.title}</p>
                                    <p className="text-sm text-slate-500">{event.location}</p>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap">
                                    {new Date(event.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${event.status === "upcoming" ? "bg-green-100 text-green-700 border border-green-200" : "bg-slate-100 text-slate-600 border border-slate-200"
                                        }`}>
                                        {event.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                                    <button className="text-primary font-medium hover:underline text-sm" onClick={() => alert('Edit triggered.')}>Edit</button>
                                    <button className="text-red-500 font-medium hover:underline text-sm" onClick={() => alert('Delete triggered.')}>Delete</button>
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
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Program Manager</h1>
                    <p className="text-slate-500 mt-2">Manage ongoing foundational initiatives and metrics.</p>
                </div>
                <SkeuButton variant="primary" onClick={() => alert('Mock Add Program triggered.')}>
                    + Add New Program
                </SkeuButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programsData.map((program) => (
                    <SkeuCard key={program.id} className="p-0 overflow-hidden flex flex-col h-full bg-white shadow-sm hover:shadow-skeu-sm" hover={false}>
                        <div className="h-40 w-full overflow-hidden relative">
                            <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-xs font-bold rounded-md shadow flex items-center gap-2">
                                {program.category}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-6">{program.description}</p>

                            <div className="mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                                <button className="py-2 px-4 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-colors text-sm" onClick={() => alert('Editing Program.')}>
                                    Edit Mode
                                </button>
                                <button className="py-2 px-4 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-500 hover:text-white transition-colors text-sm" onClick={() => alert('Confirm Delete.')}>
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
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Donation Manager</h1>
                    <p className="text-slate-500 mt-2">Track contributions and generate tax receipts.</p>
                </div>
                <SkeuButton variant="outline" className="flex items-center gap-2">
                    <DownloadIcon size={18} /> Export CSV
                </SkeuButton>
            </div>

            <SkeuCard hover={false} className="p-0 overflow-hidden border border-slate-200 font-sans shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Donor Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {donationsData.map((donation) => (
                            <tr key={donation.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-slate-800">{donation.name}</p>
                                    <p className="text-xs text-slate-400 font-mono tracking-tighter uppercase">{donation.id}</p>
                                </td>
                                <td className="px-6 py-4 font-black text-slate-800 text-lg">
                                    ${donation.amount}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${donation.type === "Monthly" ? "bg-primary/10 text-primary border border-primary/20" : "bg-cream-dark/20 text-slate-600 border border-slate-300"
                                        }`}>
                                        {donation.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium">
                                    {new Date(donation.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                                    <button className="text-emerald-600 font-bold hover:underline text-sm">Receipt</button>
                                    <button className="text-slate-400 font-medium hover:underline text-sm">Notify</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </SkeuCard>
        </div>
    );
}
