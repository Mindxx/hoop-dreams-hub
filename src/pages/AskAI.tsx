import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "Who are the greatest basketball players of all time?",
  "How can beginners improve dribbling?",
  "What position suits my play style?",
  "How can basketball help build confidence?",
  "What gear should I buy first?",
  "What are the basic rules of basketball?",
];

const AskAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;

    const userMsg: Message = { id: Date.now(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated AI response (replace with real API later)
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: `Thank you for your question about "${content.slice(0, 50)}..." — This is a placeholder response. Connect your preferred AI API (OpenAI, Anthropic, etc.) to enable real basketball Q&A. The interface is ready for integration!`,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Layout>
      <section className="pt-20 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 md:px-6 flex flex-col flex-1 max-w-3xl">
          {/* Header */}
          <div className="pt-8 pb-4 text-center">
            <AnimatedSection>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <Bot className="text-primary" size={28} />
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-foreground">
                ASK <span className="text-gradient-orange">AI</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground font-body">
                Your personal basketball knowledge assistant
              </p>
              <div className="mt-2 p-2 rounded-lg bg-secondary/50 border border-border/30 inline-block">
                <p className="text-[10px] text-muted-foreground font-body">
                  ⚡ UI ready — connect your AI API to enable real responses
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 min-h-[40vh]">
            {messages.length === 0 && (
              <AnimatedSection className="text-center py-12">
                <Sparkles className="text-muted-foreground/30 mx-auto mb-4" size={40} />
                <p className="text-muted-foreground font-body text-sm mb-6">
                  Ask anything about basketball — history, skills, players, gear, or confidence tips.
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                  {suggestedQuestions.map((q) => (
                    <motion.button
                      key={q}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSend(q)}
                      className="px-3 py-2 rounded-lg bg-secondary border border-border text-xs font-body text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all text-left"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </AnimatedSection>
            )}

            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user" ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    {msg.role === "user" ? (
                      <User size={14} className="text-primary" />
                    ) : (
                      <Bot size={14} className="text-muted-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[80%] px-4 py-3 rounded-xl text-sm font-body leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm border border-border/50"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Bot size={14} className="text-muted-foreground" />
                </div>
                <div className="px-4 py-3 rounded-xl bg-secondary border border-border/50 rounded-bl-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="sticky bottom-0 pb-6 pt-4 bg-gradient-to-t from-background via-background to-transparent">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about basketball..."
                className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                aria-label="Send message"
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </motion.button>
            </form>

            {messages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/30 text-[10px] font-body text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AskAI;
