import React from "react";
import logo from "/src/assets/logo.png";
import whiteLogo from "/src/assets/logo-white.png";
import dashboardIcon from "/src/assets/dashboard.png";

export const LeftNavbar = () => {
    return (
        <aside className="left-navbar">
            <div className="left-navbar__brand">
                <img src={logo} alt="Asyn logo" className="left-navbar__logo" />
                <span>Aero Contractors LSU</span>
            </div>
            <div className="left-navbar__section">
                <div className="left-navbar__item ">
                    <img src={dashboardIcon} alt="Dashboard icon" className="left-navbar__icon" height="24" />
                    <button>Dashboard</button>
                </div>
                <div className="left-navbar__item ">
                    <button>Team Management</button>
                </div>

                <div className="left-navbar__item ">
                    <button>Reports</button>
                </div>

                <div className="left-navbar__item ">
                <button>Settings</button>
                </div>
            </div>

        </aside>
    )
}
