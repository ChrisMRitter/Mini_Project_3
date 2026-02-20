import React, { useMemo, useState } from "react";
import "./App.css";
import { Card } from "../components/Card.jsx";
import { Account } from "../components/Account.jsx";

function App() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      service: "Google",
      accountName: "School",
      username: "chris.school",
      password: "demo123",
    },
    {
      id: 2,
      service: "Instagram",
      accountName: "Personal",
      username: "chris_pics",
      password: "password-demo",
    },
  ]);

  const [search, setSearch] = useState("");

  function addAccount(newAcc) {
    const accountWithId = { ...newAcc, id: Date.now() };
    setAccounts((prev) => [accountWithId, ...prev]);
  }

  function deleteAccount(id) {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  }

  function updateAccount(id, updatedFields) {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
    );
  }

  const filteredAccounts = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return accounts;

    return accounts.filter(
      (a) =>
        a.service.toLowerCase().includes(q) ||
        a.accountName.toLowerCase().includes(q)
    );
  }, [accounts, search]);

  const totalAccounts = useMemo(() => {
    return accounts.reduce((count) => count + 1, 0);
  }, [accounts]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Account Management</h1>
        <p className="subtitle">Store your account info and details below! (temporarily)</p>

        <Account onAdd={addAccount} />

        <div className="search-row">
          <input
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by service or account name..."
          />
          <div className="stats">
            Total accounts: <strong>{totalAccounts}</strong>
          </div>
        </div>

        <div className="Accounts">
          {filteredAccounts.map((account) => (
            <Card
              key={account.id}
              account={account}
              onDelete={deleteAccount}
              onUpdate={updateAccount}
            />
          ))}

          {filteredAccounts.length === 0 && (
            <p className="empty">No accounts match your search.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
