import { Link } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

export default function MyRsvpsPage() {
  const { events, rsvps, status, retry } = useEvents();

  if (status === "loading") {
    return <p role="status">Loading your RSVPs…</p>;
  }

  if (status === "error") {
    return (
      <div role="alert" className="py-12 text-center">
        <p className="font-medium">Couldn't load your RSVPs.</p>
        <button
          type="button"
          onClick={retry}
          className="mt-4 h-11 rounded-md bg-primary px-5 text-white hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Try again
        </button>
      </div>
    );
  }

  const myRsvps = [...rsvps].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

  if (myRsvps.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold">No RSVPs yet</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Events you RSVP to will show up here.
        </p>
        <Link to="/" className="mt-4 inline-block text-primary dark:text-blue-400 underline">
          Browse events
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">My RSVPs</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        {myRsvps.length} {myRsvps.length === 1 ? "event" : "events"}
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {myRsvps.map((rsvp) => {
          const event = events.find((e) => e.id === rsvp.eventId);

          return (
            <li
              key={rsvp.id}
              className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              {event ? (
                <>
                  <h2 className="font-semibold">
                    <Link
                      to={`/events/${event.id}`}
                      className="text-primary dark:text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {event.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {dateFormatter.format(new Date(event.date))} · {event.venue}
                  </p>
                </>
              ) : (
                <h2 className="font-semibold">Event no longer available</h2>
              )}

              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <dt className="text-slate-500 dark:text-slate-400">Name</dt>
                <dd>{rsvp.name}</dd>
                <dt className="text-slate-500 dark:text-slate-400">Email</dt>
                <dd className="break-all">{rsvp.email}</dd>
                <dt className="text-slate-500 dark:text-slate-400">Level</dt>
                <dd>{rsvp.level}</dd>
                <dt className="text-slate-500 dark:text-slate-400">Track</dt>
                <dd>{rsvp.track}</dd>
              </dl>
            </li>
          );
        })}
      </ul>
    </div>
  );
}