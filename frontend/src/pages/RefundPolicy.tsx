export default function RefundPolicy() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Refunds & credits</p>
        <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
          If something’s off, we’ll make it right quickly.
        </h1>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300 max-w-3xl">
          We aim to resolve issues on the first touch. Below is how we handle refunds, replacements, and credits.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <div className="rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Eligibility</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <li>• Incorrect items, missing items, or significant delay</li>
            <li>• Quality issues (temperature, taste, packaging damage)</li>
            <li>• Payment charged but order not received</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">What we offer</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <li>• Full or partial refunds to your original payment method</li>
            <li>• Instant Tastevia credits for quick reorders</li>
            <li>• Free replacements when possible</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">How to request</h2>
          <ol className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <li>1) Open the chat bubble or call +91 98765 43210.</li>
            <li>2) Share your order number and what went wrong (photos help).</li>
            <li>3) We resolve within a few minutes during service hours.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
