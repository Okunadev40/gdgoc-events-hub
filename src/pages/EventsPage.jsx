import { useEvents } from "../hooks/useEvents";

export default function EventsPage() {
  const { events, status } = useEvents();
  return (
    <p>
      Status: {status} · {events.length} events
    </p>
  );
}