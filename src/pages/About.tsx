import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  contribution: string;
  skills: string[];
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Tanishkaa Rohilla",
    role: "Backend Developer",
    image: "https://api.dicebear.com/7.x/adventurer/png?seed=Tanishkaa&backgroundColor=FFB347&hair=long19&eyes=variant12&mouth=variant26&skinColor=f2d3b1",
    contribution: "Architected and built the entire backend infrastructure of Bharat Darshan, including Firebase Firestore database design, user authentication, and real-time data services. Developed the review system, wishlist and visited places features, and ensured secure data flow throughout the application.",
    skills: ["Firebase", "Firestore", "Authentication", "Database Design", "API Integration"]
  },
  {
    name: "Manpreet",
    role: "Frontend Developer",
    image: "https://api.dicebear.com/7.x/adventurer/png?seed=Manpreet&backgroundColor=6BCB77&hair=long17&eyes=variant16&mouth=variant23&skinColor=c9a96e",
    contribution: "Designed and developed the complete user interface of Bharat Darshan using React and Tailwind CSS. Crafted responsive layouts, smooth animations, and an intuitive user experience across all pages — from the hero section to the travel dashboard — ensuring the platform is both visually appealing and easy to use.",
    skills: ["React", "Tailwind CSS", "TypeScript", "UI/UX Design", "Responsive Design"]
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container mx-auto px-4 space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 px-4 sm:px-6"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Meet Our Team
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            The Creators Behind Bharat Darshan
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base">
            We are a passionate team of developers dedicated to showcasing India's rich cultural heritage through modern technology, making it accessible and engaging for everyone.
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 h-full flex flex-col">
                {/* Top color banner */}
                <div className={`h-24 ${i === 0 ? 'bg-gradient-to-r from-primary/80 to-primary/40' : 'bg-gradient-to-r from-secondary/80 to-secondary/40'}`} />

                {/* Avatar */}
                <div className="flex justify-center -mt-12 px-6">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 rounded-full border-4 border-background shadow-lg object-cover bg-white"
                    />
                    <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-background ${i === 0 ? 'bg-primary' : 'bg-secondary'}`} />
                  </div>
                </div>

                <CardHeader className="text-center pt-3 pb-2">
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{member.name}</CardTitle>
                  <Badge
                    className={`mx-auto w-fit ${i === 0 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-secondary/10 text-secondary border-secondary/20'}`}
                    variant="outline"
                  >
                    {member.role}
                  </Badge>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col gap-4 pt-2">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                    {member.contribution}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-auto pt-2 border-t border-gray-200 dark:border-gray-600">
                    {member.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
            Our Mission
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">Why We Built This</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            India is home to one of the world's oldest and richest civilizations. Our goal with Bharat Darshan is to create an engaging digital platform that preserves and promotes this incredible heritage — making it easy for anyone to explore states, discover tourist places, learn about festivals and art forms, and plan their cultural journey across India.
          </p>
        </motion.section>

      </div>
    </div>
  );
};

export default About;
