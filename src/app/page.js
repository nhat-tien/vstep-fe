'use client'
import { login, logout } from "@/services/auth";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");
  const [error, setError] = useState(null);
//
  async function onLogin(e) {
    e.preventDefault();
    const res = await login({email: email, password: pw});
    if(!res.ok) {
       setError(res.message);
    }
  }

  function onLogout(e) {
    e.preventDefault();
    logout();
  }

  return (
    <main>
      <form>
        {" "}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="text" value={pw} onChange={(e) => setPW(e.target.value)} />
        <button onClick={onLogin}>Click</button>
        <button onClick={onLogout}>Logout</button>
        <Link href={"/profile"}>Profile</Link>
        {error ?? ""}
      </form>
    </main>
  );
}
