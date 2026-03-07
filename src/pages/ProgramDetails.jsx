import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { SectionTitle } from "../components/ui/SectionTitle";
import { programsData } from "../data/programs";
import { ArrowLeft, Target, HeartHandshake } from "lucide-react";

export default function ProgramDetails() {
    const { id } = useParams();
    const program = programsData.find(p => p.id === id);

    if (!program) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-cream">
                <h2 className="text-4xl font-bold text-slate-800 mb-6">Program Not Found</h2>
                <p className="text-lg text-slate-600 mb-8">We couldn't locate the details for this initiative.</p>
                <Link to="/programs">
                    <SkeuButton variant="primary">Return to Programs</SkeuButton>
                </Link>
            </div>
        );
    }

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
            <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
                </div>

                <Container className="relative h-full flex flex-col justify-end pb-20">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <Link to="/programs" className="inline-flex items-center text-cream/80 hover:text-white mb-8 transition-colors">
                            <ArrowLeft size={20} className="mr-2" /> Back to Programs
                        </Link>

                        <div className="inline-flex items-center bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-primary/30">
                            <program.icon size={20} className="text-secondary mr-2" />
                            <span className="text-cream text-lg font-medium">{program.category}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
                            {program.title}
                        </h1>
                        <p className="text-xl text-slate-200 max-w-3xl leading-relaxed drop-shadow-sm">
                            {program.description}
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Main Content & Sidebar */}
            <Section className="-mt-16">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                        {/* Left Content Column */}
                        <div className="flex-1 space-y-12">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                <SkeuCard className="p-8 md:p-10" hover={false}>
                                    <h2 className="text-3xl font-bold text-slate-800 mb-6">About the Program</h2>
                                    <p className="text-lg text-slate-600 leading-relaxed font-light">
                                        {program.longDescription}
                                    </p>
                                </SkeuCard>
                            </motion.div>

                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                <SkeuCard className="p-8 md:p-10" hover={false}>
                                    <div className="flex items-center gap-4 mb-8">
                                        <Target size={32} className="text-primary" />
                                        <h3 className="text-2xl font-bold text-slate-800">Key Objectives</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {program.objectives.map((obj, i) => (
                                            <li key={i} className="flex gap-4">
                                                <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold shrink-0 shadow-skeu-sm">
                                                    {i + 1}
                                                </span>
                                                <p className="text-lg text-slate-600 leading-relaxed mt-1">{obj}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SkeuCard>
                            </motion.div>
                        </div>

                        {/* Right Sidebar Column */}
                        <div className="w-full lg:w-96 space-y-8">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                <SkeuCard className="p-8" hover={false}>
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Our Impact</h3>

                                    <div className="bg-primary/5 rounded-xl p-6 mb-8 text-center border border-primary/10">
                                        <HeartHandshake size={32} className="text-primary mx-auto mb-3" />
                                        <span className="block text-2xl font-bold text-primary mb-1">{program.impact}</span>
                                    </div>

                                    <ul className="space-y-5">
                                        {program.stats.map((stat, i) => (
                                            <li key={i} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                                <span className="text-slate-600">{stat.label}</span>
                                                <span className="font-bold text-slate-800 text-lg">{stat.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </SkeuCard>
                            </motion.div>

                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                <SkeuCard className="p-8" hover={false}>
                                    <h3 className="text-xl font-bold text-slate-800 mb-6">Support this Program</h3>
                                    <div className="space-y-4">
                                        <SkeuButton variant="primary" className="w-full text-lg shadow-skeu">
                                            Donate Now
                                        </SkeuButton>
                                        <SkeuButton variant="outline" className="w-full text-lg shadow-skeu">
                                            Volunteer Here
                                        </SkeuButton>
                                    </div>
                                </SkeuCard>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Program Gallery Snapshot */}
            <Section className="bg-cream-dark/20 pb-24">
                <Container>
                    <SectionTitle title="Program Gallery" subtitle="A closer look at our on-ground efforts and activities." className="mb-12" />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {program.gallery.map((img, idx) => (
                            <motion.div variants={fadeIn} key={idx} className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-2xl shadow-skeu-sm hover:shadow-skeu transition-all group cursor-pointer">
                                <img
                                    src={img}
                                    alt={`${program.title} gallery photo ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </Section>

        </div>
    );
}
