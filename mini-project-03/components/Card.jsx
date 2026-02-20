import React, { useState } from "react";
import "./Card.css";

export const Card = () => {
    const [buttonText, setButtonText] = useState("View Details");

    return (
        <div className="card-container">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Account</h5>
                    <p className="card-text">Account Info Here.</p>
                    {buttonText && (
                        <a href="#" className="btn-primary">
                            {buttonText}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
