import { motion } from "framer-motion";
import { PageContainer } from "../components/layout/PageContainer";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SkeuCard } from "../components/ui/SkeuCard";
import { SkeuButton } from "../components/ui/SkeuButton";
import { SectionTitle } from "../components/ui/SectionTitle";
import { TeamCard } from "../components/ui/TeamCard";
import { FileText, Download, Award, ShieldCheck, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

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
            <section className="relative w-full pt-24 pb-32 px-4 bg-cream overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] pointer-events-none"></div>
                <Container className="relative z-10 text-center max-w-3xl mx-auto">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-6">
                            About Our Trust
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed font-light">
                            Serving communities through compassion, education, and social support. We believe in empowering individuals to realize their full potential.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* History Section */}
            <Section className="bg-cream-dark/20">
                <Container>
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <SectionTitle title="Our History" className="text-left" />
                            <SkeuCard className="mt-8 text-lg text-slate-600 leading-relaxed shadow-skeu" hover={false}>
                                <p className="mb-4">
                                    Our trust was founded in 2018 with the core goal of supporting underprivileged communities through robust education, healthcare, and progressive social initiatives.
                                </p>
                                <p>
                                    What started as a small group of passionate volunteers distributing meals in the urban center has blossomed into a registered non-profit organization operating across three districts. We've stayed true to our grassroots approach while scaling our impact systematically over the past decade.
                                </p>
                            </SkeuCard>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-skeu aspect-video md:aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
                                alt="Community volunteers organizing relief efforts"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Mission & Vision Section */}
            <Section>
                <Container>
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <motion.div variants={fadeIn}>
                            <SkeuCard className="h-full flex flex-col items-center text-center p-8 md:p-12">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                                    <HeartHandshake size={36} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    "To uplift underserved communities through sustainable, long-term programs focusing on education, health access, and holistic welfare."
                                </p>
                            </SkeuCard>
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <SkeuCard className="h-full flex flex-col items-center text-center p-8 md:p-12">
                                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6">
                                    <Award size={36} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    "A healthy, equitable society where absolutely every individual has access to opportunity, dignity, and a platform to thrive."
                                </p>
                            </SkeuCard>
                        </motion.div>
                    </motion.div>
                </Container>
            </Section>

            {/* Founder Message Section */}
            <Section className="bg-primary/5">
                <Container>
                    <SectionTitle title="A Message from Our Founder" />
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
                        <SkeuCard className="max-w-4xl mx-auto p-8 md:p-12 relative overflow-hidden" hover={false}>
                            <div className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="shrink-0 relative">
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-cream shadow-skeu">
                                        <img
                                            src="/assets/team-founder.jpeg"
                                            alt="Sam Srivasan, Trust Founder"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <p className="text-xl text-slate-600 italic leading-relaxed mb-6">
                                        "When we started this trust, we had merely a vision and a strong desire to see change. Today, walking alongside thousands of dedicated volunteers and generous donors, we are actively reshaping futures. I invite you to join our family, because true transformation only happens when we stand united."
                                    </p>
                                    <div>
                                        <h4 className="text-2xl font-bold text-slate-800">Sam Srivasan</h4>
                                        <p className="text-primary font-medium text-lg">Founder & Managing Trustee</p>
                                    </div>
                                </div>
                            </div>
                        </SkeuCard>
                    </motion.div>
                </Container>
            </Section>

            {/* Leadership Team */}
            <Section>
                <Container>
                    <SectionTitle title="Our Leadership Team" subtitle="The dedicated individuals driving our mission forward on the ground." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
                    >
                        <motion.div variants={fadeIn}>
                            <TeamCard
                                name="Sam Srivasan"
                                role="Founder & Managing Trustee"
                                description="Visionary leader directing the overall strategic path of the trust's community programs."
                                imageUrl="/assets/team-founder.jpeg"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <TeamCard
                                name="Leethiyal sam"
                                role="Program Director"
                                description="Oversees the execution, scaling, and compliance of all our educational and welfare initiatives."
                                imageUrl="/assets/team-director.jpeg"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <TeamCard
                                name="Santhosh Raj"
                                role="Community Coordinator"
                                description="Our primary liaison working directly with local communities to map essential needs."
                                imageUrl="/assets/team-coordinator.jpeg"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <TeamCard
                                name="Jansirani"
                                role="Head of Operations"
                                description="Ensures all relief material and medical logistics operate transparently and efficiently."
                                imageUrl="/assets/team-operations.jpeg"
                            />
                        </motion.div>
                    </motion.div>
                </Container>
            </Section>

            {/* Achievements / Milestones */}
            <Section className="bg-cream-dark/20">
                <Container>
                    <SectionTitle title="Our Journey So Far" subtitle="Key milestones in our mission to uplift communities." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="max-w-3xl mx-auto mt-12 space-y-6"
                    >
                        {[
                            { year: "2018", event: "Trust officially founded and registered." },
                            { year: "2019", event: "Launched first pilot education program in standard public schools." },
                            { year: "2021", event: "Reached major milestone: Over 5,000 marginalized families supported." },
                            { year: "2024", event: "Expanded community healthcare programs across two new districts." }
                        ].map((milestone, idx) => (
                            <motion.div variants={fadeIn} key={idx} className="flex gap-6 items-center">
                                <div className="w-24 shrink-0 text-right">
                                    <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-secondary shrink-0 shadow-skeu-sm"></div>
                                <SkeuCard className="flex-1 p-6" hover={false}>
                                    <p className="text-slate-700 text-lg">{milestone.event}</p>
                                </SkeuCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </Section>

            {/* Transparency / Credibility Section */}
            <Section>
                <Container>
                    <SectionTitle title="Transparency & Reports" subtitle="We believe in complete accountability to our donors and community." />
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto"
                    >
                        <motion.div variants={fadeIn}>
                            <SkeuCard className="h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800">Registration Details</h3>
                                </div>
                                <ul className="space-y-4 text-slate-600 text-lg">
                                    <li className="flex justify-between border-b border-slate-200 pb-2">
                                        <span className="font-medium">Registration Body:</span>
                                        <span>National Charity Commission</span>
                                    </li>
                                    <li className="flex justify-between border-b border-slate-200 pb-2">
                                        <span className="font-medium">Registration No:</span>
                                        <span>#NGO-98765432</span>
                                    </li>
                                    <li className="flex justify-between pb-2">
                                        <span className="font-medium">Tax Exemption:</span>
                                        <span className="text-primary font-bold">Available (12A & 80G)</span>
                                    </li>
                                </ul>
                            </SkeuCard>
                        </motion.div>

                        <motion.div variants={fadeIn}>
                            <SkeuCard className="h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                                        <FileText size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800">Annual Documents</h3>
                                </div>
                                <div className="space-y-4">
                                    <SkeuButton variant="outline" className="w-full justify-between group" onClick={() => alert('Download triggered')}>
                                        <span className="text-lg">Annual Report 2024</span>
                                        <Download size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                                    </SkeuButton>
                                    <SkeuButton variant="outline" className="w-full justify-between group" onClick={() => alert('Download triggered')}>
                                        <span className="text-lg">Audited Financial Statement</span>
                                        <Download size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                                    </SkeuButton>
                                </div>
                            </SkeuCard>
                        </motion.div>
                    </motion.div>
                </Container>
            </Section>

            {/* Call to Action Section */}
            <Section className="pb-32 bg-cream">
                <Container>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                        <SkeuCard className="text-center py-16 px-6 md:px-16 border-t-4 border-primary" hover={false}>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">Join us in making a difference.</h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                                Whether you want to contribute your time or make a donation, your support is the foundation of our work.
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
