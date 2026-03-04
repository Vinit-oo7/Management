import React, { useState } from "react";
import { DEMO_USERS } from "../auth/accessControl";
import { useAuth } from "../auth/AuthContext";

function AuthScreen() {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const result = login(identifier);
    if (!result.ok) {
      setError(result.message);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="auth-kicker">Angel School Manager</p>
        <h1>Sign in</h1>
        <p className="auth-copy">
          Enter your account ID. Authority and page permissions are applied by role.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span>Account ID</span>
            <input
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="Admin@123@gmail.com"
              required
            />
          </label>
          <button type="submit" className="solid-btn auth-btn">
            Continue
          </button>
        </form>

        {error ? <p className="alert error">{error}</p> : null}

        <div className="account-list">
          <p>Allowed accounts</p>
          {DEMO_USERS.map((user) => (
            <button
              type="button"
              key={user.id}
              className="account-chip"
              onClick={() => setIdentifier(user.id)}
            >
              {user.id}
              <span>{user.role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
