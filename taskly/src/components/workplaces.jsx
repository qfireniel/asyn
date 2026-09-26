import { useMemo, useState } from "react";
import "../styles/workplaces.css";

export const Workplaces = () => {
	const [query, setQuery] = useState("");
	const [status, setStatus] = useState("All status");
	const [sortAscending, setSortAscending] = useState(true);

	const projects = useMemo(() => {
		const projectList = [{ name: "Aero Contractors LSU", region: "eu-north-1", plan: "NANO", status: "Active" }];
		return projectList
			.filter((project) => project.name.toLowerCase().includes(query.toLowerCase()))
			.filter((project) => status === "All status" || project.status === status)
			.sort((first, second) => sortAscending
				? first.name.localeCompare(second.name)
				: second.name.localeCompare(first.name));
	}, [query, sortAscending, status]);

	return (
		<main className="workplaces-page">
			<header className="workplaces-header">
				<div className="workplaces-title-row">
					<div><p className="eyebrow">Workspace</p><h1>Projects</h1></div>
					<div className="workspace-profile"><span className="workspace-mark">A</span><span>asyn</span><span className="free-badge">FREE</span></div>
				</div>
				
			</header>

			<section className="workplaces-toolbar" aria-label="Project controls">
				<label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a project" /></label>
				<select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status"><option>All status</option><option>Active</option></select>
				<button className="sort-button" type="button" onClick={() => setSortAscending((value) => !value)}><span aria-hidden="true">⇅</span> Sorted by name</button>
				<div className="view-switcher" aria-label="View mode"><button className="view-button active" type="button" aria-label="Grid view">▦</button><button className="view-button" type="button" aria-label="List view">☷</button></div>
				<button className="new-project" type="button"><span aria-hidden="true">+</span> New project</button>
			</section>

			<div className="workplaces-content">
				<section className="project-results" aria-label="Projects">
					{projects.length ? projects.map((project) => (
						<article className="project-card" key={project.name}>
							<button className="project-menu" type="button" aria-label={`More options for ${project.name}`}>⋮</button>
							<div className="project-icon">A</div><h2>{project.name}</h2><p>{project.region}</p><span className="plan-badge">{project.plan}</span><span className="status-dot">{project.status}</span>
						</article>
					)) : <p className="empty-projects">No projects match your search.</p>}
				</section>

				
			</div>
		</main>
	);
};
