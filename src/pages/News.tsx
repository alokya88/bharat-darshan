import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, Calendar, AlertTriangle, Filter, Newspaper } from "lucide-react";
import {
  fetchIndianCultureNews,
  formatPublishedDate,
  getFallbackImageUrl,
  NewsArticle,
  NewsCategory,
} from "@/data/newsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" } }),
};

const News = () => {
  const [news, setNews]         = useState<NewsArticle[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    const getNews = async () => {
      try {
        setLoading(true);
        const articles = await fetchIndianCultureNews(selectedCategory);
        setNews(articles);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, [selectedCategory]);

  const handleImageLoad = (id: string) => setImagesLoaded(prev => ({ ...prev, [id]: true }));
  const getArticleId   = (a: NewsArticle) => `${a.source.name}-${a.publishedAt}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">

      {/* Hero Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&auto=format&fit=crop"
          alt="News"
          className="w-full h-full object-cover animate-kenburns"
          style={{ filter: "brightness(0.5)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background/95 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1 bg-primary text-white rounded-full text-sm font-medium mb-3 inline-flex items-center gap-2"
          >
            <Newspaper className="w-3.5 h-3.5" /> Stay Informed
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg font-['Poppins']"
          >
            Latest News & Updates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-white/80 max-w-xl text-sm md:text-base"
          >
            Indian culture, heritage preservation, and tourism — curated and updated daily.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-8">

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4 text-primary" /> Filter by:
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {(["all", "culture", "heritage", "tourism"] as const).map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 capitalize ${
                  selectedCategory === cat
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/30"
                    : "bg-white dark:bg-gray-800 text-muted-foreground border-border hover:border-primary/40 dark:text-gray-300"
                }`}
              >
                {cat === "all" ? "🌐 All" : cat === "culture" ? "🎨 Culture" : cat === "heritage" ? "🏛️ Heritage" : "✈️ Tourism"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-destructive/10 text-destructive p-6 rounded-lg max-w-3xl mx-auto text-center space-y-3">
            <AlertTriangle className="h-10 w-10 mx-auto" />
            <p className="font-medium">{error}</p>
            <p className="text-sm opacity-80">Check your NewsAPI key and try again.</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No news articles found. Please check your API key and try again.
          </div>
        )}

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article, i) => {
            const id = getArticleId(article);
            return (
              <motion.div
                key={id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
              >
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 16px 36px rgba(10,159,143,0.15)" }}
                  transition={{ type: "spring", stiffness: 280 }}
                >
                  <Card className="overflow-hidden group bg-white dark:bg-gray-800 flex flex-col h-full">

                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transition-opacity duration-300 ${imagesLoaded[id] ? "opacity-0" : "opacity-100"}`} />
                      <img
                        src={article.urlToImage || getFallbackImageUrl()}
                        alt={article.title}
                        onLoad={() => handleImageLoad(id)}
                        className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ${imagesLoaded[id] ? "opacity-100" : "opacity-0"}`}
                      />
                    </div>

                    {/* Header */}
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400">
                          <Calendar className="h-3 w-3" /> {formatPublishedDate(article.publishedAt)}
                        </span>
                        <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-200">
                          {article.source.name}
                        </Badge>
                      </div>
                      <CardTitle className="text-base leading-snug line-clamp-2 text-gray-900 dark:text-white">
                        {article.title}
                      </CardTitle>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="flex-grow pt-0">
                      <ScrollArea className="h-[100px] pr-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {article.description || "No description available."}
                        </p>
                      </ScrollArea>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="pt-2 pb-4">
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-primary/30 text-primary dark:text-teal-400 dark:border-teal-500/40 hover:bg-primary hover:text-white dark:hover:bg-teal-600 dark:hover:text-white transition-colors duration-200 bg-transparent"
                        onClick={() => window.open(article.url, "_blank")}
                      >
                        Read Full Article <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {!loading && !error && news.length > 0 && (
          <p className="text-center text-xs text-muted-foreground pt-4">News provided by NewsAPI.org</p>
        )}
      </div>
    </div>
  );
};

export default News;
