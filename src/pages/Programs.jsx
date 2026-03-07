import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageContainer } from "../components/layout/PageContainer";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { StatCard } from "../components/ui/StatCard";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { ProgramCard } from "../components/programs/ProgramCard";
import { programsData, programCategories } from "../data/programs";
import { useNavigate } from "react-router-dom";
import { Heart, HandHeart, Users } from "lucide-react";

export default function Programs() {
    const [activeCategory, setActiveCategory] = useState("All Programs");
    const navigate = useNavigate();

    const filteredPrograms = activeCategory === "All Programs"
        ? programsData
        : programsData.filter(program => program.category === activeCategory);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="w-full">
            {/* Hero Header */}
            <section className="relative w-full pt-20 pb-24 px-4 bg-cream overflow-hidden">
                <Container className="text-center max-w-3xl mx-auto">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
                            Our Core <span className="text-primary">Programs</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-light">
                            Explore the initiatives we run to bring sustainable development and hope to underserved communities.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Impact Highlights */}
            <Section className="bg-primary/5 pt-0">
                <Container>
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-12"
                    >
                        <motion.div variants={fadeIn}><StatCard number="15+" label="Active Programs" className="bg-white" /></motion.div>
                        <motion.div variants={fadeIn}><StatCard number="10,000+" label="Beneficiaries" className="bg-white" /></motion.div>
                        <motion.div variants={fadeIn}><StatCard number="200+" label="Volunteers" className="bg-white" /></motion.div>
                    </motion.div>
                </Container>
            </Section>

            {/* Programs Grid with Filtration */}
            <Section className="bg-cream-dark/10">
                <Container>
                    <div className="flex flex-col items-center mb-12">
                        <SectionTitle title="Discover Our Work" subtitle="Filter by category to learn more about specific community interventions." />

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            {programCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-skeu-sm ${activeCategory === category
                                            ? "bg-primary text-white shadow-skeu-pressed-sm translate-y-px"
                                            : "bg-cream text-slate-600 hover:bg-slate-50 hover:text-primary hover:-translate-y-1"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredPrograms.map((program) => (
                                <motion.div
                                    key={program.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProgramCard {...program} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredPrograms.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">No programs found for this category.</p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* Volunteer CTA */}
            <Section className="pb-32">
                <Container>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                        <SkeuCard className="text-center py-16 px-6 md:px-16" hover={false}>
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                                <HandHeart size={40} />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">Want to contribute to our programs?</h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                                Our programs rely heavily on the dedication of our volunteers and the generosity of our donors. Join us on the ground or support us financially.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <SkeuButton variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4" onClick={() => navigate('/get-involved')}>
                                    Become a Volunteer
                                </SkeuButton>
                                <SkeuButton variant="primary" className="w-full sm:w-auto text-lg px-8 py-4" onClick={() => navigate('/get-involved')}>
                                    Donate to Support Programs
                                </SkeuButton>
                            </div>
                        </SkeuCard>
                    </motion.div>
                </Container>
            </Section>
        </div>
    );
}
