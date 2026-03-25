import { useEffect, useState, useCallback } from 'react';
import { attendanceAPI, employeeAPI } from '../services/api';
import AttendanceTable from '../components/AttendanceTable';

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ employee_id: '', date: '', status: 'Present' });
  const [filterEmp, setFilterEmp] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    employeeAPI.getAll().then(res => setEmployees(res.data));
  }, []);

  const loadRecords = useCallback(async () => {
    try {
      const res = await attendanceAPI.getAll({
        employee_id: filterEmp || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      });
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [filterEmp, startDate, endDate]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const handleMark = async (e) => {
    e.preventDefault();
    try {
      await attendanceAPI.mark(form);
      alert('Attendance marked successfully!');
      setForm({ ...form, date: '' });
      loadRecords();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed');
    }
  };

  const showSummary = async () => {
    if (!filterEmp) return alert("Select an employee");
    try {
      const res = await attendanceAPI.getSummary(filterEmp);
      alert(`Present Days: ${res.data.present_days} / ${res.data.total_days_marked}`);
    } catch (err) {
      alert("Failed to get summary");
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px', fontSize: '32px' }}>Attendance Management</h1>

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>Mark Attendance</h2>
        <form onSubmit={handleMark} className="form-grid">
          <select value={form.employee_id} onChange={e => setForm({...form, employee_id: e.target.value})} className="input-field" required>
            <option value="">Select Employee</option>
            {employees.map(e => <option key={e.employee_id} value={e.employee_id}>{e.full_name}</option>)}
          </select>
          <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="input-field" required />
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="input-field">
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button type="submit" className="btn btn-success">Mark Attendance</button>
        </form>
      </div>

      <div className="card" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <select value={filterEmp} onChange={e => setFilterEmp(e.target.value)} className="input-field">
          <option value="">All Employees</option>
          {employees.map(e => <option key={e.employee_id} value={e.employee_id}>{e.full_name}</option>)}
        </select>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input-field" />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input-field" />
        <button onClick={loadRecords} className="btn btn-primary">Filter</button>
        <button onClick={showSummary} className="btn btn-primary">Show Summary</button>
      </div>

      <div className="table-container">
        <AttendanceTable records={records} />
      </div>
    </div>
  );
}