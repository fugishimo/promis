
import { ChevronUp, ChevronDown, MessageCircle } from "lucide-react";

interface FeedProps {
  activeTab: "following" | "forYou";
}

const mockPosts = [
  {
    id: 1,
    title: "BTC/USD Technical Analysis",
    author: "CryptoAnalyst",
    content: "Bullish divergence forming on the 4H timeframe. The RSI indicator shows a potential reversal pattern, with key support levels at $45,000 and resistance at $48,500. Volume profile indicates accumulation in this range. Watch for a breakout above the descending trendline for confirmation of trend reversal.",
    votes: 128,
    comments: 24,
    timestamp: "2h ago",
  },
  {
    id: 2,
    title: "SPX Weekly Outlook",
    author: "MarketWizard",
    content: "Key resistance levels to watch this week: 4,800 acting as immediate resistance, followed by the psychological level of 5,000. Market breadth indicators suggest potential consolidation before the next leg up. Sector rotation shows defensive positioning, with utilities and consumer staples outperforming. Keep an eye on the VIX for signs of increased volatility.",
    votes: 95,
    comments: 18,
    timestamp: "4h ago",
  },
];

const Feed = ({ activeTab }: FeedProps) => {
  return (
    <div className="flex-1 space-y-6">
      {mockPosts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 animate-slideIn min-h-[250px]"
        >
          <div className="flex gap-4">
            <div className="flex flex-col items-center space-y-2">
              <button className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
                <ChevronUp className="w-6 h-6 text-neutral-600" />
              </button>
              <span className="font-medium text-neutral-900">{post.votes}</span>
              <button className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
                <ChevronDown className="w-6 h-6 text-neutral-600" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-neutral-900">
                  {post.author}
                </span>
                <span className="text-sm text-neutral-500">•</span>
                <span className="text-sm text-neutral-500">{post.timestamp}</span>
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                {post.title}
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">{post.content}</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-neutral-500 hover:text-neutral-700 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments} comments</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Feed;
