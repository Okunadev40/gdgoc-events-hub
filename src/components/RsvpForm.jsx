import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { validateRsvp } from "../lib/validateRsvp";
import { CATEGORIES, LEVELS } from "../constants";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";

const initialValues = { name: "", email: "", level: "", track: "" };

export default function RsvpForm({ eventId }) {
  const { addRsvp } = useEvents();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [confirmed, setConfirmed] = useState(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    setFormError("");

    // Only re-check a field that is already showing an error
    if (errors[name]) {
      const fieldError = validateRsvp(nextValues)[name];
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldError = validateRsvp(values)[name];
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validateRsvp(values);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current.elements[firstInvalid]?.focus();
      return;
    }

    const result = addRsvp(eventId, values);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setConfirmed(result.rsvp);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setFormError("");
    setConfirmed(null);
  };

  if (confirmed) {
    return (
      <div
        role="status"
        className="rounded-lg border border-green-300 bg-green-50 p-5 dark:border-green-800 dark:bg-green-950"
      >
        <h2 className="text-lg font-semibold">You're in, {confirmed.name}!</h2>
        <p className="mt-1 text-sm">
          Your RSVP is confirmed for {confirmed.email}.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/my-rsvps"
            className="text-sm font-medium text-primary dark:text-blue-400 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            View my RSVPs
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            RSVP with another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="text-lg font-semibold">RSVP for this event</h2>

      <Input
        id="name"
        name="name"
        label="Full name"
        autoComplete="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
      />
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
      />
      <Select
        id="level"
        name="level"
        label="Level"
        options={LEVELS}
        value={values.level}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.level}
      />
      <Select
        id="track"
        name="track"
        label="Track"
        options={CATEGORIES}
        value={values.track}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.track}
      />

      {formError && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      )}

      <Button type="submit" className="w-full">
        RSVP
      </Button>
    </form>
  );
}