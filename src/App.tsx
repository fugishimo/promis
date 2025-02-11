
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TrendingCharts from "./pages/TrendingCharts";
import Publish from "./pages/Publish";
import LiveMarkets from "./pages/LiveMarkets";
import VerifiedAnalysts from "./pages/VerifiedAnalysts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trending" element={<TrendingCharts />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/live-markets" element={<LiveMarkets />} />
          <Route path="/verified-analysts" element={<VerifiedAnalysts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
