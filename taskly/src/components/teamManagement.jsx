import { useEffect, useState } from "react";
import "../styles/teamManagement.css";
import add from "/src/assets/+.png";
import add2 from "/src/assets/+alt.png";
import { supabase } from '../supabaseClient';

export const TeamManagement = () => {
    
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchTeamMembers = async () => {
        try {
            setLoading(true);
            setErrorMessage("");
            
            const { data, error } = await supabase
                .from('team_members')
                .select('id, user_id, name, role, activity')
                .order('name', { ascending: true });

            if (error) throw error;

            setTeamMembers(data || []);
        } catch (error) {
            console.error("Error retrieving database entries:", error);
            setErrorMessage("Unable to load team members.");
            setTeamMembers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, []);

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
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Current Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {loading ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                        Loading your team...
                                    </td>
                                </tr>
                            ) : errorMessage ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#b91c1c" }}>
                                        {errorMessage}
                                    </td>
                                </tr>
                            ) : teamMembers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                        No team members found. Click the add icon to add a member.
                                    </td>
                                </tr>
                            ) : (
                                teamMembers.map((member) => (
                                    <tr key={member.id}>
                                        <td>{member.name || member.user_id}</td>
                                        <td>{member.role || "No role assigned"}</td>
                            
                                        <td>
                                            {member.activity || "Active"}
                                        </td>
                                        <td>
                                            <button
                                                className="modify-btn"
                                                onClick={() => console.info(`Modify requested for ${member.user_id}`)}
                                                aria-label={`Modify ${member.name || member.user_id}`}
                                            >
                                                Modify
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};