import React from "react";
import "../styles/login.css";
import LoginArt from "../assets/loginart.png";
import logo from "../assets/simpleLogo.png";


export const Login = () => {
    return (
        <div>
         
            <div className="all">
                <section className="login-art">
                    <div className="image-art">
                        <img src={LoginArt} alt="Login art" />
                        <div className="image-caption">
                            <h2>Get started with us</h2>
                        </div>
                        <div className="image-stages" aria-hidden>
                            <div className="stage active">
                                <div className="stage-number">1</div>
                                <div className="stage-text">Sign up your account</div>
                            </div>
                            <div className="stage">
                                <div className="stage-number">2</div>
                                <div className="stage-text">Set up your needs</div>
                            </div>
                            <div className="stage">
                                <div className="stage-number">3</div>
                                <div className="stage-text">Set up your profile</div>
                            </div>
                        </div>
                        <p className="art-credit">Credit: @qFireniel</p>
                    </div>
                </section>
                <section className="login-section">
                    <div className="login">
                        <img className="page-logo" src={logo} alt="logo" />
                        <h1>Sign Up</h1>
                        <h3>Enter your personal data to create your account</h3>
                        <form>
                                <p className="art-credit">Credit: @qFireniel</p>
                            <div className="names">
                                <div className="individual-name">
                                    <label htmlFor="username">First Name</label>
                                    <input type="text" id="username" placeholder="First Name" />
                                </div>
                                <div className="individual-name">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" id="lastname" placeholder="Last Name" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="Email" />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Password" />
                            </div>
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </section>
                <section>
                </section>
            </div>
        </div>
    );
};