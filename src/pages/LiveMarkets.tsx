import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";
import { MessageCircle, TrendingUp, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketUpdate {
  id: number;
  title: string;
  analyst: string;
  time: string;
  content: string;
}

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  time: string;
  isVerified: boolean;
}

const mockUpdates: MarketUpdate[] = [
  {
    id: 1,
    title: "BTC/USD Technical Update",
    analyst: "CryptoWhisperer",
    time: "2 minutes ago",
    content: "Key resistance at $48,500, watch for breakout confirmation",
  },
  {
    id: 2,
    title: "SPX Market Structure",
    analyst: "TechAnalyst",
    time: "5 minutes ago",
    content: "Market showing signs of distribution, key support at 4,800",
  },
];

const mockChat: ChatMessage[] = [
  {
    id: 1,
    user: "MarketSage",
    message: "Watch the 200MA on the 4H timeframe, crucial level for next move",
    time: "1m ago",
    isVerified: true,
  },
  {
    id: 2,
    user: "Trader123",
    message: "Volume confirming the trend, looking strong",
    time: "2m ago",
    isVerified: false,
  },
];

const LiveMarkets = () => {
  const [message, setMessage] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neutral-50">
        <MainNavigation />
        <main className="flex-1 p-6">
          <div className="max-w-[1400px] mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-neutral-900">Live Markets</h1>
              <p className="text-neutral-500 mt-2">Real-time market updates and discussions</p>
            </header>

            <div className="flex gap-6">
              <div className="flex-1 space-y-6">
                {mockUpdates.map((update) => (
                  <article
                    key={update.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 animate-fadeIn"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-neutral-900">
                          {update.title}
                        </h2>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="text-primary font-medium">
                            {update.analyst}
                          </span>
                          <span className="text-neutral-500 text-sm">
                            {update.time}
                          </span>
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-neutral-600">{update.content}</p>
                  </article>
                ))}
              </div>

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
                    <h2 className="text-lg font-semibold text-neutral-900 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Live Chat
                    </h2>
                  </div>
                  <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                    {mockChat.map((msg) => (
                      <div key={msg.id} className="flex items-start space-x-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${msg.isVerified ? "text-primary" : "text-neutral-900"}`}>
                              {msg.user}
                            </span>
                            {msg.isVerified && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Verified
                              </span>
                            )}
                            <span className="text-xs text-neutral-500">{msg.time}</span>
                          </div>
                          <p className="text-sm text-neutral-600 mt-1">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-neutral-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        maxLength={250}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <Button>Send</Button>
                    </div>
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
