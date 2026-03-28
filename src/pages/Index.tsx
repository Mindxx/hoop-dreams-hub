import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, ChevronDown, ArrowRight, Zap, Target, Users, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroImage from "@/assets/hero-basketball.jpg";
import playerDunk from "@/assets/player-dunk.jpg";
import teamHuddle from "@/assets/team-huddle.jpg";
import courtOverhead from "@/assets/court-overhead.jpg";
import basketballCloseup from "@/assets/basketball-closeup.jpg";

const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => (
  <motion.div className={`overflow-hidden ${className}`}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 + i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.div>
);

const Marquee = () => {
  const items = ["BASKETBALL", "•", "CONFIDENCE", "•", "GROWTH", "•", "PASSION", "•", "DISCIPLINE", "•", "COMMUNITY", "•"];
  return (
    <div className="overflow-hidden py-4 border-y border-border/30 bg-secondary/20">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`mx-4 font-display text-xl tracking-widest ${item === "•" ? "text-primary" : "text-muted-foreground/50"}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const featuredPlayers = [
    { name: "Michael Jordan", subtitle: "The Greatest of All Time", image: playerDunk },
    { name: "LeBron James", subtitle: "The King", image: teamHuddle },
    { name: "Kobe Bryant", subtitle: "Mamba Mentality", image: basketballCloseup },
  ];

  const features = [
    { icon: Zap, title: "Build Confidence", desc: "Push past self-doubt and discover your inner strength through the discipline of basketball." },
    { icon: Target, title: "Set Goals", desc: "Every shot, every drill teaches you to aim higher and never give up on your dreams." },
    { icon: Users, title: "Find Community", desc: "Join a global community of players who support and push each other to grow." },
    { icon: Trophy, title: "Achieve Greatness", desc: "Transform challenges into victories, both on and off the court." },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={heroImage} alt="Basketball court with dramatic lighting" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
        </motion.div>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {[
            { icon: isPlaying ? Pause : Play, onClick: () => setIsPlaying(!isPlaying), label: isPlaying ? "Pause" : "Play" },
            { icon: isMuted ? VolumeX : Volume2, onClick: () => setIsMuted(!isMuted), label: isMuted ? "Unmute" : "Mute" },
          ].map(({ icon: Icon, onClick, label }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClick}
              className="w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:text-primary transition-colors border border-border/30"
              aria-label={label}
            >
              <Icon size={16} />
            </motion.button>
          ))}
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">
              More Than A Sport
            </span>
          </motion.div>

          <AnimatedText
            text="BEYOND THE COURT"
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-none"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed"
          >
            Where passion meets purpose. Discover how basketball transforms 
            insecurity into confidence, and self-doubt into unstoppable drive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/my-story">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider glow-orange transition-all hover:brightness-110"
              >
                Read My Story
              </motion.button>
            </Link>
            <Link to="/learn">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-lg bg-secondary border border-border text-foreground font-body font-semibold text-sm uppercase tracking-wider hover:bg-secondary/80 transition-all"
              >
                Start Learning
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="text-muted-foreground" size={24} />
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Why Basketball Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">Why It Matters</span>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mt-3">
              BASKETBALL BUILDS <span className="text-gradient-orange">CHARACTER</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-body max-w-xl mx-auto">
              It's not just about scoring points. It's about building the mindset 
              to face life's challenges head-on.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-xl bg-gradient-card border border-border/50 group cursor-default h-full"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                  >
                    <feature.icon className="text-primary" size={22} />
                  </motion.div>
                  <h3 className="font-display text-xl text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Image Break */}
      <section className="relative h-[50vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <img src={courtOverhead} alt="Basketball court overhead" className="w-full h-full object-cover" loading="lazy" width={1200} height={600} />
          <div className="absolute inset-0 bg-background/60" />
        </motion.div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <AnimatedSection className="text-center">
            <blockquote className="font-display text-3xl md:text-5xl text-foreground max-w-3xl px-4">
              "I CAN ACCEPT FAILURE. BUT I CAN'T ACCEPT <span className="text-gradient-orange">NOT TRYING</span>."
            </blockquote>
            <p className="mt-4 text-muted-foreground font-body text-sm tracking-wider uppercase">— Michael Jordan</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 border-y border-border/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter target={450} suffix="M+" label="Players Worldwide" />
            <AnimatedCounter target={200} suffix="+" label="Countries Playing" />
            <AnimatedCounter target={75} suffix="+" label="Years of NBA History" />
            <AnimatedCounter target={100} suffix="%" label="Heart & Passion" />
          </div>
        </div>
      </section>

      {/* Featured Players Preview */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">Legends</span>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mt-3">
                ICONIC <span className="text-gradient-orange">PLAYERS</span>
              </h2>
            </div>
            <Link to="/players" className="mt-4 md:mt-0 group flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors">
              View all players <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPlayers.map((player, i) => (
              <AnimatedSection key={player.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -12 }}
                  className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
                >
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl md:text-3xl text-foreground">{player.name}</h3>
                    <p className="text-sm text-primary font-body mt-1">{player.subtitle}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} className="text-primary" />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Teaser */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">My Journey</span>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mt-3 leading-tight">
                FROM SELF-DOUBT TO <span className="text-gradient-orange">SELF-BELIEF</span>
              </h2>
              <p className="mt-6 text-muted-foreground font-body leading-relaxed">
                I used to struggle with confidence. Basketball didn't just teach me 
                how to dribble — it taught me how to believe in myself. Every missed 
                shot became a lesson. Every practice session became a step forward.
              </p>
              <p className="mt-4 text-muted-foreground font-body leading-relaxed">
                This website is my way of sharing that journey and inspiring others 
                to discover what basketball can unlock within them.
              </p>
              <Link to="/my-story">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider glow-orange"
                >
                  Read My Full Story
                </motion.button>
              </Link>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="rounded-xl overflow-hidden"
                >
                  <img src={teamHuddle} alt="Team unity" className="w-full h-80 md:h-96 object-cover" loading="lazy" width={800} height={600} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 px-6 py-4 rounded-lg bg-card border border-border shadow-xl"
                >
                  <p className="font-display text-lg text-primary">"Never give up."</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">My personal motto</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center">
            <h2 className="font-display text-4xl md:text-6xl text-foreground">
              READY TO START YOUR <span className="text-gradient-orange">JOURNEY</span>?
            </h2>
            <p className="mt-4 text-muted-foreground font-body max-w-lg mx-auto">
              Whether you're picking up a basketball for the first time or looking 
              for inspiration, this is your space.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/learn">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider glow-orange"
                >
                  Start Learning
                </motion.button>
              </Link>
              <Link to="/ask-ai">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-lg bg-secondary border border-border text-foreground font-body font-semibold text-sm uppercase tracking-wider hover:bg-secondary/80 transition-all"
                >
                  Ask AI
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
