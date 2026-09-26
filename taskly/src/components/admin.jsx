import { useState } from "react";
import "../styles/admin.css"
import { Signin } from "../pages/signin";
import { Signup } from "../pages/signup";
import { Workplaces } from "./workplaces";


export const Admin = ({ initialAuthenticated = false }) =>{
    const [authenticated, setAuthenticated] = useState(initialAuthenticated);
    const [authMode, setAuthMode] = useState("signin");

    if (!authenticated) {
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

    return <div className="app-shell"><Workplaces /></div>;
}

