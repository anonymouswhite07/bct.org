import { PageContainer } from "../components/layout/PageContainer";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SkeuButton } from "../components/ui/SkeuButton";
import { SkeuCard } from "../components/ui/SkeuCard";
import { StatCard } from "../components/ui/StatCard";
import { SectionTitle } from "../components/ui/SectionTitle";

export default function DesignSystem() {
    return (
        <PageContainer>
            <Section className="py-8 md:py-12">
                <Container>
                    <div className="mb-16">
                        <h1 className="text-4xl font-bold mb-4">UI Design System</h1>
                        <p className="text-slate-600 text-lg">
                            A showcase of the skeuomorphic components used across the TrustNGO website.
                        </p>
                    </div>

                    <div className="space-y-24">

                        {/* Buttons Section */}
                        <div>
                            <SectionTitle title="Buttons" subtitle="Interactive buttons with hover and press effects" />
                            <div className="flex flex-wrap gap-8 justify-center items-center mt-8">
                                <SkeuButton variant="primary">Primary Button</SkeuButton>
                                <SkeuButton variant="secondary">Secondary Button</SkeuButton>
                                <SkeuButton variant="outline">Outline Button</SkeuButton>
                            </div>
                        </div>

                        {/* Cards Section */}
                        <div>
                            <SectionTitle title="Cards" subtitle="Raised containers with subtle depth" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                                <SkeuCard>
                                    <h3 className="text-xl font-bold mb-2">Default Card</h3>
                                    <p className="text-slate-600">
                                        A basic card with standard padding and soft shadow. Hovers up slightly.
                                    </p>
                                </SkeuCard>

                                <SkeuCard hover={false}>
                                    <h3 className="text-xl font-bold mb-2">No Hover Card</h3>
                                    <p className="text-slate-600">
                                        This card does not have the hover animation applied.
                                    </p>
                                </SkeuCard>

                                <SkeuCard pressable={true}>
                                    <h3 className="text-xl font-bold mb-2">Pressable Card</h3>
                                    <p className="text-slate-600">
                                        Try clicking or tapping this card to see the inset shadow effect.
                                    </p>
                                </SkeuCard>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div>
                            <SectionTitle title="Stat Cards" subtitle="Displaying impact metrics clearly" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                                <StatCard number="10,000+" label="Lives Helped" />
                                <StatCard number="5,000+" label="Meals Served" />
                                <StatCard number="200+" label="Volunteers" />
                            </div>
                        </div>

                    </div>
                </Container>
            </Section>
        </PageContainer>
    );
}
