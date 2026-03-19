export default function Support() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Get help</p>
        <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
          Live support whenever your cravings need backup.
        </h1>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300 max-w-3xl">
          Our team answers in minutes during service hours. Tell us about order changes, delivery updates, or anything else and we'll sort it quickly.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Chat with us</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Tap the chat bubble in the corner to start a live conversation. We usually reply in under 3 minutes.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <li>• Order status & delivery ETA</li>
            <li>• Special requests and changes</li>
            <li>• Refunds, replacements, or credits</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Call or email</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Prefer a call? Reach us during service hours.</p>
          <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <p>Phone: +91 98765 43210</p>
            <p>Email: care@tastevia.com</p>
            <p>Hours: 9:00 AM – 11:00 PM IST, every day</p>
          </div>
        </div>
      </div>
    </section>
  );
}
