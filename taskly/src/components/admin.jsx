import React from "react";
import logo from "/src/assets/logo.png"
import user from "/src/assets/user.png"
import "../styles/admin.css"


export const Admin = () =>{
    let teamName = "Aero Contractors LSU"
    let username = "Rachael Adashio"
    return(
        <div className="adminComponent">
            <nav>
            <ul>
                <div>
                <li><img src={logo} alt="asyn" height={30}></img></li>
                <li>{teamName}</li>
                </div>
                <div className="core-menu">
                    <li><button>Today</button></li>
                    <li><button>This Week</button></li>
                    <li><button>This month</button></li>
                    <li><button>Reports</button></li>
                </div>
                <div>
                <li><img src={user} alt="user" height={30}></img></li>
                </div>
            </ul>
            </nav>
        </div>
    )
}

