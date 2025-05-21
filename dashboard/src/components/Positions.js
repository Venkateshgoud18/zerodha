import React,{useState,useEffect} from "react";
//import positions from "../data/data1";
import axios from "axios";

const Positions = () => {
  const [allPositions,setAllPositions]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3002/allPositions").then((res)=>{
      console.log(res.data);
      setAllPositions(res.data);
    })
  },[]);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Products</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.ltp * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
              
              return (
                <tr key={index} className="item">
                  <td>{stock.product}</td>
                  <td>{stock.instrument}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg ? stock.avg.toFixed(1) : "N/A"}</td>
                  <td>{stock.ltp ? stock.ltp.toFixed(1) : "N/A"}</td>
                  <td>{curValue.toFixed(1)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.chg ? stock.chg.toFixed(1) : "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
