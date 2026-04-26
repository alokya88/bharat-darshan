import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getArtImageUrl } from "@/data/artsImages";
import { motion } from "framer-motion";
import { Palette, MapPin, Star } from "lucide-react";

interface ArtForm {
  name: string;
  state: string;
  history: string;
  description: string;
  materials: string[];
  significance: string;
}

export const ARTS_DATA: ArtForm[] = [
  {
    name: "Madhubani Painting",
    state: "Bihar",
    history: "Dating back to the time of Ramayana, these paintings were traditionally created by women on freshly plastered mud walls of homes.",
    description: "Characterized by geometric patterns, natural elements like fish, birds, and flowers, and mythological scenes using vibrant natural colors.",
    materials: ["Natural dyes", "Twigs", "Fingers", "Matchsticks", "Handmade paper"],
    significance: "Originally done to mark special occasions and ceremonies, now represents Bihar's cultural identity."
  },
  {
    name: "Tanjore Painting",
    state: "Tamil Nadu",
    history: "Originated in the 16th century under the patronage of the Nayak rulers in Thanjavur.",
    description: "Known for its rich, flat colors, decorative jewelry with precious stones, and use of gold foil overlay.",
    materials: ["Gold foil", "Glass beads", "Precious stones", "Wood panel", "Canvas"],
    significance: "Traditional art form depicting Hindu gods, goddesses, and saints, showcasing the rich cultural heritage of South India."
  },
  {
    name: "Pashmina Shawls",
    state: "Kashmir",
    history: "The art of making Pashmina dates back to the 3rd century BC, gained prominence during the Mughal era.",
    description: "Ultra-fine cashmere wool shawls known for their warmth, lightness, and intricate embroidery.",
    materials: ["Pashmina wool", "Natural dyes", "Silk threads"],
    significance: "Symbol of Kashmiri craftsmanship and luxury, integral to the region's economy and cultural identity."
  },
  {
    name: "Bidri Work",
    state: "Karnataka",
    history: "Developed in the 14th century during the reign of the Bahmani Sultans in Bidar.",
    description: "Metal handicraft featuring intricate designs inlaid with silver wire on blackened alloy of zinc and copper.",
    materials: ["Zinc", "Copper", "Silver wire", "Soil from Bidar fort"],
    significance: "Unique metalwork that represents the fusion of Persian and Indian craftsmanship."
  },
  {
    name: "Phulkari",
    state: "Punjab",
    history: "Traditional embroidery craft that gained prominence in the 15th century, originally made by women for their daughters' weddings.",
    description: "Vibrant embroidery work using bright colored threads on hand-spun cotton fabric, creating geometric patterns.",
    materials: ["Cotton fabric", "Silk threads", "Mirror work"],
    significance: "Essential part of Punjabi culture, traditionally given as part of a bride's trousseau."
  },
  {
    name: "Blue Pottery",
    state: "Rajasthan",
    history: "Originated in Persia, brought to Jaipur by Raja Ram Singh in the 17th century.",
    description: "Distinctive blue-turquoise glazed pottery with Persian and Chinese influences.",
    materials: ["Quartz stone powder", "Glass", "Natural colors", "Fuller's earth"],
    significance: "One of the few ceramics in the world made without clay, represents Jaipur's artistic heritage."
  },
  {
    name: "Pattachitra",
    state: "Odisha",
    history: "Ancient cloth-based scroll painting dating back to 5th century BC, traditionally created for the Jagannath Temple.",
    description: "Intricate paintings depicting mythological narratives and folktales using natural colors on treated cloth.",
    materials: ["Cotton cloth", "Natural colors", "Stone colors", "Tamarind seed glue"],
    significance: "Integral part of Odishan culture and Jagannath tradition."
  },
  {
    name: "Warli Painting",
    state: "Maharashtra",
    history: "Tribal art form dating back to 10th century AD, traditionally painted on walls of tribal homes.",
    description: "Simple white geometric shapes depicting daily life scenes and natural elements on earthy background.",
    materials: ["Rice paste", "Bamboo sticks", "Red ochre", "Cow dung base"],
    significance: "Represents the rich tribal heritage and their harmony with nature."
  }
];

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.09, duration: 0.55, ease: "easeOut" } }),
};

const Arts = () => {
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageLoad = (artName: string) => {
    setImagesLoaded(prev => ({ ...prev, [artName]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=1600&auto=format&fit=crop"
          alt="Indian Arts"
          className="w-full h-full object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/95 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1 bg-secondary text-white rounded-full text-sm font-medium mb-4 inline-flex items-center gap-2"
          >
            <Palette className="w-3.5 h-3.5" /> Living Traditions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg font-['Poppins']"
          >
            Indian Arts & Crafts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-white/80 max-w-xl text-base"
          >
            {ARTS_DATA.length} ancient art forms preserved across generations — each a window into a unique regional soul.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto space-y-3"
        >
          <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium inline-block">
            Handcrafted Masterpieces
          </span>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explore the rich artistic heritage of India, where each state contributes unique art forms passed down through generations — telling stories of culture, faith, and daily life.
          </p>
        </motion.div>

        {/* Arts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ARTS_DATA.map((art, i) => (
            <motion.div
              key={art.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <motion.div whileHover={{ y: -7, boxShadow: "0 24px 48px rgba(19,136,8,0.12)" }} transition={{ type: "spring", stiffness: 280 }}>
                <Card className="overflow-hidden group cursor-pointer bg-white dark:bg-gray-800 h-full flex flex-col">

                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transition-opacity duration-300 ${imagesLoaded[art.name] ? "opacity-0" : "opacity-100"}`} />
                    <img
                      src={getArtImageUrl(art.name)}
                      alt={`${art.name} art form`}
                      onLoad={() => handleImageLoad(art.name)}
                      className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ${imagesLoaded[art.name] ? "opacity-100" : "opacity-0"}`}
                    />
                    <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
                      <Badge className="bg-secondary/90 text-white text-xs border-0">
                        <MapPin className="w-3 h-3 mr-1" />{art.state}
                      </Badge>
                    </div>
                  </div>

                  {/* Header */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{art.name}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {art.materials.slice(0, 3).map(m => (
                        <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>
                      ))}
                    </div>
                  </CardHeader>

                  {/* Content */}
                  <CardContent className="flex-1">
                    <ScrollArea className="h-[200px] pr-3">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">History</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{art.history}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Description</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{art.description}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">Cultural Significance</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{art.significance}</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arts;
