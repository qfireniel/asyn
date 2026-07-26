import React, { useState } from "react";
import user from "/src/assets/user.png"
import headerArt from "/src/assets/web-header art.png"
import "../styles/admin.css"
import { Dashboard } from "./dashboard";
import { LeftNavbar } from "./left-navbar";
import { TeamManagement } from "./teamManagement";
import { Reports } from "./reports";
import { Emails } from "./emails";
import { Calendar } from "./calendar";
import { Messenger } from "./messenger";
import { Login } from "../pages/login";


export const Admin = ({ initialAuthenticated = false }) =>{
    let username = "qfireniel"
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [authenticated, setAuthenticated] = useState(initialAuthenticated);

    if (!authenticated) {
        return <Login onAuthSuccess={() => setAuthenticated(true)} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case "Team Management":
                return <TeamManagement />;
            case "Reports":
                return <Reports />;
            case "Emails":
                return <Emails />;
            case "Calendar":
                return <Calendar />;
            case "Messenger":
                return <Messenger />;
            case "Login":
                return <Login />
            default:
                return <Dashboard />;
        }
    };

    return(
        <div className="app-shell">
         
            <div className="page-layout">
                <LeftNavbar activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="adminComponent">
                    <nav>
                    <ul>
                        <div>
                            
                        </div>
                        <div className="user-menu">
                        
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

