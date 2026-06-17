import React from "react"
import "../styles/dashboard.css"
import add from "/src/assets/+.png"
import add2 from "/src/assets/+alt.png"
import { CircularChart } from "./analyticsCharts"
export const Dashboard = () => {
    return (
        <div className="container">
            <div className="title-header">
                <h2>Manage and Track assigned tasks</h2>
                <h1>Dashboard</h1>
            </div>
            <div className="info-centre">
            <div className="assign-task">
                <div className="assign-task-top">
                    <h2>Assign Task</h2>
                    <div className="add-icon-wrapper">
                        <img className="add-icon" src={add} alt="add" height={30} />
                        <img className="add-icon-alt" src={add2} alt="add2" height={30} />
                    </div>
                </div>
                <div className="assign-task-body">
                    <div className="hot-tasks">
                        <table>
                            <tr>
                                <td>Sample Name</td>
                                <td>Sample task title</td>
                                <td>Sample task status</td>
                            </tr>
                            <tr>
                                <td>Sample Name</td>
                                <td>Sample task title</td>
                                <td>Sample task status</td>
                            </tr>
                            <tr>
                                <td>Sample Name</td>
                                <td>Sample task title</td>
                                <td>Sample task status</td>
                            </tr>
                        </table>

                    </div>
                    <div className="assign-task-footer">
                        <button>See more tasks</button>
                    </div>
                </div>
            </div>

            <div className="assign-task">
                <div className="assign-task-top">
                <h2>Staff Performance</h2>
                </div>
                <div className="task-progress-body">
                {<CircularChart/>}
                </div>
            </div>
        </div>
    </div>
    )
}