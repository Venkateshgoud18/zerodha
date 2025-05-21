import React from "react";
import { Routes, Route } from 'react-router-dom';
import Orders from './Orders'
import Holdings from './Holdings'
import Positions from './Positions'
import WatchList from './WatchList'
import Funds from './Funds'
import Apps from './Apps'
import Summary from "./Summary";
import { GeneralContextProvider } from "./GeneralContext";
import StockData from './StockData';

const Dashboard=()=>{
    return(
        <div className="dashboard-container">
           <GeneralContextProvider>
                <WatchList />
            </GeneralContextProvider>
            
            <div className="content">
                <Routes>
                    <Route exact path='/' element={<Summary />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/holdings' element={<Holdings />} />
                    <Route path='/positions' element={<Positions />} />
                    <Route path='/funds' element={<Funds />} />
                    <Route path='/apps' element={<Apps />} />
                </Routes>
            </div>
            <div>
                <StockData />
            </div>
        </div>
    )
}
export default Dashboard;