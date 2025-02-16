
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";
import { Newspaper, Plus, MoreHorizontal, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Feed from "@/components/Feed";

type TimePeriod = "24h" | "7d" | "90d" | "1y" | "all";

interface WatchlistItem {
  id: string;
  type: "STOCKS" | "FUTURES" | "FOREX" | "CRYPTO";
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  icon?: string;
}

const LiveMarkets = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("24h");
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set(["STOCKS", "FUTURES", "CRYPTO"]));
  const [items] = useState<WatchlistItem[]>([
    {
      id: "1",
      type: "STOCKS",
      symbol: "NFLX",
      name: "Netflix",
      price: 1058.60,
      change: 14.91,
      changePercent: 1.43,
    },
    {
      id: "2",
      type: "FUTURES",
      symbol: "USOIL",
      name: "Crude Oil",
      price: 70.49,
      change: -0.97,
      changePercent: -1.35,
    },
    {
      id: "3",
      type: "CRYPTO",
      symbol: "BTCUSD",
      name: "Bitcoin",
      price: 97658,
      change: 67,
      changePercent: 0.07,
    }
  ]);

  const toggleType = (type: string) => {
    const newExpandedTypes = new Set(expandedTypes);
    if (newExpandedTypes.has(type)) {
      newExpandedTypes.delete(type);
    } else {
      newExpandedTypes.add(type);
    }
    setExpandedTypes(newExpandedTypes);
  };

  // Filter out empty sections
  const types = ["STOCKS", "FUTURES", "FOREX", "CRYPTO"].filter(type => 
    items.some(item => item.type === type)
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neutral-50">
        <MainNavigation />
        <main className="flex-1 p-6">
          <div className="max-w-[1400px] mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-neutral-900">Live Markets</h1>
              <p className="text-neutral-500 mt-2">Real-time market updates and analysis</p>
            </header>

            <div className="flex gap-6">
              <Feed activeTab="forYou" />

              <aside className="w-[400px] space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <Newspaper className="w-5 h-5 mr-2" />
                    Market News
                  </h2>
                  <div className="space-y-4">
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <span className="text-xs font-medium text-neutral-500">BREAKING</span>
                      <p className="text-sm text-neutral-900 mt-1">
                        Fed Minutes: Officials saw inflation risks warranting more rate hikes
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <span className="text-xs font-medium text-neutral-500">MACRO</span>
                      <p className="text-sm text-neutral-900 mt-1">
                        US Job openings fall to lowest level since March 2021
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
                  <div className="p-4 border-b border-neutral-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-neutral-900 flex items-center">
                        Watchlist
                      </h2>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <PieChart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      {(["24h", "7d", "90d", "1y", "all"] as TimePeriod[]).map((period) => (
                        <Button
                          key={period}
                          variant={selectedPeriod === period ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPeriod(period)}
                          className="text-xs"
                        >
                          {period}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    <div className="px-4 py-2 text-sm text-neutral-500 grid grid-cols-[1fr,1fr,1fr,1fr] gap-4">
                      <div>Symbol</div>
                      <div className="text-right">Last</div>
                      <div className="text-right">Chg</div>
                      <div className="text-right">Chg%</div>
                    </div>
                    {types.map((type) => (
                      <div key={type}>
                        <button
                          onClick={() => toggleType(type)}
                          className="w-full px-4 py-2 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 flex items-center"
                        >
                          <span className="transform transition-transform duration-200" style={{
                            transform: expandedTypes.has(type) ? 'rotate(0deg)' : 'rotate(-90deg)'
                          }}>▼</span>
                          <span className="ml-2">{type}</span>
                        </button>
                        {expandedTypes.has(type) && items
                          .filter(item => item.type === type)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="px-4 py-2 hover:bg-neutral-50 grid grid-cols-[1fr,1fr,1fr,1fr] gap-4 text-sm items-center"
                            >
                              <div className="font-medium text-neutral-900">
                                {item.symbol}
                              </div>
                              <div className="text-right text-neutral-900">
                                {item.price.toLocaleString()}
                              </div>
                              <div className={`text-right ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.change >= 0 ? '+' : ''}{item.change}
                              </div>
                              <div className={`text-right ${item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
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

export default LiveMarkets;
