import { Link } from "react-router-dom";
import Badge from "./ui/Badge";
import { categoryStyles } from "../lib/categoryStyles";
import { formatDate, isPast } from "../lib/formatDate";
import { useEvents } from "../hooks/useEvents";

export default function EventCard({ event }) {
  const { getGoingCount } = useEvents();
  const past = isPast(event.date);

  return (
    <article className="relative flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-2">
        <Badge className={categoryStyles[event.category]}>{event.category}</Badge>
        {past && (
          <Badge className="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Past
          </Badge>
        )}
      </div>

      <h2 className="mt-3 text-lg font-semibold leading-snug">
        <Link
          to={`/events/${event.id}`}
          className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary"
        >
          {event.title}
        </Link>
      </h2>

      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        {formatDate(event.date)}
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">{event.venue}</p>

      <p className="mt-3 line-clamp-2 text-sm">{event.description}</p>

      <p className="mt-auto pt-4 text-sm font-medium">
        {getGoingCount(event)} going
      </p>
    </article>
  );
}