import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { SkeuButton } from "../components/ui/SkeuButton";
import { galleryCategories } from "../data/events";
import { staticEvents } from "../data/events";
import { staticProgramsData } from "../data/programs";
import { X, ChevronLeft, ChevronRight, Maximize2, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Gallery() {
    const { isAuthenticated } = useAuth();
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(12);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        setLoading(true);
        // Built-in static images from events/programs
        const staticImgs = [
            ...staticEvents.flatMap(e => (e.gallery || []).map(url => ({ url, category: e.category }))),
            ...staticProgramsData.flatMap(p => (p.gallery || []).map(url => ({ url, category: p.category }))),
            { url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&auto=format&fit=crop", category: "Education Programs" },
            { url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=600&auto=format&fit=crop", category: "Community" },
            { url: "https://images.unsplash.com/photo-1583313262174-8fbd86fcd5dc?q=80&w=600&auto=format&fit=crop", category: "Community" },
            { url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600&auto=format&fit=crop", category: "Medical Camps" },
            { url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop", category: "Women Empowerment" }
        ];

        const { data, error } = await supabase
            .from("gallery")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            const liveImages = data.map(item => ({
                id: item.id,
                url: item.image_url,
                category: item.category || "Community",
                isLive: true
            }));
            setImages([...liveImages, ...staticImgs]);
        } else {
            setImages(staticImgs);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (url, e, id) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this photo from the gallery?")) {
            if (id) {
                await supabase
                    .from("gallery")
                    .delete()
                    .eq("id", id);
            }
            // Update UI optimistically
            setImages(images.filter(img => img.url !== url));
            fetchImages();
        }
    };

    const filteredImages = activeCategory === "All"
        ? images
        : images.filter(img => img.category === activeCategory);

    const displayedImages = filteredImages.slice(0, visibleCount);

    // Close lightbox on escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (lightboxIndex === null) return;
            if (e.key === "Escape") setLightboxIndex(null);
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, filteredImages]);

    const handleNext = () => setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
    const handlePrev = () => setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="w-full bg-cream min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full pt-20 pb-16 px-4 bg-cream overflow-hidden">
                <Container className="text-center max-w-3xl mx-auto">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                            <Maximize2 size={36} />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight mb-4">
                            Our <span className="text-primary">Gallery</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                            Explore thousands of moments captured during our events, campaigns, and on-ground activities over the years.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Gallery Grid & Filters */}
            <Section className="pt-0 pb-32">
                <Container>
                    <div className="flex flex-col items-center mb-12">
                        <SectionTitle title="Visual Memories" subtitle="Filter by event or program to find specific photos." />

                        {/* Horizontal Scrolling Filters for Mobile */}
                        <div className="w-full overflow-x-auto pb-4 mt-8 hide-scrollbar">
                            <div className="flex justify-center flex-nowrap md:flex-wrap gap-3 md:gap-4 min-w-max md:min-w-0 mx-auto px-4 md:px-0">
                                {galleryCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setVisibleCount(12); // Reset pagination on filter change
                                        }}
                                        className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-skeu-sm ${activeCategory === category
                                                ? "bg-primary text-white shadow-skeu-pressed-sm translate-y-px"
                                                : "bg-cream text-slate-600 hover:bg-slate-50 hover:text-primary hover:-translate-y-1"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        <AnimatePresence mode="popLayout">
                            {displayedImages.map((img, index) => (
                                <motion.div
                                    key={`${img.url}-${index}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative aspect-square overflow-hidden rounded-xl md:rounded-2xl shadow-skeu-sm hover:shadow-skeu cursor-zoom-in group bg-cream-dark/50"
                                    onClick={() => setLightboxIndex(index)}
                                >
                                    <img
                                        src={img.url}
                                        alt={`Gallery ${img.category}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="flex gap-4">
                                            <Maximize2 size={32} className="text-white drop-shadow-md" />
                                            {isAuthenticated && img.isLive && (
                                                <button 
                                                    className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 z-20"
                                                    onClick={(e) => handleDelete(img.url, e, img.id)}
                                                    title="Delete Image"
                                                >
                                                    <Trash2 size={24} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredImages.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">No photos found for this category.</p>
                        </div>
                    )}

                    {visibleCount < filteredImages.length && (
                        <div className="mt-16 text-center">
                            <SkeuButton variant="secondary" className="px-12" onClick={() => setVisibleCount(v => v + 12)}>
                                Load More Photos
                            </SkeuButton>
                        </div>
                    )}
                </Container>
            </Section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center backdrop-blur-md"
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
                            onClick={() => setLightboxIndex(null)}
                        >
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-4 md:left-10 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hidden md:block"
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={36} />
                        </button>

                        <motion.div
                            key={lightboxIndex}
                            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-7xl max-h-[85vh] w-full px-4 md:px-24 flex items-center justify-center"
                        >
                            <img
                                src={filteredImages[lightboxIndex].url}
                                alt="Fullscreen Lightbox"
                                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md">
                                {lightboxIndex + 1} of {filteredImages.length}
                            </div>
                        </motion.div>

                        <button
                            className="absolute right-4 md:right-10 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hidden md:block"
                            onClick={handleNext}
                        >
                            <ChevronRight size={36} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
