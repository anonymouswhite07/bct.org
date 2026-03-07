import { motion } from "framer-motion";
import { PageContainer } from "../components/layout/PageContainer";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { EventCard } from "../components/events/EventCard";
import { eventsData } from "../data/events";
import { CalendarDays, HandHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Events() {
    const navigate = useNavigate();

    const upcomingEvents = eventsData.filter(e => e.status === "upcoming");
    const pastEvents = eventsData.filter(e => e.status === "past");

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative w-full pt-20 pb-24 px-4 bg-cream overflow-hidden">
                <Container className="text-center max-w-4xl mx-auto">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                            <CalendarDays size={40} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-6">
                            Community <span className="text-primary">Events</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                            Join us in our ongoing campaigns, health drives, and volunteer meetups. Experience the joy of giving back on the ground.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Upcoming Events */}
            <Section className="bg-primary/5">
                <Container>
                    <SectionTitle title="Upcoming Events" subtitle="Mark your calendars and register to participate in our active campaigns." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                    >
                        {upcomingEvents.map((event) => (
                            <motion.div variants={fadeIn} key={event.id}>
                                <EventCard {...event} />
                            </motion.div>
                        ))}
                    </motion.div>
                    {upcomingEvents.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-500 text-lg">No upcoming events scheduled at the moment. Stay tuned!</p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* Past Events / Success Stories */}
            <Section className="bg-cream-dark/10">
                <Container>
                    <SectionTitle title="Past Events" subtitle="Browse through our completed drives and view their respective galleries." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 opacity-80"
                    >
                        {pastEvents.map((event) => (
                            <motion.div variants={fadeIn} key={event.id}>
                                <EventCard {...event} />
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </Section>

            {/* Final Volunteer CTA */}
            <Section className="pb-32 bg-cream">
                <Container>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                        <SkeuCard className="text-center py-16 px-6 md:px-16" hover={false}>
                            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mx-auto mb-6">
                                <HandHeart size={40} />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">Want to participate in our upcoming events?</h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                                We are always looking for passionate individuals to join our on-ground crew. Your time can translate into real impact.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <SkeuButton variant="primary" className="w-full sm:w-auto text-lg px-8 py-4" onClick={() => navigate('/get-involved')}>
                                    Volunteer Now
                                </SkeuButton>
                                <SkeuButton variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4" onClick={() => navigate('/get-involved')}>
                                    Donate to Events
                                </SkeuButton>
                            </div>
                        </SkeuCard>
                    </motion.div>
                </Container>
            </Section>
        </div>
    );
}
