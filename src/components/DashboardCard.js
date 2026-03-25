export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-4xl font-bold text-slate-800 mt-2">{value}</p>
        </div>
        <span className="text-5xl opacity-20">{icon}</span>
      </div>
    </div>
  );
}