import { useCallback, useEffect, useMemo, useState } from "react";
import { EventsContext } from "./EventsContext";
import { fetchEvents } from "../services/eventsApi";
import { loadJSON, saveJSON } from "../lib/storage";

const RSVP_KEY = "gdgoc-rsvps";

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [rsvps, setRsvps] = useState(() => loadJSON(RSVP_KEY, []));

  const load = useCallback(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const retry = useCallback(() => {
    setStatus("loading");
    load();
  }, [load]);

  const addRsvp = useCallback(
    (eventId, form) => {
      const email = form.email.trim().toLowerCase();

      const duplicate = rsvps.some(
        (r) => r.eventId === eventId && r.email === email
      );
      if (duplicate) {
        return { ok: false, error: "This email has already RSVPed for this event." };
      }

      const rsvp = {
        id: crypto.randomUUID(),
        eventId,
        name: form.name.trim(),
        email,
        level: form.level,
        track: form.track,
        createdAt: new Date().toISOString(),
      };

      const next = [...rsvps, rsvp];
      setRsvps(next);
      saveJSON(RSVP_KEY, next);
      return { ok: true, rsvp };
    },
    [rsvps]
  );

  // Mock "going" count + RSVPs made in this browser
  const getGoingCount = useCallback(
    (event) => event.going + rsvps.filter((r) => r.eventId === event.id).length,
    [rsvps]
  );

  const value = useMemo(
    () => ({ events, status, retry, rsvps, addRsvp, getGoingCount }),
    [events, status, retry, rsvps, addRsvp, getGoingCount]
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}