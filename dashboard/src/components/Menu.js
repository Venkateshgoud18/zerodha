import React,{useState} from "react";
import {Link} from "react-router-dom";
const Menu=()=>{
    const [selectedMenu,setselectedMenu]=useState(0);
    const [isProfileDropdownOpen,setisProfileDropdownopen]=useState(false);

    const handleMenuclick=(index)=>{
        setselectedMenu(index);
    };
    const handleProfileClick=(index)=>{
        setisProfileDropdownopen(!isProfileDropdownOpen);
    };
    const menuClass="menu";
    const activeMenuClass="menu selected";

    return (
        <div className='menu-container'>
            <img src='https://play-lh.googleusercontent.com/wnNYBAH1m-XJMfduOHfEATQAhCwyKUYeHAD1Fi9-OjtxKyPKjFEmgWvbx-OX2dM65xjp' style={{width:"50px"}}/>
            <div className="menus">
                <ul>
                    <li><Link style={{textDecoration:"none"}} to="/" onClick={()=>handleMenuclick(0)}><p className={selectedMenu===0?activeMenuClass:menuClass}>Dashboard</p></Link></li>
                    <li><Link style={{textDecoration:"none"}} to="/orders" onClick={()=>handleMenuclick(0)}><p className={selectedMenu===1?activeMenuClass:menuClass}>Orders</p></Link></li>
                    <li><Link style={{textDecoration:"none"}} to="/holdings" onClick={()=>handleMenuclick(0)}><p className={selectedMenu===2?activeMenuClass:menuClass}>Holdings</p></Link></li>
                    <li><Link style={{textDecoration:"none"}} to="/positions" onClick={()=>handleMenuclick(0)}><p className={selectedMenu===3?activeMenuClass:menuClass}>Positions</p></Link></li>
                    <li><Link style={{textDecoration:"none"}} to="/funds" onClick={()=>handleMenuclick(0)}><p className={selectedMenu===4?activeMenuClass:menuClass}>Funds</p></Link></li>
                    <li><Link style={{textDecoration:"none"}} to="/apps" onClick={()=>handleMenuclick(0)}><p className={selectedMenu===5?activeMenuClass:menuClass}>Apps</p></Link></li>
                </ul>
                < hr />
                <div className="profile">
                    <div className="avatar">ZU</div>
                    <p className="username">USERID</p>
                </div>
                {isProfileDropdownOpen }
            </div>
        </div>
    )
}
export default Menu;