import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Compass, Star } from "lucide-react";
import { useRef } from "react";

const ORBS = [
  { size: 220, x: "8%",  y: "18%", color: "from-teal-400/40 to-teal-400/5",       delay: 0,   dur: 7  },
  { size: 160, x: "82%", y: "12%", color: "from-blue-500/35 to-blue-500/5",        delay: 1.2, dur: 9  },
  { size: 280, x: "70%", y: "62%", color: "from-amber-400/20 to-transparent",      delay: 2,   dur: 8  },
  { size: 130, x: "18%", y: "72%", color: "from-teal-300/25 to-transparent",       delay: 0.6, dur: 10 },
  { size: 90,  x: "48%", y: "8%",  color: "from-cyan-400/30 to-transparent",       delay: 1.8, dur: 6  },
  { size: 200, x: "55%", y: "80%", color: "from-indigo-400/20 to-transparent",     delay: 3,   dur: 8  },
];

const QUICK_STATS = [
  { value: "28+",  label: "States" },
  { value: "42",   label: "UNESCO Sites" },
  { value: "22+",  label: "Languages" },
  { value: "1.4B", label: "People" },
];

const Hero = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fadeY = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center animate-kenburns"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2070&q=80')`,
            filter: "brightness(0.55)",
          }}
        />
      </motion.div>

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-background" />
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/30 via-transparent to-blue-900/20 mix-blend-overlay" />

      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl bg-gradient-radial ${orb.color}`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ y: [0, -24, 0], x: [0, 12, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Main content fades out on scroll */}
      <motion.div style={{ opacity: fadeY }} className="relative z-10 container mx-auto px-4 text-center text-white">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 mb-6 bg-white/10 border border-white/25 rounded-full backdrop-blur-sm"
        >
          <Compass className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium tracking-wider uppercase text-white/90">Incredible India</span>
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
        </motion.div>

        {/* Headline — word by word */}
        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl mx-auto leading-tight font-['Poppins'] mb-6">
          {[
            { word: "Discover", gradient: false },
            { word: "the",      gradient: false },
          ].map(({ word }, i) => (
            <motion.span
              key={word + i}
              className="inline-block mr-3 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              {word}
            </motion.span>
          ))}
          <br className="hidden md:block" />
          {[
            { word: "Rich",     gradient: true },
            { word: "Cultural", gradient: true },
            { word: "Heritage", gradient: true },
          ].map(({ word }, i) => (
            <motion.span
              key={word + i}
              className="inline-block mr-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-amber-400 to-secondary animate-gradient-x"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 2) * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              {word}
            </motion.span>
          ))}
          <br className="hidden md:block" />
          {[
            { word: "of",    gradient: false },
            { word: "India", gradient: false },
          ].map(({ word }, i) => (
            <motion.span
              key={word + i}
              className="inline-block mr-3 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 5) * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="text-xl md:text-2xl max-w-2xl mx-auto text-white/85 leading-relaxed mb-10"
        >
          Embark on a journey through time-honored traditions, magnificent monuments, and vibrant celebrations across the land of diversity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              className="india-button text-lg h-14 px-10 font-semibold tracking-wide shadow-2xl shadow-primary/40"
              onClick={() => navigate("/states")}
            >
              <MapPin className="mr-2 w-5 h-5" /> Explore States
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              className="india-button-outline text-lg h-14 px-10 font-semibold tracking-wide text-white border-white/50 hover:bg-white/10"
              onClick={() => navigate("/heritage")}
            >
              <span className="mr-2">✦</span> Discover Heritage
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex justify-center gap-6 md:gap-12"
        >
          {QUICK_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.4, type: "spring" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-primary drop-shadow">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-3 rangoli-border" />
    </div>
  );
};

export default Hero;
