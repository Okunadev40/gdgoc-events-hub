import { describe, expect, it } from "vitest";
import { validateRsvp } from "./validateRsvp";

const valid = {
  name: "Ada Obi",
  email: "ada@example.com",
  level: "200L",
  track: "Web",
};

describe("validateRsvp", () => {
  it("accepts valid input", () => {
    expect(validateRsvp(valid)).toEqual({});
  });

  it("requires every field", () => {
    const errors = validateRsvp({ name: "", email: "", level: "", track: "" });
    expect(Object.keys(errors)).toEqual(["name", "email", "level", "track"]);
  });

  it("rejects a name that is too short", () => {
    expect(validateRsvp({ ...valid, name: "A" }).name).toBeDefined();
  });

  it("treats a whitespace-only name as empty", () => {
    expect(validateRsvp({ ...valid, name: "   " }).name).toBeDefined();
  });

  it("rejects invalid emails", () => {
    for (const email of ["abc", "abc@", "a@b", "a b@c.com"]) {
      expect(validateRsvp({ ...valid, email }).email).toBeDefined();
    }
  });

  it("rejects a level that is not in the list", () => {
    expect(validateRsvp({ ...valid, level: "900L" }).level).toBeDefined();
  });
});