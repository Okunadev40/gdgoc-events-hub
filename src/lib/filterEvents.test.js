import { describe, expect, it } from "vitest";
import { filterEvents, sortEvents } from "./filterEvents";

const events = [
  { id: "1", title: "Intro to React", venue: "CS Lab", category: "Web", date: "2099-01-01T10:00:00+01:00" },
  { id: "2", title: "Flutter Study Jam", venue: "Lecture Theatre", category: "Mobile", date: "2099-02-01T10:00:00+01:00" },
  { id: "3", title: "HTML Bootcamp", venue: "CS Lab", category: "Web", date: "2000-01-01T10:00:00+01:00" },
];

const ids = (list) => list.map((e) => e.id);

describe("filterEvents", () => {
  it("returns everything when there is no query or category", () => {
    expect(ids(filterEvents(events, "", ""))).toEqual(["1", "2", "3"]);
  });

  it("searches case-insensitively", () => {
    expect(ids(filterEvents(events, "REACT", ""))).toEqual(["1"]);
  });

  it("filters by category", () => {
    expect(ids(filterEvents(events, "", "Web"))).toEqual(["1", "3"]);
  });

  it("combines search and category", () => {
    expect(ids(filterEvents(events, "lab", "Web"))).toEqual(["1", "3"]);
    expect(ids(filterEvents(events, "lab", "Mobile"))).toEqual([]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterEvents(events, "zzz", "")).toEqual([]);
  });
});

describe("sortEvents", () => {
  it("puts upcoming events first (soonest first), then past events", () => {
    const shuffled = [events[2], events[1], events[0]];
    expect(ids(sortEvents(shuffled))).toEqual(["1", "2", "3"]);
  });
});