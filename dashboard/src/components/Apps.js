import React from "react";

const appsData = [
  {
    id: 1,
    name: "Portfolio Tracker",
    description: "Track your investments and portfolio performance in real-time.",
    icon: "📈",
  },
  {
    id: 2,
    name: "Trade Simulator",
    description: "Practice trading with virtual money and test your strategies.",
    icon: "🎮",
  },
  {
    id: 3,
    name: "Market News",
    description: "Stay updated with the latest financial news and market trends.",
    icon: "📰",
  },
  {
    id: 4,
    name: "Alerts & Notifications",
    description: "Get instant alerts on price changes and important events.",
    icon: "🔔",
  },
];

const Apps = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Apps & Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {appsData.map(({ id, name, description, icon }) => (
          <div
            key={id}
            className="flex items-start gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transform hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
          >
            <div className="text-4xl">{icon}</div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{name}</h2>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
