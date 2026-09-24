import { CATEGORIES } from "../constants";

export default function CategoryFilter({ value, onChange }) {
  const options = ["All", ...CATEGORIES];
  const selected = value || "All";

  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="flex gap-2 overflow-x-auto pb-1"
    >
      {options.map((option) => {
        const active = selected === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option === "All" ? "" : option)}
            className={`h-11 shrink-0 rounded-full border px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active
                ? "border-primary bg-primary text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}