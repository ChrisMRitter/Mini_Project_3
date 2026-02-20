import React, { useState } from "react";
import "./Card.css";

export const Card = ({ serviceGroup, onDeleteAccount, onUpdateAccount }) => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    accountName: "",
    username: "",
    password: "",
  });

  function startEdit(account) {
    setEditingId(account.id);
    setForm({
      accountName: account.accountName,
      username: account.username,
      password: account.password,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ accountName: "", username: "", password: "" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function saveEdit() {
    if (!editingId) return;
    if (!form.accountName.trim()) return;
    onUpdateAccount(serviceGroup.id, editingId, {
      accountName: form.accountName.trim(),
      username: form.username.trim(),
      password: form.password.trim(),
    });
    cancelEdit();
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-top">
          <div>
            <h5 className="card-title">{serviceGroup.service}</h5>
            <p className="card-text">
              Accounts: <strong>{serviceGroup.accounts.length}</strong>
            </p>
          </div>

          <button className="btn-primary" onClick={() => setOpen((v) => !v)}>
            {open ? "Hide Accounts" : "View Accounts"}
          </button>
        </div>

        {open && (
          <div className="accounts-list">
            {serviceGroup.accounts.map((a) => (
              <div key={a.id} className="account-row">
                {editingId !== a.id ? (
                  <>
                    <div className="account-main">
                      <div className="account-name">
                        <strong>{a.accountName}</strong>
                      </div>
                      <div className="account-details">
                        <div>Username: {a.username}</div>
                        <div>Password: {a.password}</div>
                      </div>
                    </div>

                    <div className="btn-row">
                      <button className="btn-secondary" onClick={() => startEdit(a)}>
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => onDeleteAccount(serviceGroup.id, a.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="edit-block">
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
                      <button className="btn-primary" onClick={saveEdit}>
                        Save
                      </button>
                      <button className="btn-secondary" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
