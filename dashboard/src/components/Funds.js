import React, { useEffect, useState } from "react";

const Funds = () => {
  const [funds, setFunds] = useState([]);

  // Dummy data for funds
  useEffect(() => {
    const dummyFunds = [
      { id: 1, name: "Cash Balance", amount: 50000 },
      { id: 2, name: "Available Margin", amount: 150000 },
      { id: 3, name: "Total Deposits", amount: 200000 },
      { id: 4, name: "Withdrawable Amount", amount: 30000 },
    ];

    setFunds(dummyFunds);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Funds Summary</h1>
      <table className="min-w-full bg-white rounded-md shadow">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left border-b border-gray-200">Fund Name</th>
            <th className="py-3 px-6 text-right border-b border-gray-200">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund) => (
            <tr key={fund.id} className="hover:bg-gray-100">
              <td className="py-3 px-6 border-b border-gray-200">{fund.name}</td>
              <td className="py-3 px-6 text-right border-b border-gray-200 font-semibold">
                {fund.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Funds;
