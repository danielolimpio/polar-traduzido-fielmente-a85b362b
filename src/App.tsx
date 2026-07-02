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
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import { WhatsAppFloat } from "./components/site/WhatsAppFloat.tsx";
import { ScrollToTop } from "./components/site/ScrollToTop.tsx";
import { LangFromPathSync } from "./components/site/LangFromPathSync.tsx";
import { LANGS, ROUTE_SLUGS, RouteKey, langPrefix } from "./lib/routes.ts";

const queryClient = new QueryClient();

const PAGE_BY_KEY: Record<RouteKey, JSX.Element> = {
  home: <Index />,
  about: <About />,
  technology: <Technology />,
  consultancy: <Consultancy />,
  plans: <Plans />,
  rewards: <Rewards />,
  privacy: <Privacy />,
  terms: <Terms />,
  risk: <RiskDisclosure />,
  faq: <Faq />,
  downloadApp: <DownloadApp />,
  blog: <Blog />,
};

const buildRoutes = () => {
  const nodes: JSX.Element[] = [];
  for (const lang of LANGS) {
    const prefix = langPrefix(lang); // "" para pt, "/en" ou "/es"
    for (const key of Object.keys(PAGE_BY_KEY) as RouteKey[]) {
      const slug = ROUTE_SLUGS[key][lang];
      const path = key === "home" ? prefix || "/" : `${prefix}/${slug}`;
      nodes.push(<Route key={`${lang}-${key}`} path={path} element={PAGE_BY_KEY[key]} />);
      if (key === "blog") {
        nodes.push(
          <Route
            key={`${lang}-blog-post`}
            path={`${prefix}/${slug}/:slug`}
            element={<BlogPost />}
          />,
        );
      }
    }
  }
  return nodes;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <LangFromPathSync />
        <Routes>
          {buildRoutes()}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppFloat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
