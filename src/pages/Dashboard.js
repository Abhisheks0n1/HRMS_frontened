import { useEffect, useState } from 'react';
import { employeeAPI } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ total_employees: 0, present_today: 0 });

  useEffect(() => {
    employeeAPI.stats()
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '30px', fontSize: '32px' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
        <div className="card">
          <h3>Total Employees</h3>
          <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '15px 0' }}>
            {stats.total_employees}
          </p>
        </div>
        <div className="card">
          <h3>Present Today</h3>
          <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '15px 0', color: '#10b981' }}>
            {stats.present_today}
          </p>
        </div>
      </div>
    </div>
  );
}