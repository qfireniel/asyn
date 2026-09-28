import { useEffect, useState } from "react";
import "../styles/admin.css"
import { Signin } from "../pages/signin";
import { Signup } from "../pages/signup";
import { Calendar } from "./calendar";
import { Dashboard } from "./dashboard";
import { Emails } from "./emails";
import { Messenger } from "./messenger";
import { OrganizationSetup } from "./organizationSetup";
import { Reports } from "./reports";
import { Settings } from "./settings";
import { TeamManagement } from "./teamManagement";
import { Workplaces } from "./workplaces";
import { supabase } from "../supabaseClient";

const ACTIVE_TAB_STORAGE_KEY = "taskly.activeTab";
const ORGANIZATION_STORAGE_KEY = "taskly.organization";
const DEFAULT_TAB = "Projects";

const getStoredOrganization = () => {
    try {
        return JSON.parse(localStorage.getItem(ORGANIZATION_STORAGE_KEY) || "null");
    } catch {
        return null;
    }
};

export const Admin = ({ initialAuthenticated = false }) =>{
    const [authenticated, setAuthenticated] = useState(initialAuthenticated);
    const [authChecked, setAuthChecked] = useState(initialAuthenticated);
    const [authMode, setAuthMode] = useState("signin");
    const [organization, setOrganization] = useState(getStoredOrganization);
    const [activeTab, setActiveTab] = useState(() =>
        localStorage.getItem(ACTIVE_TAB_STORAGE_KEY) || DEFAULT_TAB,
    );

    useEffect(() => {
        let mounted = true;

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (mounted) {
                setAuthenticated(Boolean(session));
                setAuthChecked(true);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (mounted) {
                    setAuthenticated(Boolean(session));
                    setAuthChecked(true);
                }
            },
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, tab);
    };

    const handleOrganizationComplete = (newOrganization) => {
        localStorage.setItem(ORGANIZATION_STORAGE_KEY, JSON.stringify(newOrganization));
        setOrganization(newOrganization);
    };

    const pageByTab = {
        Dashboard: <Dashboard />,
        Projects: <Workplaces />,
        "Team Management": <TeamManagement />,
        Reports: <Reports />,
        Emails: <Emails />,
        Calendar: <Calendar />,
        Messenger: <Messenger />,
        Settings: <Settings />,
    };

    if (!authenticated) {
        if (!authChecked) {
            return null;
        }

        if (authMode === "signup") {
            return <Signup onSignInClick={() => setAuthMode("signin")} />;
        }

        return (
            <Signin
                onAuthSuccess={() => setAuthenticated(true)}
                onSignupClick={() => setAuthMode("signup")}
            />
        );
    }

    if (!organization) {
        return <OrganizationSetup onComplete={handleOrganizationComplete} />;
    }

    return (
        <div className="app-shell">
            <main className="tab-content">
                {activeTab === "Projects"
                    ? <Workplaces organization={organization} />
                    : pageByTab[activeTab] || <Workplaces organization={organization} />}
            </main>
        </div>
    );
}

