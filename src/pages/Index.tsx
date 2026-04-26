import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FeaturedDestination from "@/components/FeaturedDestination";
import Hero from "@/components/Hero";
import { Calendar, Palette, Sparkles, MapPin, Plane, Globe, Camera, Shield, Music, Flame, Leaf, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { label: "States Covered", value: 28, suffix: "+", icon: <MapPin className="w-7 h-7" /> },
  { label: "Tourist Places",  value: 100, suffix: "+", icon: <Camera className="w-7 h-7" /> },
  { label: "Festivals",       value: 30,  suffix: "+", icon: <Calendar className="w-7 h-7" /> },
  { label: "Art Forms",       value: 8,   suffix: "",  icon: <Palette className="w-7 h-7" /> },
];

const INDIA_FACTS = [
  "🏛️ India has 42 UNESCO World Heritage Sites",
  "🌸 India is the birthplace of Yoga & Ayurveda",
  "🎨 Over 3,000 classical dance forms across India",
  "📜 India has a civilization over 5,000 years old",
  "🌿 India produces 70% of the world's spices",
  "🎵 Carnatic & Hindustani music — 2,000+ year old traditions",
  "🏔️ The Himalayas span 2,400 km across North India",
  "💎 India was once the world's only source of diamonds",
  "🌊 India has a coastline of over 7,500 km",
  "🔭 Indian mathematician Aryabhata invented zero",
];

const WHY_INDIA = [
  { icon: <Flame className="w-6 h-6" />,  title: "Ancient Civilisation",  text: "One of the world's oldest living civilisations, with unbroken traditions dating back 5,000+ years." },
  { icon: <Music className="w-6 h-6" />,  title: "Classical Arts",        text: "Classical music, dance, theatre, and sculpture forms preserved and practised across every region." },
  { icon: <Shield className="w-6 h-6" />, title: "Epic Heritage",         text: "The Ramayana and Mahabharata — among the world's longest epics — shaped philosophy across Asia." },
  { icon: <Leaf className="w-6 h-6" />,   title: "Natural Wonders",       text: "From Himalayan peaks to tropical rainforests, deserts to coral reefs — unmatched biodiversity." },
  { icon: <Star className="w-6 h-6" />,   title: "Spiritual Capital",     text: "Birthplace of Hinduism, Buddhism, Jainism, and Sikhism — a global centre of spiritual wisdom." },
  { icon: <Globe className="w-6 h-6" />,  title: "Diverse Cultures",      text: "22 official languages, 1,600+ dialects, and hundreds of distinct regional cultures under one nation." },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let val = 0;
    const step = Math.ceil(target / (1500 / 16));
    const timer = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(timer); }
      else setCount(val);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden py-3 bg-primary/5 border-y border-primary/15 relative">
      <div className="flex animate-marquee gap-16 whitespace-nowrap">
        {[...items, ...items].map((fact, i) => (
          <span key={i} className="text-sm font-medium text-foreground/70">{fact}</span>
        ))}
      </div>
    </div>
  );
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const SectionHeader = ({
  badge, title, sub, badgeColor = "bg-primary text-white",
}: { badge: string; title: string; sub: string; badgeColor?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    className="text-center space-y-4"
  >
    <motion.span variants={fadeUp} className={`px-4 py-1 ${badgeColor} rounded-full text-sm font-medium inline-block`}>
      {badge}
    </motion.span>
    <motion.h2
      variants={fadeUp}
      className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary"
    >
      {title}
    </motion.h2>
    <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
      {sub}
    </motion.p>
  </motion.div>
);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* India Facts Marquee */}
      <Marquee items={INDIA_FACTS} />

      <main className="container mx-auto px-4 py-16 space-y-28">

        {/* Stats */}
        <section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="p-6 text-center hover:shadow-xl transition-shadow duration-300 border-primary/20 group">
                    <div className="flex justify-center mb-3 text-primary group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-primary mb-1">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Featured Destinations */}
        <section className="space-y-12 relative">
          <div className="absolute -top-10 -left-10 opacity-10 hidden lg:block">
            <Plane className="w-32 h-32 text-primary rotate-45" />
          </div>

          <SectionHeader
            badge="Discover India"
            title="Featured Destinations"
            sub="Explore the most iconic destinations that showcase India's rich cultural heritage and timeless traditions."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Taj Mahal", location: "Agra, Uttar Pradesh", imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada", description: "Symbol of eternal love, this magnificent marble monument is one of the Seven Wonders of the World." },
              { title: "Golden Temple", location: "Amritsar, Punjab", imageUrl: "https://images.unsplash.com/photo-1609766857543-a7679fddbde6", description: "A spiritual haven that represents the heart of Sikhism, radiating peace and tranquility." },
              { title: "Red Fort", location: "Old Delhi, Delhi", imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41", description: "Historic fortress that served as the main residence of Mughal Emperors and a UNESCO World Heritage site." },
            ].map((dest) => (
              <motion.div key={dest.title} variants={fadeUp}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="travel-card travel-card-hover">
                  <FeaturedDestination {...dest} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Why India */}
        <section className="space-y-12">
          <SectionHeader
            badge="Why India?"
            title="A Living Museum"
            sub="From ancient scriptures to living traditions — India is not just a country, it's a civilisation."
            badgeColor="bg-secondary text-white"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {WHY_INDIA.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(255,119,34,0.15)" }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="p-6 space-y-3 h-full border-primary/15 bg-gradient-to-br from-white to-primary/5 dark:from-gray-800 dark:to-gray-800/50">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Latest News */}
        <section className="space-y-12 relative">
          <div className="absolute -top-10 -right-10 opacity-10 hidden lg:block">
            <Globe className="w-24 h-24 text-primary" />
          </div>

          <SectionHeader
            badge="Stay Updated"
            title="Latest Cultural News"
            sub="Stay informed about the latest updates in Indian culture, heritage, and tourism."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { img: "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?w=600&auto=format&fit=crop", title: "Cultural Updates", text: "Stay updated with the latest news about cultural events, festivals, and celebrations across India." },
              { img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&auto=format&fit=crop", title: "Heritage News", text: "Get the latest updates about heritage site preservation, discoveries, and restoration projects." },
              { img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop", title: "Tourism Updates", text: "Latest information about travel guidelines, tourist attractions, and cultural tourism initiatives." },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="travel-card travel-card-hover">
                  <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card/60 backdrop-blur border-primary/20">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <img src={item.img} alt={item.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.text}</p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="text-lg h-14 px-10 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" onClick={() => navigate("/news")}>
                View All News
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Cultural Experiences */}
        <section className="space-y-12 relative">
          <SectionHeader
            badge="Cultural Experiences"
            title="Immerse in Traditions"
            sub="Experience the vibrant festivals, ancient rituals, and time-honored customs that make India unique."
            badgeColor="bg-secondary text-white"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Calendar className="w-8 h-8 text-primary mb-4" />,
                title: "Festivals & Celebrations",
                text: "From the colorful Holi to the luminous Diwali, discover the joy and meaning behind India's major festivals.",
                btn: "Explore Festivals",
                path: "/festivals",
                border: "border-primary/20",
                hover: "hover:bg-primary/10",
                bg: "from-primary/10",
              },
              {
                icon: <Palette className="w-8 h-8 text-secondary mb-4" />,
                title: "Arts & Crafts",
                text: "Explore the intricate world of Indian handicrafts, from textile weaving to pottery making.",
                btn: "Discover Crafts",
                path: "/arts",
                border: "border-secondary/20",
                hover: "hover:bg-secondary/10",
                bg: "from-secondary/10",
              },
              {
                icon: <Sparkles className="w-8 h-8 text-accent mb-4" />,
                title: "Cultural Heritage",
                text: "Discover the rich cultural heritage of India, from ancient monuments to traditional practices and wisdom.",
                btn: "Explore Heritage",
                path: "/heritage",
                border: "border-accent/20",
                hover: "hover:bg-accent/10",
                bg: "from-accent/10",
              },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeUp}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280 }}>
                  <Card className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card/60 backdrop-blur ${card.border} travel-card-hover h-full`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="p-8 space-y-5 relative">
                      {card.icon}
                      <h3 className="text-2xl font-semibold">{card.title}</h3>
                      <p className="text-muted-foreground text-lg">{card.text}</p>
                      <Button variant="outline" className={`w-full text-lg h-12 ${card.border} ${card.hover}`} onClick={() => navigate(card.path)}>
                        {card.btn}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-8 py-12 relative">
          <div className="absolute inset-0 -z-10 travel-gradient-bg opacity-10 rounded-xl" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="px-4 py-1 bg-accent text-white rounded-full text-sm font-medium inline-block mb-4">Start Your Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Explore India?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mt-4 mb-8">
              Begin your adventure through India's diverse states and discover the unique heritage each one holds.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="text-lg h-14 px-10 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" onClick={() => navigate("/states")}>
                <MapPin className="w-5 h-5 mr-2" /> Explore States
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <div className="h-2 safari-border mb-8" />
    </div>
  );
};

export default Index;
