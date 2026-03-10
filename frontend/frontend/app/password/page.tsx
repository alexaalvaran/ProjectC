"use client";

import { useState } from "react";

export default function PasswordPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({ password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            window.location.href = "/";
        } else {
            setError("Incorrect password");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <h2>Enter Site Password</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Enter</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}