import { useEffect, useState } from "react";

const StockSearch = () => {
  const [symbols, setSymbols] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("Tesla");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSymbols([]);
      return;
    }

    const fetchSymbols = async () => {
      setLoading(true);
      setError(null);

      const apiKey = "d0mqvipr01qi78nglc30d0mqvipr01qi78nglc3g"; // Replace with your actual Finnhub API key
      const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(
        searchTerm
      )}&token=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSymbols(data.result || []);
      } catch (error) {
        setError(error.message);
        setSymbols([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSymbols();
  }, [searchTerm]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", maxWidth: "350px" }}>
      <h1 style={{ fontSize: "18px" }}>Search Stocks</h1>
      <input
        type="text"
        placeholder="Search for a stock symbol"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "6px",
          width: "200px",
          fontSize: "13px"
        }}
      />
      {error && <div style={{ color: "red", fontSize: "13px" }}>Error: {error}</div>}
      {loading && <div>Loading...</div>}
      {!loading && symbols.length === 0 && !error && (
        <div style={{ fontSize: "13px" }}>No results found</div>
      )}
      {!loading && symbols.length > 0 && (
        <ul style={{ paddingLeft: "20px", fontSize: "13px", lineHeight: "1.4" }}>
          {symbols.map((symbol, index) => (
            <li key={index}>
              <strong>{symbol.symbol}</strong> - {symbol.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockSearch;
