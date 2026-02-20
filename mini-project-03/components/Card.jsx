import React, { useState } from "react";
import "./Card.css";

export const Card = ({ account, onDelete, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    service: account.service,
    accountName: account.accountName,
    username: account.username,
    password: account.password,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    onUpdate(account.id, form);
    setIsEditing(false);
  }

  return (
    <div className="card">
      <div className="card-body">
        {!isEditing ? (
          <>
            <h5 className="card-title">{account.service}</h5>
            <p className="card-text">
              <strong>Account:</strong> {account.accountName}
            </p>

            <div className="btn-row">
              <button
                className="btn-primary"
                onClick={() => setShowDetails((s) => !s)}
              >
                {showDetails ? "Hide Details" : "View Details"}
              </button>

              <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                Edit
              </button>

              <button className="btn-danger" onClick={() => onDelete(account.id)}>
                Delete
              </button>
            </div>

            {showDetails && (
              <div className="details">
                <p><strong>Username:</strong> {account.username}</p>
                <p><strong>Password:</strong> {account.password}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h5 className="card-title">Edit {account.service}</h5>

            <div className="form">
              <input
                name="service"
                value={form.service}
                onChange={handleChange}
                placeholder="Service (Google, Instagram...)"
              />
              <input
                name="accountName"
                value={form.accountName}
                onChange={handleChange}
                placeholder="Account Name"
              />
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
              />
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password (demo)"
              />

              <div className="btn-row">
                <button className="btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setForm({
                      service: account.service,
                      accountName: account.accountName,
                      username: account.username,
                      password: account.password,
                    });
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
