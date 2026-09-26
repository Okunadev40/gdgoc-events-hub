import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
     isActive
       ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
       : "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
   }`;

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <Link
          to="/"
          className="text-base font-bold text-primary dark:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-lg"
        >
          GDGoC Bowen Events
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Main" className="flex gap-1">
            <NavLink to="/" end className={linkClass}>
              Events
            </NavLink>

            <NavLink to="/my-rsvps" className={linkClass}>
              My RSVPs
            </NavLink>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}