
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";
import { Search, Filter } from "lucide-react";

interface ChartPost {
  id: number;
  title: string;
  analyst: string;
  category: "Crypto" | "Stocks" | "Commodities" | "Macro";
  timePosted: string;
  engagement: {
    upvotes: number;
    comments: number;
    views: number;
  };
}

const mockTrendingCharts: ChartPost[] = [
  {
    id: 1,
    title: "BTC/USD Breaking Key Resistance",
    analyst: "CryptoWhisperer",
    category: "Crypto",
    timePosted: "2h ago",
    engagement: {
      upvotes: 1240,
      comments: 89,
      views: 5600,
    },
  },
  {
    id: 2,
    title: "S&P500 Technical Analysis",
    analyst: "TechAnalyst",
    category: "Stocks",
    timePosted: "4h ago",
    engagement: {
      upvotes: 890,
      comments: 45,
      views: 3200,
    },
  },
];

const TrendingCharts = () => {
  const [timeFilter, setTimeFilter] = useState<"24h" | "7d" | "30d">("24h");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neutral-50">
        <MainNavigation />
        <main className="flex-1 p-6">
          <div className="max-w-[1400px] mx-auto">
            <header className="mb-8">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-neutral-900">Trending Charts</h1>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search charts..."
                      className="pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-[300px]"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex space-x-4">
                  {["24h", "7d", "30d"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeFilter(period as "24h" | "7d" | "30d")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        timeFilter === period
                          ? "bg-primary text-white"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {["All", "Crypto", "Stocks", "Commodities", "Macro"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setCategoryFilter(category.toLowerCase())}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        categoryFilter === category.toLowerCase()
                          ? "bg-accent text-white"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <div className="flex gap-6">
              <div className="flex-1 space-y-6">
                {mockTrendingCharts.map((chart) => (
                  <article
                    key={chart.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                          {chart.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="font-medium text-primary">
                            {chart.analyst}
                          </span>
                          <span className="text-neutral-500">{chart.timePosted}</span>
                          <span className="px-2 py-1 bg-neutral-100 rounded-full text-neutral-600">
                            {chart.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-neutral-500">
                      <span>{chart.engagement.upvotes} upvotes</span>
                      <span>{chart.engagement.comments} comments</span>
                      <span>{chart.engagement.views} views</span>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="w-[300px] min-w-[300px]">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                    Top Analysts
                  </h2>
                  <div className="space-y-4">
                    {["CryptoWhisperer", "TechAnalyst", "MarketSage"].map(
                      (analyst, index) => (
                        <div
                          key={analyst}
                          className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-neutral-500">#{index + 1}</span>
                            <span className="font-medium text-neutral-900">
                              {analyst}
                            </span>
                          </div>
                          <button className="text-sm text-primary hover:text-primary-dark">
                            Follow
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TrendingCharts;
