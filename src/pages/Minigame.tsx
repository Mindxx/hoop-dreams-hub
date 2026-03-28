import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Gamepad2, Clock, Sparkles, ArrowRight } from "lucide-react";
import courtOverhead from "@/assets/court-overhead.jpg";

const Minigame = () => {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={courtOverhead} alt="Basketball court" className="w-full h-full object-cover opacity-20" loading="lazy" width={1200} height={600} />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <AnimatedSection>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-8"
            >
              <Gamepad2 className="text-primary" size={36} />
            </motion.div>

            <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">Coming Soon</span>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mt-3">
              BASKETBALL <span className="text-gradient-orange">MINIGAME</span>
            </h1>
            <p className="mt-6 text-muted-foreground font-body leading-relaxed max-w-md mx-auto">
              An interactive basketball minigame is being developed! Test your skills 
              with shooting challenges, dribbling drills, and more — all right here in your browser.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { icon: Sparkles, label: "Interactive Gameplay" },
                { icon: Clock, label: "Timed Challenges" },
                { icon: Gamepad2, label: "Skill Training" },
              ].map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-xl bg-gradient-card border border-border/50"
                >
                  <Icon className="text-primary mx-auto mb-2" size={20} />
                  <p className="text-xs text-muted-foreground font-body">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Game embed placeholder */}
            <div className="mt-12 aspect-video max-w-xl mx-auto rounded-xl bg-secondary/30 border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center p-8">
                <Gamepad2 className="text-muted-foreground/30 mx-auto mb-3" size={48} />
                <p className="text-sm text-muted-foreground font-body">
                  Game component will be embedded here
                </p>
                <p className="text-xs text-muted-foreground/60 font-body mt-1">
                  {/* Replace this div with your game component */}
                  Future integration point
                </p>
              </div>
            </div>

            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-sm text-primary font-body"
            >
              Stay tuned — something awesome is coming! 🏀
            </motion.p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Minigame;
