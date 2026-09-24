import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
    isActive
      ? "bg-primary/10 text-primary"
      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
  }`;

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="text-lg font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          GDGoC Bowen Events
        </Link>
        <nav aria-label="Main" className="flex gap-1">
          <NavLink to="/" end className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/my-rsvps" className={linkClass}>
            My RSVPs
          </NavLink>
        </nav>
      </div>
    </header>
  );
}