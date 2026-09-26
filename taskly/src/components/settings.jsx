import "../styles/admin.css";

export const Settings = () => (
    <section className="settings-view" aria-labelledby="settings-title">
        <div className="title-header">
            <h2>Personalize your workspace</h2>
            <h1 id="settings-title">Settings</h1>
        </div>
        <div className="settings-panel">
            <h2>Workspace preferences</h2>
            <p>Update the name shown to your team.</p>
            <label>
                Workspace name
                <input type="text" defaultValue="Aero Contractors LSU" />
            </label>
            <button type="button">Save changes</button>
        </div>
    </section>
);