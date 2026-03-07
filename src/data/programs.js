import { BookOpen, Stethoscope, Utensils, Users, Wrench, ShieldCheck } from "lucide-react";

export const programsData = [
    {
        id: "education-support",
        title: "Education Support",
        category: "Education",
        icon: BookOpen,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
        impact: "1,500+ students supported",
        description: "Providing educational assistance, books, and scholarships to underprivileged students.",
        longDescription: "Our Education Support program is designed to bridge the gap in educational access for children from low-income families. We provide full-tuition scholarships, school supplies, uniforms, and after-school mentoring to ensure every child has the resources they need to succeed academically. We partner with local schools to identify students in need and work closely with their families to create a supportive learning environment.",
        gallery: [
            "https://images.unsplash.com/photo-1546410531-bea5aad13926?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop"
        ],
        objectives: [
            "Increase primary and secondary school enrollment rates.",
            "Reduce dropout rates due to financial constraints.",
            "Provide holistic mentoring and career guidance."
        ],
        stats: [
            { label: "Students Supported", value: "1,500+" },
            { label: "Schools Connected", value: "30" },
            { label: "Scholarships Awarded", value: "500+" }
        ]
    },
    {
        id: "health-camps",
        title: "Health Camps",
        category: "Health",
        icon: Stethoscope,
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop",
        impact: "10,000+ patients treated",
        description: "Organizing free medical checkups and providing essential medicines in remote areas.",
        longDescription: "Access to quality healthcare remains a challenge in many rural and underserved urban areas. Our Health Camps initiative brings specialized doctors, essential medicines, and diagnostic equipment directly to communities. We focus on preventive care, maternal health, pediatric checkups, and chronic disease management, ensuring that vulnerable populations receive timely medical attention.",
        gallery: [
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop"
        ],
        objectives: [
            "Conduct regular free diagnostic and treatment camps.",
            "Distribute essential medicines at no cost.",
            "Raise awareness about basic hygiene and preventive healthcare."
        ],
        stats: [
            { label: "Patients Treated", value: "10,000+" },
            { label: "Camps Organized", value: "120" },
            { label: "Volunteer Doctors", value: "50+" }
        ]
    },
    {
        id: "food-distribution",
        title: "Food Distribution",
        category: "Community",
        icon: Utensils,
        image: "https://images.unsplash.com/photo-1593113563332-e1e1ba1f2214?q=80&w=1000&auto=format&fit=crop",
        impact: "5,000+ meals served weekly",
        description: "Running community kitchens and ration drives for homeless and impoverished families.",
        longDescription: "No one should have to go to bed hungry. Our Food Distribution program works tirelessly to eliminate food insecurity in our city. We operate community kitchens serving hot, nutritious meals every day and distribute monthly dry ration kits to struggling families. We also partner with local supermarkets to rescue surplus food and redirect it to those in need.",
        gallery: [
            "https://images.unsplash.com/photo-1616606041122-8d776b26cf9c?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1593113563332-e1e1ba1f2214?q=80&w=600&auto=format&fit=crop"
        ],
        objectives: [
            "Provide daily hot meals to the homeless.",
            "Distribute monthly grocery kits to families in poverty.",
            "Reduce food waste through strategic partnerships."
        ],
        stats: [
            { label: "Meals Served", value: "500,000+" },
            { label: "Families Supported", value: "2,000+" },
            { label: "Kitchens Operating", value: "3" }
        ]
    },
    {
        id: "women-empowerment",
        title: "Women Empowerment",
        category: "Women Empowerment",
        icon: Users,
        image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1000&auto=format&fit=crop",
        impact: "800+ women trained",
        description: "Skill development workshops and micro-finance for financial independence.",
        longDescription: "Empowering a woman brings transformational impact to her entire family. Our Women Empowerment initiative focuses on vocational training, financial literacy, and micro-entrepreneurship. We help women acquire marketable skills like tailoring, digital literacy, and handicrafts, and provide seed funding for them to start their own small businesses, fostering true financial independence.",
        gallery: [
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop"
        ],
        objectives: [
            "Conduct vocational and skill training workshops.",
            "Provide micro-finance loans for small businesses.",
            "Create a supportive network of women entrepreneurs."
        ],
        stats: [
            { label: "Women Trained", value: "800+" },
            { label: "Businesses Started", value: "150" },
            { label: "Micro-loans Disbursed", value: "$50k+" }
        ]
    },
    {
        id: "skill-development",
        title: "Skill Development",
        category: "Education",
        icon: Wrench,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
        impact: "1,200+ youths certified",
        description: "Providing modern vocational and technical skills to unemployed youth.",
        longDescription: "Youth unemployment is a critical challenge. Our Skill Development program bridges the gap between raw talent and industry requirements. We offer certification courses in IT, plumbing, electrical work, and soft skills. Our dedicated placement cell then works with local industries to ensure that our graduates secure stable, well-paying employment immediately after training.",
        gallery: [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop"
        ],
        objectives: [
            "Deliver industry-relevant technical training.",
            "Enhance communication and interview skills.",
            "Facilitate direct job placements."
        ],
        stats: [
            { label: "Youths Trained", value: "1,200+" },
            { label: "Placement Rate", value: "85%" },
            { label: "Partner Companies", value: "45" }
        ]
    },
    {
        id: "community-welfare",
        title: "Community Welfare",
        category: "Community",
        icon: ShieldCheck,
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop",
        impact: "30+ neighborhoods served",
        description: "Holistic development of infrastructure and sanitation in slum areas.",
        longDescription: "A healthy environment is fundamental to progress. Our Community Welfare program focuses on upgrading basic infrastructure in marginalized neighborhoods. From installing clean drinking water stations and building public sanitation facilities to organizing massive cleanliness drives and planting trees, we strive to create safer, cleaner, and more resilient communities.",
        gallery: [
            "https://images.unsplash.com/photo-1583313262174-8fbd86fcd5dc?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop"
        ],
        objectives: [
            "Install and maintain clean drinking water units.",
            "Build and upgrade community sanitation facilities.",
            "Promote environmental awareness and tree planting."
        ],
        stats: [
            { label: "Neighborhoods Served", value: "30+" },
            { label: "Water Stations", value: "50" },
            { label: "Trees Planted", value: "5,000+" }
        ]
    }
];

export const programCategories = ["All Programs", "Education", "Health", "Community", "Women Empowerment"];
