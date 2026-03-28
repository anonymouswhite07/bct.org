import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "../components/layout/PageContainer";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SkeuButton } from "../components/ui/SkeuButton";
import { SkeuCard } from "../components/ui/SkeuCard";
import { StatCard } from "../components/ui/StatCard";
import { ProgramCard } from "../components/ui/ProgramCard";
import { EventCard } from "../components/ui/EventCard";
import { SectionTitle } from "../components/ui/SectionTitle";
import { BookOpen, Stethoscope, Utensils, Users, ArrowRight, Quote, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { staticProgramsData } from "../data/programs";
import { staticEvents } from "../data/events";

export default function Home() {
    const navigate = useNavigate();
    const [previewImages, setPreviewImages] = useState([]);
    const [counts, setCounts] = useState({ programs: 15, events: 3 });
    const [latestEvent, setLatestEvent] = useState(null);

    useEffect(() => {
        const fetchHomeData = async () => {
            // Gallery preview
            const { data: galleryData } = await supabase
                .from("gallery")
                .select("image_url")
                .order("created_at", { ascending: false })
                .limit(6);
            
            const liveImageUrls = galleryData ? galleryData.map(item => item.image_url) : [];
            const staticImages = [
                "https://images.unsplash.com/photo-1593113563332-e1e1ba1f2214?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=600&auto=format&fit=crop"
            ];
            setPreviewImages([...liveImageUrls, ...staticImages].slice(0, 6));

            // Statistics
            const { count: progCount } = await supabase.from('programs').select('*', { count: 'exact', head: true });
            const { count: evCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
            setCounts({
                programs: (progCount || 0) + staticProgramsData.length,
                events: (evCount || 0) + staticEvents.length
            });

            // Latest Upcoming Event
            const { data: evData } = await supabase.from('events').select('*').eq('status', 'upcoming').order('date', { ascending: true }).limit(1);
            if (evData && evData.length > 0) {
                setLatestEvent(evData[0]);
            } else {
                setLatestEvent(staticEvents.find(e => e.status === "upcoming"));
            }
        };
        fetchHomeData();
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section
                className="relative w-full min-h-[60vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center justify-center px-4 overflow-hidden"
                style={{
                    backgroundImage: "url('/assets/hero-image.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

                <Container className="relative z-10 py-12 sm:py-20 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full mb-6 sm:mb-8 border border-white/20">
                            Barthimaeu Charitable Trust
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                            Empowering{" "}
                            <span className="text-secondary">Communities</span>
                            <br />
                            for a Better Tomorrow
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-white/85 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm px-2">
                            Together we uplift communities and create opportunities for those in need. Join our mission to bring lasting change through compassion, education, and social support.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                            <SkeuButton variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4" onClick={() => navigate('/donate')}>
                                Donate Now
                            </SkeuButton>
                            <SkeuButton variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4" onClick={() => navigate('/volunteer')}>
                                Become a Volunteer
                            </SkeuButton>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Mission Section */}
            <Section className="bg-cream-dark/30">
                <Container>
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <SectionTitle title="Our Mission" className="text-left" />
                            <SkeuCard hover={false} className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-600 leading-relaxed shadow-skeu">
                                Our mission is to share the love of God through serving people in need, especially the blind and those who feel forgotten in society. We believe every person is precious in God’s sight. Through our blind ministry and social outreach activities, we aim to bring hope, encouragement, and practical help to those who need it. <br /><br />
                                We visit and support visually challenged people, spend time with them, pray with them, and remind them that they are deeply loved by God. Our social activities also focus on caring for communities, helping the needy, and spreading kindness and compassion.<br /><br />As it is written in the Bible, “The Lord opens the eyes of the blind; the Lord lifts up those who are bowed down.” –<strong> Psalm 146:8</strong>

                            </SkeuCard>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden aspect-square shadow-skeu">
                            <img
                                src="/assets/our-mission.jpeg"
                                alt="Barthimaeu Charitable Trust community mission work"
                                className="object-cover w-full h-full"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Impact Statistics */}
            <Section className="bg-primary/5">
                <Container>
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
                    >
                        <motion.div variants={fadeIn}><StatCard number="10,000+" label="Lives Helped" /></motion.div>
                        <motion.div variants={fadeIn}><StatCard number="5,000+" label="Meals Served" /></motion.div>
                        <motion.div variants={fadeIn}><StatCard number="200+" label="Volunteers" /></motion.div>
                        <motion.div variants={fadeIn}><StatCard number={`${counts.programs}+`} label="Community Projects" /></motion.div>
                    </motion.div>
                </Container>
            </Section>

            {/* Programs Section */}
            <Section>
                <Container>
                    <SectionTitle title="Our Key Programs" subtitle="Discover how we are making a difference across various sectors." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-12"
                    >
                        <motion.div variants={fadeIn}>
                            <ProgramCard
                                icon={BookOpen}
                                title="Education Support"
                                description="Providing scholarships, learning materials, and infrastructure for rural schools to ensure quality education."
                                link="/programs"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <ProgramCard
                                icon={Stethoscope}
                                title="Health Camps"
                                description="Organizing free medical checkups, providing essential medicines, and raising health awareness in remote areas."
                                link="/programs"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <ProgramCard
                                icon={Utensils}
                                title="Food Distribution"
                                description="Running daily community kitchens and weekly ration distribution drives for homeless and impoverished families."
                                link="/programs"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <ProgramCard
                                icon={Users}
                                title="Women Empowerment"
                                description="Skill development workshops and micro-finance assistance to help women become financially independent."
                                link="/programs"
                            />
                        </motion.div>
                    </motion.div>
                </Container>
            </Section>

            {/* Upcoming Events */}
            <Section className="bg-cream-dark/20">
                <Container>
                    <SectionTitle title="Upcoming Events" subtitle="Join us in our upcoming community drives and campaigns." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8 mt-8 sm:mt-12 max-w-2xl mx-auto"
                    >
                        <motion.div variants={fadeIn}>
                            {latestEvent ? (
                                <EventCard
                                    title={latestEvent.title}
                                    date={latestEvent.date}
                                    location={latestEvent.location}
                                    description={latestEvent.description}
                                    link={latestEvent.id.toString().startsWith('event_') ? `/events` : `/events/${latestEvent.id}`}
                                />
                            ) : (
                                <div className="text-center py-10 opacity-50">Loading latest events...</div>
                            )}
                        </motion.div>
                    </motion.div>
                    <div className="mt-12 text-center">
                        <SkeuButton variant="outline" className="inline-flex" onClick={() => navigate('/events')}>
                            View All Events <ArrowRight size={18} />
                        </SkeuButton>
                    </div>
                </Container>
            </Section>

            {/* Gallery Preview */}
            <Section>
                <Container>
                    <SectionTitle title="Glimpses of Hope" subtitle="A visual journey of our recent activities and their impact." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12"
                    >
                        {previewImages.map((imgUrl, idx) => (
                            <motion.div
                                variants={fadeIn}
                                key={idx}
                                className="relative rounded-2xl overflow-hidden aspect-square shadow-skeu-sm hover:shadow-skeu transition-all cursor-pointer group"
                                onClick={() => navigate('/gallery')}
                            >
                                <img 
                                    src={imgUrl} 
                                    alt={`Gallery preview ${idx + 1}`} 
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                                    loading="lazy"
                                    decoding="async"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="mt-12 text-center">
                        <SkeuButton variant="outline" className="inline-flex" onClick={() => navigate('/gallery')}>
                            View Full Gallery
                        </SkeuButton>
                    </div>
                </Container>
            </Section>

            {/* Testimonials Section */}
            <Section className="bg-primary/5">
                <Container>
                    <SectionTitle title="Voices of Change" subtitle="Hear from the people whose lives have been transformed." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12"
                    >
                        {[
                            { text: "This trust helped my children return to school after we lost everything in the flood. The uniform and books were a huge relief.", name: "Pradeep Sharma", location: "Salem District" },
                            { text: "The free medical camp discovered my heart condition just in time. The continued support for my medication has been life-saving.", name: "Andrew", location: "Salem District" },
                            { text: "Thanks to the women's skill development workshop, I now run my own tailoring shop and can comfortably provide for my family.", name: "Amos", location: "Salem District" },
                        ].map((testimonial, idx) => (
                            <motion.div variants={fadeIn} key={idx}>
                                <SkeuCard className="h-full flex flex-col justify-between">
                                    <div>
                                        <Quote size={32} className="text-secondary/40 mb-4" />
                                        <p className="text-slate-600 italic mb-6">&quot;{testimonial.text}&quot;</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                                        <p className="text-sm text-slate-500">{testimonial.location}</p>
                                    </div>
                                </SkeuCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </Section>

            {/* Call to Action Section */}
            <Section className="pb-32 overflow-hidden">
                <Container>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                        <div 
                            className="relative rounded-[2rem] overflow-hidden py-16 sm:py-24 px-6 sm:px-12 md:px-24 text-center shadow-2xl"
                            style={{
                                backgroundImage: "url('/assets/be-part-of-the-change.jpeg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        >
                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]" />
                            
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
                                    Join us in making a <span className="text-secondary">difference.</span>
                                </h2>
                                <p className="text-xl sm:text-2xl text-slate-100/90 mb-12 leading-relaxed font-light drop-shadow-sm">
                                    Whether you want to contribute your time or make a donation, your support is the foundation of our work.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <SkeuButton variant="primary" className="w-full sm:w-auto text-lg px-10 py-5" onClick={() => navigate('/donate')}>
                                        Donate Now
                                    </SkeuButton>
                                    <SkeuButton variant="secondary" className="w-full sm:w-auto text-lg px-10 py-5" onClick={() => navigate('/get-involved')}>
                                        Become a Volunteer
                                    </SkeuButton>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </Section>

        </div>
    );
}
