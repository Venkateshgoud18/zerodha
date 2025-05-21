import React, { useState, useContext } from "react";
import { Tooltip, Grow } from '@mui/material';
import { watchList } from '../data/data2';
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from '@mui/icons-material';
import GeneralContext from "./GeneralContext"; // Import GeneralContext to use its functions
import { DoughnoutChart } from "./DoughnoutChart";

const labels=watchList.map((subArray)=>subArray["name"]);
const data={
    labels,
    datasets:[
        {
            label: 'Price',
            data: watchList.map((stock)=>stock.price),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
    ]
};
function WatchList() {
    return (
        <div className="watchlist-container">
            <div className="search-container">
                <input type="text" name="search" id="search" placeholder="Search ef: infy,bse,nifty fut weekly,gold mcx" />
                <span className="counts">{watchList.length} /50</span>
            </div>
            <ul className="list">
                {watchList.map((stock, index) => {
                    return (
                        <WatchListItem stock={stock} key={index} />
                    );
                })}
            </ul>
            <DoughnoutChart data={data} />
        </div>
    );
}
export default WatchList;

const WatchListItem = ({ stock }) => {
    const [showWatchListActions, setShowWatchListActions] = useState(false);
    const { openBuyWindow } = useContext(GeneralContext); // Access the openBuyWindow function from context

    const handleMouseEnter = () => {
        setShowWatchListActions(true);
    };

    const handleMouseExit = () => {
        setShowWatchListActions(false);
    };

    const handleBuyClick = () => {
        openBuyWindow(stock.name); // Trigger the BuyActionWindow with the stock UID
    };

    return (
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
            <div className="item">
                <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
                <div className="itemInfo">
                    <span className="percent">{stock.percent}</span>
                    {stock.isDown ? (
                        <KeyboardArrowDown className="down" />
                    ) : (
                        <KeyboardArrowUp className="up" />
                    )}
                    <span className="price">{stock.price}</span>
                </div>
            </div>
            {showWatchListActions && (
                <WatchListActions onBuyClick={handleBuyClick} />
            )}
        </li>
    );
};

const WatchListActions = ({ onBuyClick }) => {
    return (
        <span className="actions">
            <span>
                <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow} className="tip">
                    <button className="buy" onClick={onBuyClick}>Buy</button>
                </Tooltip>
                <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow} className="tip">
                    <button className="buy">Sell</button>
                </Tooltip>
                <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow} className="tip">
                    <button className="buy">Analytics</button>
                    <button className="action">
                        <BarChartOutlined className="icon" />
                    </button>
                </Tooltip>
                <Tooltip title="More" placement="top" arrow TransitionComponent={Grow} className="tip">
                    <button className="action"><MoreHoriz className="icon" /></button>
                </Tooltip>
            </span>
        </span>
    );
};
