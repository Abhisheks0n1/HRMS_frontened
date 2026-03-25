import { useEffect, useState } from 'react';
import { employeeAPI } from '../services/api';
import EmployeeTable from '../components/EmployeeTable';

const DEPARTMENTS = [
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
  "IT Support",
  "Admin"
];

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form, setForm] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await employeeAPI.getAll();
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        const updateData = {
          employee_id: editingEmployee.employee_id,
          full_name: form.full_name,
          email: form.email,
          department: form.department
        };
        await employeeAPI.update(editingEmployee.employee_id, updateData);
        setEditingEmployee(null);
      } else {
        await employeeAPI.create(form);
      }
      setForm({ employee_id: '', full_name: '', email: '', department: '' });
      loadEmployees();
    } catch (err) {
      alert(err.response?.data?.detail || "Operation failed");
    }
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setForm({
      employee_id: emp.employee_id,
      full_name: emp.full_name,
      email: emp.email,
      department: emp.department
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this employee and all their attendance records?")) {
      try {
        await employeeAPI.delete(id);
        loadEmployees();
      } catch (err) {
        alert("Failed to delete employee");
      }
    }
  };

  const cancelEdit = () => {
    setEditingEmployee(null);
    setForm({ employee_id: '', full_name: '', email: '', department: '' });
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px', fontSize: '32px' }}>Employee Management</h1>

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>
          {editingEmployee ? "Edit Employee" : "Add New Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="text"
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={e => setForm({ ...form, employee_id: e.target.value })}
            className="input-field"
            required
            readOnly={!!editingEmployee}
            style={{ backgroundColor: editingEmployee ? '#f1f5f9' : 'white' }}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={form.full_name}
            onChange={e => setForm({ ...form, full_name: e.target.value })}
            className="input-field"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="input-field"
            required
          />

          <select
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button type="submit" className="btn btn-primary">
              {editingEmployee ? "Update Employee" : "Add Employee"}
            </button>
            
            {editingEmployee && (
              <button type="button" onClick={cancelEdit} className="btn btn-danger">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-container">
        <EmployeeTable 
          employees={employees} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
}