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
import { BookOpen, Stethoscope, Utensils, Users, ArrowRight, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

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
            <section className="relative w-full pt-32 pb-40 px-4 overflow-hidden bg-cream">
                {/* Subtle patterned background element here if needed, keeping clean for now */}
                <Container className="relative z-10">
                    <motion.div
                        initial="hidden" animate="visible" variants={staggerContainer}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-6">
                            Empowering <span className="text-primary">Communities</span> <br />
                            for a Better Tomorrow
                        </motion.h1>
                        <motion.p variants={fadeIn} className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Together we uplift communities and create opportunities for those in need. Join our mission to bring lasting change.
                        </motion.p>
                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <SkeuButton variant="primary" className="w-full sm:w-auto text-lg px-8 py-4" onClick={() => navigate('/get-involved')}>
                                Donate Now
                            </SkeuButton>
                            <SkeuButton variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4" onClick={() => navigate('/get-involved')}>
                                Become a Volunteer
                            </SkeuButton>
                        </motion.div>
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
                            <SkeuCard hover={false} className="mt-8 text-lg text-slate-600 leading-relaxed shadow-skeu">
                                Our mission is to support education, healthcare, and community development for underprivileged families.
                                We believe that every individual deserves a fair chance at life, surrounded by support, basic necessities,
                                and opportunities to grow. <br /><br />
                                Since our founding, we have worked relentlessly on the ground to provide sustainable solutions rather
                                than just temporary relief.
                            </SkeuCard>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden aspect-square shadow-skeu">
                            {/* Unsplash Placeholder */}
                            <img
                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
                                alt="Volunteers helping"
                                className="object-cover w-full h-full"
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        <motion.div variants={fadeIn}><StatCard number="10,000+" label="Lives Helped" /></motion.div>
                        <motion.div variants={fadeIn}><StatCard number="5,000+" label="Meals Served" /></motion.div>
                        <motion.div variants={fadeIn}><StatCard number="200+" label="Volunteers" /></motion.div>
                        <motion.div variants={fadeIn}><StatCard number="15+" label="Community Projects" /></motion.div>
                    </motion.div>
                </Container>
            </Section>

            {/* Programs Section */}
            <Section>
                <Container>
                    <SectionTitle title="Our Key Programs" subtitle="Discover how we are making a difference across various sectors." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-12"
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
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
                    >
                        <motion.div variants={fadeIn}>
                            <EventCard
                                title="Community Health Camp"
                                date="Oct 15, 2026"
                                location="City Square Park"
                                description="A free mult-speciality health camp providing basic vitals check, dental, and eye checkups for the elderly."
                                link="/events"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <EventCard
                                title="Weekly Food Donation Drive"
                                date="Oct 18, 2026"
                                location="Downtown Shelter Center"
                                description="Help us pack, distribute and serve over 500 hot meals to the homeless in the downtown district."
                                link="/events"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <EventCard
                                title="Education Scholarship Gala"
                                date="Nov 5, 2026"
                                location="Grand Hotel Auditorium"
                                description="Annual fundraising event to sponsor the higher education of 50 brilliant students from underprivileged backgrounds."
                                link="/events"
                            />
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
                        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12"
                    >
                        {[
                            "https://images.unsplash.com/photo-1593113563332-e1e1ba1f2214?q=80&w=600&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=600&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1616606041122-8d776b26cf9c?q=80&w=600&auto=format&fit=crop"
                        ].map((imgUrl, idx) => (
                            <motion.div
                                variants={fadeIn}
                                key={idx}
                                className="relative rounded-2xl overflow-hidden aspect-square shadow-skeu-sm hover:shadow-skeu transition-all cursor-pointer group"
                                onClick={() => navigate('/gallery')}
                            >
                                <img src={imgUrl} alt={`Gallery preview ${idx + 1}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
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
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                    >
                        {[
                            { text: "This trust helped my children return to school after we lost everything in the flood. The uniform and books were a huge relief.", name: "Maria Garcia", location: "East District" },
                            { text: "The free medical camp discovered my heart condition just in time. The continued support for my medication has been life-saving.", name: "James Wilson", location: "Downtown" },
                            { text: "Thanks to the women's skill development workshop, I now run my own tailoring shop and can comfortably provide for my family.", name: "Aisha Patel", location: "West End" },
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
            <Section className="pb-32">
                <Container>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                        <SkeuCard className="text-center py-16 px-6 md:px-16" hover={false}>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">Be part of the change.</h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                                Help us build a better future. Your contribution, whether it’s time or money, goes directly towards uplifting communities in need.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <SkeuButton variant="primary" className="w-full sm:w-auto text-lg px-8 py-4" onClick={() => navigate('/get-involved')}>
                                    Donate Now
                                </SkeuButton>
                                <SkeuButton variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4" onClick={() => navigate('/get-involved')}>
                                    Become a Volunteer
                                </SkeuButton>
                            </div>
                        </SkeuCard>
                    </motion.div>
                </Container>
            </Section>

        </div>
    );
}
