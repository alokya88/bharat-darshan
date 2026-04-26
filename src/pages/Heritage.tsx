import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoricalEvent {
  title: string;
  period: string;
  description: string;
  significance: string;
  category: "Epic" | "War" | "Dynasty";
  imageUrl: string;
}

interface UnescoSite {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  mapsUrl: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Epic: "bg-primary text-white",
  War: "bg-destructive text-white",
  Dynasty: "bg-secondary text-white",
};

const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    title: "Ramayana",
    period: "Treta Yuga (Ancient Period)",
    description: "The Ramayana is an ancient Sanskrit epic that follows Prince Rama's quest to rescue his wife Sita from the demon king Ravana. Written by sage Valmiki, it contains 24,000 verses across seven books.",
    significance: "Beyond being a tale of good versus evil, the Ramayana serves as a guide to Hindu dharma, teaching values like duty, loyalty, and righteousness. Its influence extends across Southeast Asia.",
    category: "Epic",
    imageUrl: "https://images.unsplash.com/photo-1609766857543-a7679fddbde6?w=800&auto=format&fit=crop",
  },
  {
    title: "Mahabharata",
    period: "Dwapara Yuga (Ancient Period)",
    description: "The world's longest epic poem containing 100,000 verses tells the story of the Kurukshetra War between the Pandavas and Kauravas. It includes the sacred Bhagavad Gita.",
    significance: "Contains philosophical and moral teachings that remain relevant today. The Bhagavad Gita is considered one of the most important philosophical texts in Hinduism.",
    category: "Epic",
    imageUrl: "https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=800&auto=format&fit=crop",
  },
  {
    title: "Third Battle of Panipat",
    period: "1761 CE",
    description: "A pivotal battle between the Maratha Empire and Ahmad Shah Durrani's coalition forces. One of the largest battles of the 18th century with over 100,000 soldiers.",
    significance: "Changed the course of Indian history by halting Maratha expansion and weakening the Mughal Empire, indirectly paving the way for British colonization.",
    category: "War",
    imageUrl: "https://images.unsplash.com/photo-1519923834699-ef0b7cde4712?w=800&auto=format&fit=crop",
  },
  {
    title: "Mauryan Empire",
    period: "322–185 BCE",
    description: "One of ancient India's largest and most powerful dynasties, established by Chandragupta Maurya and reaching its peak under Emperor Ashoka.",
    significance: "Ashoka's pillars and rock edicts spread Buddhist teachings across Asia. The period saw significant developments in art, architecture, and governance.",
    category: "Dynasty",
    imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&auto=format&fit=crop",
  },
  {
    title: "Gupta Empire",
    period: "320–550 CE",
    description: "Known as the 'Golden Age' of India, the Gupta period saw remarkable progress in science, mathematics, astronomy, religion, and philosophy.",
    significance: "Produced great scholars like Aryabhata, Kalidasa, and Varahamihira. The period saw the creation of magnificent temples and artistic masterpieces.",
    category: "Dynasty",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop",
  },
];

const UNESCO_SITES: UnescoSite[] = [
  {
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    description: "An ivory-white marble mausoleum on the right bank of the Yamuna, commissioned in 1632 by Mughal emperor Shah Jahan in memory of his wife. A symbol of eternal love.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Taj+Mahal+Agra+India",
  },
  {
    name: "Hampi",
    location: "Karnataka",
    description: "The ruins of Hampi represent the last capital of the Vijayanagar Empire. Features stunning temple complexes, royal structures, and ancient bazaars spread over 4,100 hectares.",
    imageUrl: "https://images.unsplash.com/photo-1600697395543-5e3e55046543?w=800&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hampi+Karnataka+India",
  },
  {
    name: "Khajuraho Temples",
    location: "Madhya Pradesh",
    description: "Known for their nagara-style architectural symbolism and exquisite sculptures, these 10th–11th century temples are a testament to ancient Indian architectural genius.",
    imageUrl: "https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=800&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Khajuraho+Temples+Madhya+Pradesh+India",
  },
  {
    name: "Ajanta Caves",
    location: "Maharashtra",
    description: "30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE, with magnificent paintings and sculptures considered masterpieces of Buddhist religious art.",
    imageUrl: "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=800&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ajanta+Caves+Maharashtra+India",
  },
  {
    name: "Qutub Minar",
    location: "New Delhi",
    description: "A 73-metre tall minaret of victory built in 1193 by Qutb ud-Din Aibak after the defeat of Delhi's last Hindu kingdom — the world's tallest brick minaret.",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Qutub+Minar+New+Delhi+India",
  },
  {
    name: "Red Fort Complex",
    location: "Delhi",
    description: "The main residence of the Mughal Emperors for nearly 200 years, until 1857. The fort represents the pinnacle of Mughal architecture, creativity, and power.",
    imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Red+Fort+Delhi+India",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Heritage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&auto=format&fit=crop"
          alt="India Heritage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/90 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1 bg-primary text-white rounded-full text-sm font-medium mb-4"
          >
            Cultural Heritage
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
          >
            India's Rich Heritage
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/80 max-w-2xl text-lg"
          >
            Discover timeless traditions, ancient wisdom, and cultural treasures that make India a living museum of human civilization.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">

        {/* UNESCO World Heritage Sites */}
        <section className="space-y-10">
          <div className="text-center space-y-3">
            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">UNESCO Listed</span>
            <h2 className="text-3xl md:text-4xl font-bold">World Heritage Sites</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              India is home to 42 UNESCO World Heritage Sites — here are some of the most iconic.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UNESCO_SITES.map((site, i) => (
              <motion.div
                key={site.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 z-20 bg-primary text-white">UNESCO</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{site.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{site.location}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between gap-4">
                    <p className="text-sm text-muted-foreground">{site.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => window.open(site.mapsUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" /> View on Maps
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Historical Legacy */}
        <section className="space-y-10">
          <div className="text-center space-y-3">
            <span className="px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">Timeline</span>
            <h2 className="text-3xl md:text-4xl font-bold">Historical Legacy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the epics, battles, and dynasties that shaped India's identity over thousands of years.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HISTORICAL_EVENTS.map((event, i) => (
              <motion.div
                key={event.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="relative aspect-[16/7] overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <h3 className="text-xl font-bold text-white drop-shadow">{event.title}</h3>
                      <Badge className={CATEGORY_COLORS[event.category]}>{event.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="pt-4 space-y-3">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{event.period}</p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <div className="border-t pt-3">
                      <p className="text-xs font-semibold text-primary mb-1">Historical Significance</p>
                      <p className="text-sm text-muted-foreground">{event.significance}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cultural Pillars */}
        <section className="space-y-10">
          <div className="text-center space-y-3">
            <span className="px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">Living Traditions</span>
            <h2 className="text-3xl md:text-4xl font-bold">Pillars of Indian Culture</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Ancient Architecture", text: "From the intricate temples of Khajuraho to the rock-cut caves of Ajanta and Ellora, India's architectural heritage spans millennia, showcasing advanced engineering and deep spiritual significance.", img: "https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=600&auto=format&fit=crop" },
              { title: "Classical Arts", text: "India's classical traditions include dance forms like Bharatanatyam and Kathak, musical traditions like Carnatic and Hindustani, and various theatrical arts preserved through generations.", img: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&auto=format&fit=crop" },
              { title: "Traditional Knowledge", text: "Ancient texts like the Vedas, Upanishads, and Arthashastra contain profound knowledge about philosophy, science, mathematics, and governance. Ayurveda and Yoga continue to benefit millions worldwide.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop" },
              { title: "Living Traditions", text: "India's heritage lives on through its festivals, rituals, customs, and social practices. These traditions adapt while maintaining their core values, creating a unique blend of ancient and modern.", img: "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?w=600&auto=format&fit=crop" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 relative overflow-hidden min-h-[160px]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                    />
                  </div>
                  <CardContent className="md:w-3/5 p-6 flex flex-col justify-center space-y-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Heritage;
