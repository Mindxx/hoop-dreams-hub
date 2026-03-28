import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Search, Filter, X, Trophy, MapPin, Star } from "lucide-react";
import playerDunk from "@/assets/player-dunk.jpg";
import basketballCloseup from "@/assets/basketball-closeup.jpg";
import teamHuddle from "@/assets/team-huddle.jpg";

interface Player {
  id: number;
  name: string;
  position: string;
  nationality: string;
  team: string;
  era: string;
  summary: string;
  achievements: string[];
  style: string;
  image: string;
}

const playersData: Player[] = [
  { id: 1, name: "Michael Jordan", position: "Shooting Guard", nationality: "USA", team: "Chicago Bulls", era: "1980s-1990s", summary: "Widely considered the greatest basketball player of all time. His Airness dominated the NBA with six championships.", achievements: ["6× NBA Champion", "5× MVP", "14× All-Star", "10× Scoring Champion"], style: "Mid-range assassin, unmatched competitiveness", image: playerDunk },
  { id: 2, name: "LeBron James", position: "Small Forward", nationality: "USA", team: "Los Angeles Lakers", era: "2000s-Present", summary: "The King. A once-in-a-generation talent who has redefined longevity and all-around excellence in basketball.", achievements: ["4× NBA Champion", "4× MVP", "20× All-Star", "All-Time Leading Scorer"], style: "Unstoppable driving force, elite court vision", image: teamHuddle },
  { id: 3, name: "Kobe Bryant", position: "Shooting Guard", nationality: "USA", team: "Los Angeles Lakers", era: "1990s-2010s", summary: "The Black Mamba. Known for his relentless work ethic and killer instinct, Kobe inspired millions worldwide.", achievements: ["5× NBA Champion", "2× Finals MVP", "18× All-Star", "1× MVP"], style: "Mamba Mentality — unmatched dedication", image: basketballCloseup },
  { id: 4, name: "Stephen Curry", position: "Point Guard", nationality: "USA", team: "Golden State Warriors", era: "2010s-Present", summary: "The greatest shooter in NBA history. Curry revolutionized basketball with his limitless three-point range.", achievements: ["4× NBA Champion", "2× MVP", "10× All-Star", "All-Time 3PT Leader"], style: "Three-point revolution, handles and finesse", image: playerDunk },
  { id: 5, name: "Magic Johnson", position: "Point Guard", nationality: "USA", team: "Los Angeles Lakers", era: "1980s", summary: "A 6'9\" point guard who could play all five positions. Magic's showtime style electrified the NBA.", achievements: ["5× NBA Champion", "3× MVP", "12× All-Star", "All-Time Assists Leader"], style: "Showtime passing, versatile big-man point guard", image: teamHuddle },
  { id: 6, name: "Tim Duncan", position: "Power Forward", nationality: "US Virgin Islands", team: "San Antonio Spurs", era: "1990s-2010s", summary: "The Big Fundamental. Quietly dominated for two decades with fundamentally perfect basketball.", achievements: ["5× NBA Champion", "2× MVP", "15× All-Star", "3× Finals MVP"], style: "Bank shot master, ultimate teammate", image: basketballCloseup },
  { id: 7, name: "Hakeem Olajuwon", position: "Center", nationality: "Nigeria", team: "Houston Rockets", era: "1980s-1990s", summary: "The Dream. His legendary footwork and shot-blocking made him one of the most complete centers ever.", achievements: ["2× NBA Champion", "1× MVP", "12× All-Star", "2× DPOY"], style: "Dream Shake, elite footwork and defense", image: playerDunk },
  { id: 8, name: "Giannis Antetokounmpo", position: "Power Forward", nationality: "Greece", team: "Milwaukee Bucks", era: "2010s-Present", summary: "The Greek Freak. From unknown prospect to NBA champion, Giannis embodies relentless improvement.", achievements: ["1× NBA Champion", "2× MVP", "8× All-Star", "1× DPOY"], style: "Unstoppable transition force, freakish athleticism", image: teamHuddle },
  { id: 9, name: "Larry Bird", position: "Small Forward", nationality: "USA", team: "Boston Celtics", era: "1980s", summary: "Larry Legend. One of the greatest shooters and competitors the game has ever seen.", achievements: ["3× NBA Champion", "3× MVP", "12× All-Star", "2× Finals MVP"], style: "Clutch shooting, trash-talking legend", image: basketballCloseup },
];

const positions = ["All", "Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"];
const eras = ["All", "1980s", "1980s-1990s", "1990s-2010s", "2000s-Present", "2010s-Present"];

const Players = () => {
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filtered = useMemo(() => {
    return playersData.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.team.toLowerCase().includes(search.toLowerCase());
      const matchPos = selectedPosition === "All" || p.position === selectedPosition;
      return matchSearch && matchPos;
    });
  }, [search, selectedPosition]);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">Hall of Fame</span>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mt-3">
              LEGENDARY <span className="text-gradient-orange">PLAYERS</span>
            </h1>
            <p className="mt-4 text-muted-foreground font-body max-w-xl mx-auto">
              Discover the greatest basketball players who shaped the game and inspired millions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search players or teams..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Position filter */}
              <div className="flex flex-wrap gap-2">
                {positions.map((pos) => (
                  <motion.button
                    key={pos}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPosition(pos)}
                    className={`px-4 py-2 rounded-lg text-xs font-body font-medium uppercase tracking-wider transition-all ${
                      selectedPosition === pos
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                    }`}
                  >
                    {pos}
                  </motion.button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Player Grid */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((player, i) => (
                <motion.div
                  key={player.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedPlayer(player)}
                    className="group rounded-xl overflow-hidden bg-gradient-card border border-border/50 cursor-pointer h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <div className="absolute top-3 right-3 px-2 py-1 rounded bg-primary/20 backdrop-blur-sm">
                        <span className="text-[10px] font-body font-semibold uppercase text-primary">{player.position}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl text-foreground">{player.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-body">{player.nationality}</span>
                        <span className="text-border">•</span>
                        <Trophy size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-body">{player.team}</span>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground font-body leading-relaxed line-clamp-2">{player.summary}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <AnimatedSection className="text-center py-20">
              <p className="text-muted-foreground font-body">No players found. Try adjusting your search or filters.</p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Player Detail Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedPlayer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative h-56">
                <img src={selectedPlayer.image} alt={selectedPlayer.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-6">
                <h2 className="font-display text-3xl text-foreground">{selectedPlayer.name}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">{selectedPlayer.position}</span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-body">{selectedPlayer.nationality}</span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-body">{selectedPlayer.era}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground font-body leading-relaxed">{selectedPlayer.summary}</p>
                <div className="mt-4">
                  <h4 className="font-display text-sm text-foreground uppercase tracking-wider">Signature Style</h4>
                  <p className="mt-1 text-sm text-primary font-body">{selectedPlayer.style}</p>
                </div>
                <div className="mt-4">
                  <h4 className="font-display text-sm text-foreground uppercase tracking-wider">Key Achievements</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedPlayer.achievements.map((a) => (
                      <span key={a} className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-xs font-body text-accent">
                        <Star size={10} /> {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Players;
