import React, { useEffect, useState } from "react";
import "../styles/teamManagement.css";

import add from "/src/assets/+.png";
import add2 from "/src/assets/+alt.png";

export const Reports = () => {
    return (
             <div className="container">
                        <div className="title-header-team">
                            <div>
                                <h2>Manage and View Reports</h2>
                                <div className="title-header-team-right">
                                    <h1>Reports</h1>
                                    <div className="add-icon-wrapper">
                                        <img className="add-icon" src={add} alt="add" height={30} />
                                        <img className="add-icon-alt" src={add2} alt="add2" height={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
    )
}