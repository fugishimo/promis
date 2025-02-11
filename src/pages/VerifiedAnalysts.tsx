
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";
import { Search, Award } from "lucide-react";

type AnalystTier = "gold" | "silver" | "bronze";

interface Analyst {
  id: number;
  name: string;
  tier: AnalystTier;
  predictions: number;
  accuracy: number;
  followers: number;
}

const mockAnalysts: Analyst[] = [
  {
    id: 1,
    name: "CryptoWhisperer",
    tier: "gold",
    predictions: 156,
    accuracy: 92,
    followers: 12500,
  },
  {
    id: 2,
    name: "TechAnalyst",
    tier: "silver",
    predictions: 98,
    accuracy: 87,
    followers: 8900,
  },
  {
    id: 3,
    name: "MarketSage",
    tier: "bronze",
    predictions: 45,
    accuracy: 82,
    followers: 4200,
  },
];

const getTierColor = (tier: AnalystTier) => {
  switch (tier) {
    case "gold":
      return "bg-yellow-100 text-yellow-800";
    case "silver":
      return "bg-neutral-100 text-neutral-800";
    case "bronze":
      return "bg-orange-100 text-orange-800";
  }
};

const VerifiedAnalysts = () => {
  const [tierFilter, setTierFilter] = useState<AnalystTier | "all">("all");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neutral-50">
        <MainNavigation />
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-neutral-900">Verified Analysts</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search analysts..."
                    className="pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-[300px]"
                  />
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                {["all", "gold", "silver", "bronze"].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setTierFilter(tier as "all" | AnalystTier)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      tierFilter === tier
                        ? "bg-primary text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </button>
                ))}
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAnalysts
                .filter((analyst) => tierFilter === "all" || analyst.tier === tierFilter)
                .map((analyst) => (
                  <div
                    key={analyst.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                          <Award className={`w-6 h-6 ${
                            analyst.tier === "gold"
                              ? "text-yellow-500"
                              : analyst.tier === "silver"
                              ? "text-neutral-500"
                              : "text-orange-500"
                          }`} />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-neutral-900">
                            {analyst.name}
                          </h2>
                          <span className={`text-xs px-2 py-1 rounded-full ${getTierColor(analyst.tier)}`}>
                            {analyst.tier.charAt(0).toUpperCase() + analyst.tier.slice(1)} Analyst
                          </span>
                        </div>
                      </div>
                      <Button variant="outline">Follow</Button>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-semibold text-neutral-900">
                          {analyst.predictions}
                        </div>
                        <div className="text-sm text-neutral-500">Predictions</div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-neutral-900">
                          {analyst.accuracy}%
                        </div>
                        <div className="text-sm text-neutral-500">Accuracy</div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-neutral-900">
                          {analyst.followers.toLocaleString()}
                        </div>
                        <div className="text-sm text-neutral-500">Followers</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default VerifiedAnalysts;
