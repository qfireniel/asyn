import { useState } from "react";
import "../styles/organizationSetup.css";
import topLeftArt from "../assets/top left .png";
import bottomRightArt from "../assets/bottom right.png";
import simpleLogo from "../assets/simpleLogo.png";

export const OrganizationSetup = ({ onComplete }) => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedName = name.trim();
        const trimmedSlug = slug.trim().toLowerCase();

        if (!trimmedName || !trimmedSlug) {
            setError("Enter an organization name and workspace URL.");
            return;
        }

        if (!/^[a-z0-9-]+$/.test(trimmedSlug)) {
            setError("Use only lowercase letters, numbers, and hyphens in the URL.");
            return;
        }

        onComplete({ name: trimmedName, slug: trimmedSlug });
    };

    return (
        <main className="organization-setup">
            <img className="organization-setup__corner organization-setup__corner--top-left" src={topLeftArt} alt="" />
            <img className="organization-setup__corner organization-setup__corner--bottom-right" src={bottomRightArt} alt="" />
            <section className="organization-setup__panel">
                <img className="organization-setup__logo" src={simpleLogo} alt="Asyn" />
                <p className="organization-setup__eyebrow">Your workspace</p>
                <h1>Set up your organization</h1>
                <p className="organization-setup__intro">
                    Create the organization you will use to manage your team and work.
                </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="organization-name">Organization name</label>
                    <input
                        id="organization-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Aero Contractors LSU"
                        autoFocus
                    />
                    <label htmlFor="organization-slug">Workspace URL</label>
                    <div className="organization-setup__slug">
                        <span>taskly.app/</span>
                        <input
                            id="organization-slug"
                            value={slug}
                            onChange={(event) => setSlug(event.target.value)}
                            placeholder="your-organization"
                        />
                    </div>
                    {error && <p className="form-error" role="alert">{error}</p>}
                    <button type="submit">Continue to your suite</button>
                </form>
            </section>
        </main>
    );
};
