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
            const params = new URLSearchParams(window.location.search);
            const redirectTo = params.get("redirectTo") || "/";
            window.location.href = redirectTo;
        } else {
            setError("wrong password :( try again!");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-amber-50 font-bold">
            <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 gap-6">
                <h1 className="text-4xl text-zinc-500">Who are you?</h1>

                   <form onSubmit={handleSubmit} className="flex flex-row items-center gap-2">
                        <input
                           type="password"
                           placeholder="Enter password..."
                           value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="border border-zinc-500 rounded-full px-4 py-2 bg-white"
                      />

                   <button
                        type="submit"
                        className="bg-zinc-500 hover:bg-zinc-400 text-white px-5 py-2 rounded-full"
                    >
                        Submit
                    </button>
                    </form>


                {error && <p className="text-red-400">{error}</p>}
            </main>
        </div>
    );
}