import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ShoppingBag, Star, Check, ChevronDown } from "lucide-react";

interface GearItem {
  id: number;
  name: string;
  category: string;
  description: string;
  whyItMatters: string;
  level: string[];
  badges: string[];
}

const gearData: GearItem[] = [
  { id: 1, name: "Basketball Shoes", category: "Footwear", description: "Proper basketball shoes provide ankle support, grip, and cushioning for explosive movements on the court.", whyItMatters: "The right shoes prevent injuries and improve your performance. They're the most important piece of gear you'll own.", level: ["Beginner", "Advanced"], badges: ["Must-have", "Performance"] },
  { id: 2, name: "Indoor/Outdoor Basketball", category: "Equipment", description: "A quality basketball with good grip and consistent bounce is essential for developing your skills.", whyItMatters: "Using a good ball helps you develop proper feel, control, and shooting consistency from day one.", level: ["Beginner"], badges: ["Must-have", "Beginner friendly"] },
  { id: 3, name: "Knee Sleeves", category: "Protection", description: "Compression knee sleeves provide support and warmth to prevent injuries during intense play.", whyItMatters: "Basketball puts tremendous stress on your knees. Prevention is always better than recovery.", level: ["Beginner", "Advanced"], badges: ["Comfort", "Protection"] },
  { id: 4, name: "Athletic Shorts", category: "Apparel", description: "Lightweight, breathable basketball shorts that allow full range of motion for running, jumping, and cutting.", whyItMatters: "Comfort and freedom of movement directly impact your ability to perform at your best.", level: ["Beginner"], badges: ["Beginner friendly", "Comfort"] },
  { id: 5, name: "Moisture-Wicking Jersey", category: "Apparel", description: "Technical fabric jerseys that pull sweat away from your body, keeping you cool and dry during intense games.", whyItMatters: "Staying dry helps you maintain grip on the ball and keeps you comfortable through long sessions.", level: ["Beginner", "Advanced"], badges: ["Performance", "Comfort"] },
  { id: 6, name: "Training Cones", category: "Training", description: "Agility cones for practicing dribbling drills, footwork patterns, and speed training.", whyItMatters: "Structured drills with cones accelerate skill development far faster than unstructured play.", level: ["Beginner", "Advanced"], badges: ["Performance", "Training"] },
  { id: 7, name: "Water Bottle (Insulated)", category: "Essentials", description: "A large, insulated water bottle to stay hydrated during practices and games.", whyItMatters: "Dehydration kills performance. Even 2% dehydration can reduce your speed and decision-making ability.", level: ["Beginner"], badges: ["Must-have", "Beginner friendly"] },
  { id: 8, name: "Sports Bag", category: "Essentials", description: "A durable, spacious sports bag with compartments for shoes, clothes, ball, and accessories.", whyItMatters: "Staying organized means you're always ready to train. No excuses.", level: ["Beginner"], badges: ["Beginner friendly"] },
  { id: 9, name: "Wristbands & Headband", category: "Accessories", description: "Absorbent wristbands and headbands to keep sweat out of your eyes and off your hands.", whyItMatters: "Small details matter. Keeping sweat managed helps maintain ball control during critical moments.", level: ["Beginner", "Advanced"], badges: ["Comfort"] },
  { id: 10, name: "Foam Roller", category: "Recovery", description: "A dense foam roller for self-myofascial release, helping muscles recover faster after training.", whyItMatters: "Recovery is part of training. Players who recover smarter, improve faster.", level: ["Advanced"], badges: ["Performance", "Recovery"] },
  { id: 11, name: "Basketball Socks", category: "Footwear", description: "Cushioned, crew-length basketball socks with arch support and moisture management.", whyItMatters: "Good socks prevent blisters, improve shoe fit, and add comfort during long sessions.", level: ["Beginner"], badges: ["Must-have", "Comfort"] },
  { id: 12, name: "Resistance Bands", category: "Training", description: "Elastic resistance bands for strength training, warm-ups, and mobility exercises.", whyItMatters: "Build sport-specific strength and prevent injuries with targeted resistance training.", level: ["Intermediate", "Advanced"], badges: ["Performance", "Training"] },
];

const gearCategories = ["All", "Footwear", "Equipment", "Apparel", "Protection", "Training", "Essentials", "Accessories", "Recovery"];

const badgeColors: Record<string, string> = {
  "Must-have": "bg-primary/15 text-primary border-primary/30",
  "Performance": "bg-accent/15 text-accent border-accent/30",
  "Beginner friendly": "bg-green-500/15 text-green-400 border-green-500/30",
  "Comfort": "bg-blue-400/15 text-blue-400 border-blue-400/30",
  "Protection": "bg-red-400/15 text-red-400 border-red-400/30",
  "Training": "bg-violet-400/15 text-violet-400 border-violet-400/30",
  "Recovery": "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
};

const Gear = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = gearData.filter((item) =>
    activeCategory === "All" || item.category === activeCategory
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">Essentials</span>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mt-3">
              BASKETBALL <span className="text-gradient-orange">GEAR</span>
            </h1>
            <p className="mt-4 text-muted-foreground font-body max-w-xl mx-auto">
              Everything you need to step onto the court with confidence. 
              Curated recommendations from beginner essentials to performance upgrades.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {gearCategories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-body font-medium uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gear Grid */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group rounded-xl bg-gradient-card border border-border/50 p-6 h-full flex flex-col"
                  >
                    {/* Icon placeholder */}
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <ShoppingBag className="text-primary" size={20} />
                    </div>

                    <h3 className="font-display text-xl text-foreground">{item.name}</h3>
                    <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mt-1">{item.category}</span>

                    <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed flex-1">{item.description}</p>

                    <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border/30">
                      <p className="text-xs text-foreground font-body font-medium mb-1">Why it matters:</p>
                      <p className="text-xs text-muted-foreground font-body leading-relaxed">{item.whyItMatters}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.badges.map((badge) => (
                        <span key={badge} className={`px-2 py-0.5 rounded-full text-[10px] font-body font-medium border ${badgeColors[badge] || "bg-secondary text-muted-foreground border-border"}`}>
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex gap-1.5">
                      {item.level.map((l) => (
                        <span key={l} className="flex items-center gap-1 text-[10px] text-muted-foreground font-body">
                          <Check size={10} className="text-primary" /> {l}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Gear;
