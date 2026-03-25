export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="5" className="empty-state">
              No employees found. Add some to get started.
            </td>
          </tr>
        ) : (
          employees.map(emp => (
            <tr key={emp.id}>
              <td><strong>{emp.employee_id}</strong></td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>
                <span style={{
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '14px'
                }}>
                  {emp.department}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => onEdit(emp)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => onDelete(emp.employee_id)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}