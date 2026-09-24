export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full sm:max-w-sm">
      <label htmlFor="search" className="sr-only">
        Search events
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search events…"
        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:bg-slate-900"
      />
    </div>
  );
}