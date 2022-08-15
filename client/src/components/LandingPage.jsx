import React from "react";
import { Link } from "react-router-dom";
import "./Styles/LandingPage.css";

export default function LandingPage() {
    return (
        <div className="landing-page">
        <h1 className="Text">WELCOME</h1>
        <h2 className="Text2">Here you will find all the information to EAT BETTER</h2>
        <Link to = "/Home">
            <button className="button"> GET INTO! </button>
        </Link>
        </div>
    );
}

    
