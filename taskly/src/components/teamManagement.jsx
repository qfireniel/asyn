import React from "react";
import "../styles/teamManagement.css";
import add from "/src/assets/+.png"
import add2 from "/src/assets/+alt.png"

export const TeamManagement = () => {
    return (
        <div className="container">
            <div className="title-header-team">
                <div>
                <h2>Manage and Track Your Team</h2>
                <div className="title-header-team-right">
                <h1>Team Management</h1>
                <div className="add-icon-wrapper">
                    <img className="add-icon" src={add} alt="add" height={30} />
                    <img className="add-icon-alt" src={add2} alt="add2" height={30} />
                </div>
                </div>
                </div>
            </div>
            <div className="assign-task-body">
                    <div className="hot-tasks">
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Current Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            <tr>
                                <td>Sample Name</td>
                                <td>Sample Role</td>
                                <td>Active</td>
                                <td>Modify</td>
                            </tr>
                            <tr>
                                <td>Sample Name</td>
                                <td>Sample Role</td>
                                <td>Active</td>
                                <td>Modify</td>
                            </tr>
                            <tr>
                                <td>Sample Name</td>
                                <td>Sample Role</td>
                                <td>Active</td>
                                <td>Modify</td>
                            </tr>
                        </table>

                    </div>
        </div>
        </div>
    );
};