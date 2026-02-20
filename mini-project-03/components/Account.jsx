import React, { useState } from "react";
import "./Account.css";

export function Account({ onAdd }) {
  const [form, setForm] = useState({
    service: "",
    accountName: "",
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(form);
    setForm({ service: "", accountName: "", username: "", password: "" });
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add Account</h2>

      <input
        name="service"
        value={form.service}
        onChange={handleChange}
        placeholder="Service (Google, Facebook...)"
      />
      <input
        name="accountName"
        value={form.accountName}
        onChange={handleChange}
        placeholder="Account Name (Personal, School...)"
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
        placeholder="Password"
      />

      <button className="btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}
