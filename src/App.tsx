import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import About from "./pages/About.tsx";
import Technology from "./pages/Technology.tsx";
import Consultancy from "./pages/Consultancy.tsx";
import Plans from "./pages/Plans.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import RiskDisclosure from "./pages/RiskDisclosure.tsx";
import Faq from "./pages/Faq.tsx";
import Rewards from "./pages/Rewards.tsx";
import DownloadApp from "./pages/DownloadApp.tsx";
import { WhatsAppFloat } from "./components/site/WhatsAppFloat.tsx";
import { ScrollToTop } from "./components/site/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/tecnologia" element={<Technology />} />
          <Route path="/consultoria" element={<Consultancy />} />
          <Route path="/planos" element={<Plans />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/aviso-de-risco" element={<RiskDisclosure />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/recompensas" element={<Rewards />} />
          <Route path="/baixar-app" element={<DownloadApp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppFloat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
