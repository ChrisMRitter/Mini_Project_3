import React, { useMemo, useState } from "react";
import "./App.css";
import { Card } from "../components/Card.jsx";
import { Account } from "../components/Account.jsx";

function App() {
  const [services, setServices] = useState([
    {
      id: 1,
      service: "Google",
      accounts: [
        {
          id: 101,
          accountName: "School",
          username: "chris.school",
          password: "demo123",
        },
      ],
    },
    {
      id: 2,
      service: "Instagram",
      accounts: [
        {
          id: 201,
          accountName: "Personal",
          username: "chris_pics",
          password: "password-demo",
        },
      ],
    },
  ]);

  const [search, setSearch] = useState("");
  const [showAllList, setShowAllList] = useState(false);

  function addAccount(form) {
    const serviceName = (form.service || "").trim();
    if (!serviceName) return;

    const newAccount = {
      id: Date.now() + Math.floor(Math.random() * 100000),
      accountName: (form.accountName || "").trim(),
      username: (form.username || "").trim(),
      password: (form.password || "").trim(),
    };

    if (!newAccount.accountName) return;

    setServices((prev) => {
      const idx = prev.findIndex(
        (s) => s.service.toLowerCase() === serviceName.toLowerCase()
      );

      if (idx === -1) {
        const newService = {
          id: Date.now(),
          service: serviceName,
          accounts: [newAccount],
        };
        return [newService, ...prev];
      }

      return prev.map((s, i) => {
        if (i !== idx) return s;
        return { ...s, service: serviceName, accounts: [newAccount, ...s.accounts] };
      });
    });
  }

  function deleteAccount(serviceId, accountId) {
    setServices((prev) =>
      prev
        .map((s) => {
          if (s.id !== serviceId) return s;
          return { ...s, accounts: s.accounts.filter((a) => a.id !== accountId) };
        })
        .filter((s) => s.accounts.length > 0)
    );
  }

  function updateAccount(serviceId, accountId, updatedFields) {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId) return s;
        return {
          ...s,
          accounts: s.accounts.map((a) =>
            a.id === accountId ? { ...a, ...updatedFields } : a
          ),
        };
      })
    );
  }

  const filteredServices = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return services;

    return services
      .map((s) => {
        const serviceMatch = s.service.toLowerCase().includes(q);
        const filteredAccounts = s.accounts.filter(
          (a) =>
            a.accountName.toLowerCase().includes(q) ||
            a.username.toLowerCase().includes(q)
        );

        if (serviceMatch) return s;
        if (filteredAccounts.length === 0) return null;

        return { ...s, accounts: filteredAccounts };
      })
      .filter(Boolean);
  }, [services, search]);

  const totalAccounts = useMemo(() => {
    return services.reduce((sum, s) => sum + s.accounts.length, 0);
  }, [services]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Account Management</h1>
        <p className="subtitle">Add your acccount info below to store it temporarily.</p>

        <Account onAdd={addAccount} />

        <div className="search-row">
          <input
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service, account name, or username..."
          />
          <div className="stats">
            Total accounts: <strong>{totalAccounts}</strong>
          </div>
        </div>

        <div className="Accounts">
          {filteredServices.map((serviceGroup) => (
            <Card
              key={serviceGroup.id}
              serviceGroup={serviceGroup}
              onDeleteAccount={deleteAccount}
              onUpdateAccount={updateAccount}
            />
          ))}

          {filteredServices.length === 0 && (
            <p className="empty">No matching accounts.</p>
          )}
        </div>

        <div className="bottom-panel">
          <button
            className="btn-primary"
            onClick={() => setShowAllList((v) => !v)}
          >
            {showAllList ? "Hide All Accounts (List View)" : "Show All Accounts (List View)"}
          </button>

          {showAllList && (
            <div className="all-list">
              <ul>
                {services.map((s) => (
                  <li key={s.id}>
                    <strong>{s.service}</strong>
                    <ul>
                      {s.accounts.map((a) => (
                        <li key={a.id}>
                          {a.accountName} — {a.username} — {a.password}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
