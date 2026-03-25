import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1>HRMS Lite</h1>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Dashboard
        </NavLink>
        <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>
          Employees
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}>
          Attendance
        </NavLink>
      </nav>
    </div>
  );
}