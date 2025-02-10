
const topAnalysts = [
  { name: "CryptoWhisperer", score: 98, predictions: 156 },
  { name: "TechAnalyst", score: 95, predictions: 142 },
  { name: "MarketSage", score: 93, predictions: 128 },
];

const RightSidebar = () => {
  return (
    <aside className="w-[300px] min-w-[300px] space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Welcome to Promis
        </h2>
        <p className="text-neutral-600 text-sm mb-4">
          A decentralized platform where independent analysts can share and
          monetize their market insights.
        </p>
        <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Learn More
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Top Analysts
        </h2>
        <div className="space-y-4">
          {topAnalysts.map((analyst, index) => (
            <div
              key={analyst.name}
              className="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-neutral-500">#{index + 1}</span>
                <div>
                  <p className="font-medium text-neutral-900">{analyst.name}</p>
                  <p className="text-sm text-neutral-500">
                    {analyst.predictions} predictions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-neutral-900">
                  {analyst.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
