import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { categoryStyles } from "../lib/categoryStyles";
import { formatDate, isPast } from "../lib/formatDate";
import Badge from "../components/ui/Badge";
import Skeleton from "../components/ui/Skeleton";
import ErrorState from "../components/ErrorState";
import RsvpForm from "../components/RsvpForm";

const backLinkClass =
  "text-sm font-medium text-primary dark:text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export default function EventDetailPage() {
  const { id } = useParams();
  const { events, status, retry, getGoingCount } = useEvents();
  const event = events.find((e) => e.id === id);

  useEffect(() => {
    if (event) document.title = `${event.title} | GDGoC Bowen Events`;
    return () => {
      document.title = "GDGoC Bowen Events Hub";
    };
  }, [event]);

  if (status === "loading") {
    return (
      <div role="status">
        <span className="sr-only">Loading event…</span>
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="mt-4 h-9 w-3/4" />
        <Skeleton className="mt-3 h-4 w-1/2" />
        <Skeleton className="mt-6 h-32 w-full" />
      </div>
    );
  }

  if (status === "error") {
    return <ErrorState onRetry={retry} />;
  }

  if (!event) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          We couldn't find that event. It may have been removed.
        </p>
        <Link to="/" className={`${backLinkClass} mt-4 inline-block`}>
          Back to events
        </Link>
      </div>
    );
  }

  const past = isPast(event.date);

  return (
    <div>
      <Link to="/" className={backLinkClass}>
        ← Back to events
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <Badge className={categoryStyles[event.category]}>
              {event.category}
            </Badge>
            {past && (
              <Badge className="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Past event
              </Badge>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{event.title}</h1>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-slate-500 dark:text-slate-400">When</dt>
              <dd>{formatDate(event.date)}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-slate-500 dark:text-slate-400">Where</dt>
              <dd>{event.venue}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-slate-500 dark:text-slate-400">Going</dt>
              <dd aria-live="polite">{getGoingCount(event)}</dd>
            </div>
          </dl>

          <p className="mt-6 leading-relaxed">{event.details}</p>
        </section>

        <aside>
          {past ? (
            <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold">RSVPs are closed</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                This event has already taken place.
              </p>
            </div>
          ) : (
            <RsvpForm eventId={event.id} />
          )}
        </aside>
      </div>
    </div>
  );
}