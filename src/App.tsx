import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import MyStory from "./pages/MyStory";
import Players from "./pages/Players";
import Learn from "./pages/Learn";
import Gear from "./pages/Gear";
import Minigame from "./pages/Minigame";
import AskAI from "./pages/AskAI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/my-story" element={<MyStory />} />
            <Route path="/players" element={<Players />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/gear" element={<Gear />} />
            <Route path="/minigame" element={<Minigame />} />
            <Route path="/ask-ai" element={<AskAI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
