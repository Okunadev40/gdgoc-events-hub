const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
};

export default function Button({
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}