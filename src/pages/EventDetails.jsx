import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { SectionTitle } from "../components/ui/SectionTitle";
import { getEventsData } from "../data/events";
import { ArrowLeft, Calendar, MapPin, Clock, Loader2 } from "lucide-react";

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getEventsData();
            const found = data.find(e => e.id === id || e.id.toString() === id);
            setEvent(found);
            setLoading(false);
        };
        load();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <Loader2 size={48} className="text-primary animate-spin" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-cream">
                <h2 className="text-4xl font-bold text-slate-800 mb-6">Event Not Found</h2>
                <p className="text-lg text-slate-600 mb-8">We couldn't locate the details for this event.</p>
                <Link to="/events">
                    <SkeuButton variant="primary">Return to Events</SkeuButton>
                </Link>
            </div>
        );
    }

    const isUpcoming = event.status === "upcoming";

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="w-full bg-cream">
            {/* Banner & Hero Section */}
            <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
                </div>

                <Container className="relative h-full flex flex-col justify-end pb-20">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <Link to="/events" className="inline-flex items-center text-cream/80 hover:text-white mb-8 transition-colors">
                            <ArrowLeft size={20} className="mr-2" /> Back to Events
                        </Link>

                        <div className="flex gap-3 mb-6">
                            <span className="inline-flex items-center bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30 text-cream text-lg font-medium">
                                {event.category}
                            </span>
                            <span className={`inline-flex items-center backdrop-blur-md px-4 py-2 rounded-full border text-lg font-medium ${isUpcoming ? "bg-white/90 text-primary border-primary/20" : "bg-white/20 text-cream/80 border-white/20"
                                }`}>
                                {isUpcoming ? "Upcoming" : "Completed"}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
                            {event.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 mt-6 max-w-3xl">
                            <div className="flex items-center text-slate-200 text-lg">
                                <Calendar className="mr-3 text-secondary" size={20} />
                                <span>{new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                            </div>
                            <div className="flex items-center text-slate-200 text-lg">
                                <Clock className="mr-3 text-secondary" size={20} />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-slate-200 text-lg">
                                <MapPin className="mr-3 text-primary" size={20} />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Main Content & Sidebar */}
            <Section className="-mt-16 relative z-10">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                        {/* Left Content Column */}
                        <div className="flex-1">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                <SkeuCard className="p-8 md:p-10" hover={false}>
                                    <h2 className="text-3xl font-bold text-slate-800 mb-6">Event Description</h2>
                                    <p className="text-lg text-slate-600 leading-relaxed font-light whitespace-pre-line">
                                        {event.longDescription}
                                    </p>
                                </SkeuCard>
                            </motion.div>
                        </div>

                        {/* Right Sidebar Column */}
                        <div className="w-full lg:w-96">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                <SkeuCard className="p-8 sticky top-24" hover={false}>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-6">{isUpcoming ? "Get Involved" : "Support Our Cause"}</h3>
                                    <div className="space-y-4">
                                        {isUpcoming ? (
                                            <>
                                                <SkeuButton variant="primary" className="w-full text-lg shadow-skeu">
                                                    Register to Attend
                                                </SkeuButton>
                                                <SkeuButton variant="outline" className="w-full text-lg shadow-skeu">
                                                    Sign up to Volunteer
                                                </SkeuButton>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-slate-600 mb-6 text-sm">
                                                    This event has concluded, but our mission continues. Check out our upcoming drives or contribute to our overarching fund.
                                                </p>
                                                <SkeuButton variant="secondary" className="w-full text-lg shadow-skeu">
                                                    Donate Now
                                                </SkeuButton>
                                                <SkeuButton variant="outline" className="w-full text-lg shadow-skeu">
                                                    View Upcoming Events
                                                </SkeuButton>
                                            </>
                                        )}
                                    </div>
                                </SkeuCard>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Event Gallery */}
            <Section className="bg-cream-dark/10 pb-24">
                <Container>
                    <SectionTitle title={isUpcoming ? "Previous Event Highlights" : "Event Gallery"} subtitle="A visual look into the impact we created." className="mb-12" />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                    >
                        {(event.gallery || []).map((imgUrl, idx) => (
                            <motion.div variants={fadeIn} key={idx} className="relative aspect-video sm:aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-2xl shadow-skeu-sm hover:shadow-skeu transition-all group cursor-pointer">
                                <img
                                    src={imgUrl}
                                    alt={`${event.title} snapshot ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="mt-12 text-center">
                        <Link to="/gallery">
                            <SkeuButton variant="outline" className="px-10">
                                View Full Trust Gallery
                            </SkeuButton>
                        </Link>
                    </div>
                </Container>
            </Section>

        </div>
    );
}
