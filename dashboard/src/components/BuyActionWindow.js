import React, { useContext, useState } from "react";
import GeneralContext from "./GeneralContext";
import {Link} from "react-router-dom";
import "./BuyActionWindow.css";
import axios from 'axios';
const BuyActionWindow = ({ uid }) => {
    const { closeBuyWindow } = useContext(GeneralContext);
    const [stockQuantity,setStockQuantity]=useState(1);
    const [stockPrice,setStockPrice]=useState(0.0);
    const handleBuyClick=()=>{
        axios.post("http://localhost:8000/newOrder",{
            name:uid,
            qty:stockQuantity,
            price:stockPrice,
            mode:"BUY",
        });
        GeneralContext.closeBuyWindow();
    }
    const handleCancelClick = () => {
        GeneralContext.closeBuyWindow(); // Close the buy window when the Cancel button is clicked
    };

    return (
        <div className="containerClass" id="buy-window" draggable="true">
            <div className="regular-order">
                <div className="inputs">
                    <fieldset>
                        <legend>Stock: {uid}</legend>
                        <legend>Qty.</legend>
                        <input type="number" name="qty" id="qty" onChange={(e)=>setStockQuantity(e.target.value)} value={stockQuantity}/>
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <input type="number" name="price" id="price" step="0.05" onChange={(e)=>setStockPrice(e.target.value)} value={stockPrice}/>
                    </fieldset>
                </div>
            </div>
            <div className="buttons">
                <span>Margin required 140.65</span>
                <div>
                    <Link className="btn btn-blue" onClick={handleBuyClick}>Buy</Link>
                    <Link className="btn btn-grey" onClick={handleCancelClick}>Cancel</Link>
                </div>
            </div>
        </div>
    );
};

export default BuyActionWindow;
