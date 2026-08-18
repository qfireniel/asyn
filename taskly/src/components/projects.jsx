import React from "react";
import "../styles/dashboard.css";

export const Projects = () => {
	return (
		<div className="projects-page">
			<h2>Projects</h2>
			<p>This is the Projects workspace page for admins.</p>
			<div className="projects-list">
				<div className="project-card">Project Alpha</div>
				<div className="project-card">Project Beta</div>
				<div className="project-card">Project Gamma</div>
			</div>
		</div>
	)
}
