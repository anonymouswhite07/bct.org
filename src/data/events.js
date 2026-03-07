export const eventsData = [
    {
        id: "health-camp-2026",
        title: "Community Health Camp",
        date: "2026-03-25",
        time: "09:00 AM - 04:00 PM",
        location: "Salem Community Hall",
        category: "Medical Camps",
        status: "upcoming",
        description: "Free health checkups, dental screening, and basic medicines for rural families.",
        longDescription: "Join us for our comprehensive Community Health Camp where expert volunteer doctors will provide free general check-ups, pediatric consultations, dental screenings, and eye exams. Free basic medicines and nutritional supplements will be distributed to those in need. We are aiming to serve over 500 families in the Salem district.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600&auto=format&fit=crop"
        ]
    },
    {
        id: "food-drive-april",
        title: "Food Distribution Drive",
        date: "2026-04-10",
        time: "10:00 AM - 02:00 PM",
        location: "Downtown Shelter Center",
        category: "Food Distribution",
        status: "upcoming",
        description: "Monthly ration distribution and hot meal serving for the homeless.",
        longDescription: "Our monthly food distribution drive focuses on the downtown area, providing essential dry rations (rice, lentils, oil, and spices) to 200 registered families. Additionally, our community kitchen will be serving hot, nutritious meals to approximately 300 homeless individuals. We need volunteers to help with packing and distribution.",
        image: "https://images.unsplash.com/photo-1593113563332-e1e1ba1f2214?q=80&w=1000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1616606041122-8d776b26cf9c?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop"
        ]
    },
    {
        id: "scholarship-award-2026",
        title: "Scholarship Award Program",
        date: "2026-05-15",
        time: "02:00 PM - 06:00 PM",
        location: "City Grand Auditorium",
        category: "Education Programs",
        status: "upcoming",
        description: "Annual ceremony awarding full scholarships to 50 brilliant students.",
        longDescription: "We believe financial constraints should never stop a bright mind. Join us for our annual Scholarship Award Program, where we will be presenting full-tuition scholarships to 50 exceptional students from underprivileged backgrounds. The event will feature inspiring talks from our alumni and guest dignitaries.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1546410531-bea5aad13926?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
        ]
    },
    {
        id: "volunteer-meetup-jan",
        title: "Annual Volunteer Meetup",
        date: "2026-01-20",
        time: "04:00 PM - 07:00 PM",
        location: "Trust NGO Headquarters",
        category: "Volunteers",
        status: "past",
        description: "A gathering to thank our dedicated volunteers and plan the year ahead.",
        longDescription: "Our annual strategy and appreciation meetup for our core volunteer network. We reviewed the impact of the previous year, awarded our most active community members, and brainstormed initiatives for the upcoming quarters over dinner and networking.",
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop"
        ]
    },
    {
        id: "fundraising-gala-2025",
        title: "Winter Fundraising Campaign",
        date: "2025-12-10",
        time: "06:00 PM - 10:00 PM",
        location: "Riverside Banquets",
        category: "Events",
        status: "past",
        description: "Our major winter fundraiser supporting the blanket distribution drive.",
        longDescription: "A successful evening of charity, performances, and auctions. Thanks to our generous donors, we raised enough funds to distribute 5,000 thermal blankets and winter wear to homeless individuals across the state before the severe cold wave hit.",
        image: "https://images.unsplash.com/photo-1511795409834-432f7b1728d2?q=80&w=1000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600&auto=format&fit=crop"
        ]
    }
];

// Combine all galleries from events and programs to simulate a large Cloudinary gallery
export const galleryData = [
    ...eventsData.flatMap(e => e.gallery.map(url => ({ url, category: e.category }))),
    { url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&auto=format&fit=crop", category: "Education Programs" },
    { url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=600&auto=format&fit=crop", category: "Community" },
    { url: "https://images.unsplash.com/photo-1583313262174-8fbd86fcd5dc?q=80&w=600&auto=format&fit=crop", category: "Community" },
    { url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600&auto=format&fit=crop", category: "Medical Camps" },
    { url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop", category: "Women Empowerment" },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop", category: "Education Programs" },
    { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop", category: "Education Programs" }
];

export const galleryCategories = ["All", "Events", "Education Programs", "Medical Camps", "Food Distribution", "Volunteers", "Community", "Women Empowerment"];
