export default function AttendanceTable({ records }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {records.length === 0 ? (
          <tr><td colSpan="3" className="empty-state">No attendance records found</td></tr>
        ) : (
          records.map(r => (
            <tr key={r.id}>
              <td>{r.employee_id}</td>
              <td>{r.date}</td>
              <td>
                <span className={r.status === 'Present' ? 'status-present' : 'status-absent'}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}