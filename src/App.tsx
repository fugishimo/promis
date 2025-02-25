import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import TrendingCharts from "./pages/TrendingCharts";
import Publish from "./pages/Publish";
import LiveMarkets from "./pages/LiveMarkets";
import VerifiedAnalysts from "./pages/VerifiedAnalysts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { PrivyProvider } from '@privy-io/react-auth';
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <PrivyProvider
    appId={import.meta.env.VITE_PRIVY_APP_ID}
    config={{
      loginMethods: ['email', 'wallet','google', 'farcaster'],
      appearance: {
        theme: 'light',
        accentColor: '#0EA5E9', // Matches your primary color
        showWalletLoginFirst: false,
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/trending" element={<TrendingCharts />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/live-markets" element={<LiveMarkets />} />
            <Route path="/verified-analysts" element={<VerifiedAnalysts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </PrivyProvider>
);

export default App;
