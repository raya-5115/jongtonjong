export default function StatCard({
  title,
  value,
  icon: Icon,
  accent = "blue",
}) {
  const accentClasses = {
    blue: "bg-[#eef4ff] text-[#1d4ed8]",
    indigo: "bg-[#f1f5ff] text-[#4f46e5]",
    green: "bg-[#f0fdf4] text-[#15803d]",
    amber: "bg-[#fffbeb] text-[#b45309]",
  };

  const displayValue =
    typeof value === "number" ? value.toLocaleString("id-ID") : value;

  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${accentClasses[accent]}`}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {title}
        </p>
      </div>
      
      <h3 className="text-[24px] font-semibold text-slate-900">
        {displayValue}
      </h3>
    </div>
  );
}
