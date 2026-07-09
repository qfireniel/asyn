import React, { useState } from "react";
import user from "/src/assets/user.png"
import headerArt from "/src/assets/web-header art.png"
import "../styles/admin.css"
import { Dashboard } from "./dashboard";
import { LeftNavbar } from "./left-navbar";
import { TeamManagement } from "./teamManagement";


export const Admin = () =>{
    let username = "Rachael Adashio"
    const [activeTab, setActiveTab] = useState("Dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "Team Management":
                return <TeamManagement />;
            case "Reports":
                return <div>Reports</div>;
            case "Emails":
                return <div>Emails</div>;
            case "Calendar":
                return <div>Calendar</div>;
            case "Messenger":
                return <div>Messenger</div>;
            default:
                return <Dashboard />;
        }
    };

    return(
        <div className="app-shell">
            <img src={headerArt} className="art" alt="headerart"></img>
            <div className="page-layout">
                <LeftNavbar activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="adminComponent">
                    <nav>
                    <ul>
                        <div>
                        </div>
                        <div className="user-menu">
                        <li>{username}</li>
                        <li><img src={user} alt="user" height={30}></img></li>
                        </div>
                    </ul>
                    </nav>

                    <div className="tab-content" key={activeTab}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

