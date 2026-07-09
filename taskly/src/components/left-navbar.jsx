import React from "react";
import logo from "/src/assets/logo.png";

export const LeftNavbar = ({ activeTab, onTabChange }) => {
    const tabs = ["Dashboard", "Team Management", "Reports", "Emails", "Calendar", "Messenger"];

    return (
   
        <aside className="left-navbar">
            <div>
                <div className="left-navbar__brand">
                    <img src={logo} alt="Asyn logo" className="left-navbar__logo" />
                    <span>Aero Contractors LSU</span>
                </div>
                <div className="left-navbar__section">
                    {tabs.map((tab) => (
                        <div key={tab} className={`left-navbar__item ${activeTab === tab ? 'active' : ''}`}>
                            <button onClick={() => onTabChange(tab)}>{tab}</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="left-navbar__item ">
                <button onClick={() => onTabChange("Settings")}>Settings</button>
            </div>
        </aside>
    )
}
