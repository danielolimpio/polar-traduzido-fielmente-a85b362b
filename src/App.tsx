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
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import RiskDisclosure from "./pages/RiskDisclosure.tsx";
import { WhatsAppFloat } from "./components/site/WhatsAppFloat.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/tecnologia" element={<Technology />} />
          <Route path="/consultoria" element={<Consultancy />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/aviso-de-risco" element={<RiskDisclosure />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppFloat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
