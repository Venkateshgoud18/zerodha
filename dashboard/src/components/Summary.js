import React, { useEffect, useState } from "react";

const Summary = () => {
  // Updated dummy holdings data (match structure used in Holdings)
  const dummyHoldings = [
    { name: "RELIANCE", qty: 100, avg: 2200, price: 2300, day: 10, net: 10000, isLoss: false },
    { name: "TCS", qty: 50, avg: 3500, price: 3400, day: -50, net: -5000, isLoss: true },
    { name: "INFY", qty: 200, avg: 1500, price: 1550, day: 40, net: 10000, isLoss: false },
    { name: "WIPRO", qty: 120, avg: 1500, price: 1450, day: -80, net: -6000, isLoss: true },
  ];

  // Updated dummy positions data (match structure used in Positions)
  const dummyPositions = [
    { product: "Equity", instrument: "RELIANCE", qty: 50, avg: 2500, ltp: 2550, chg: 5, isLoss: false },
    { product: "Equity", instrument: "TCS", qty: 30, avg: 3200, ltp: 3300, chg: -3, isLoss: true },
  ];

  const [summary, setSummary] = useState({
    totalInvestment: 0,
    currentValue: 0,
    overallPnL: 0,
    todaysPnL: 0,
    holdingsCount: 0,
    positionsCount: 0,
  });

  useEffect(() => {
    // Calculate totalInvestment, currentValue, todaysPnL from dummyHoldings
    let totalInvestment = 0;
    let currentValue = 0;
    let todaysPnL = 0;

    dummyHoldings.forEach(({ qty, avg, price, day }) => {
      totalInvestment += qty * avg;
      currentValue += qty * price;
      todaysPnL += day * qty; // day change * quantity to reflect total daily P&L
    });

    // Calculate today's P&L from dummyPositions (adding chg * qty)
    dummyPositions.forEach(({ chg, qty }) => {
      todaysPnL += chg * qty;
    });

    const overallPnL = currentValue - totalInvestment;

    setSummary({
      totalInvestment,
      currentValue,
      overallPnL,
      todaysPnL,
      holdingsCount: dummyHoldings.length,
      positionsCount: dummyPositions.length,
    });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Portfolio Summary</h1>
      <table className="w-full text-sm text-left border border-gray-300 rounded-md overflow-hidden">
        <tbody>
          <SummaryRow title="Total Investment" value={`₹${summary.totalInvestment.toFixed(2)}`} />
          <SummaryRow title="Current Value" value={`₹${summary.currentValue.toFixed(2)}`} />
          <SummaryRow
            title="Overall P&L"
            value={`₹${summary.overallPnL.toFixed(2)}`}
            color={summary.overallPnL >= 0 ? "text-green-600" : "text-red-600"}
          />
          <SummaryRow
            title="Today's P&L"
            value={`₹${summary.todaysPnL.toFixed(2)}`}
            color={summary.todaysPnL >= 0 ? "text-green-600" : "text-red-600"}
          />
          <SummaryRow title="Holdings Count" value={summary.holdingsCount} />
          <SummaryRow title="Open Positions" value={summary.positionsCount} />
        </tbody>
      </table>
    </div>
  );
};

const SummaryRow = ({ title, value, color = "text-gray-800" }) => (
  <tr className="border-b border-gray-300 last:border-b-0">
    <th className="px-4 py-3 font-medium text-gray-600">{title}</th>
    <td className={`px-4 py-3 font-semibold ${color}`}>{value}</td>
  </tr>
);

export default Summary;
