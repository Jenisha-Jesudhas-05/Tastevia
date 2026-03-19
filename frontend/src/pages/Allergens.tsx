export default function Allergens() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Allergens & diet</p>
        <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
          Clear allergen info and dietary notes for every order.
        </h1>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300 max-w-3xl">
          Tell us about allergies or dietary preferences at checkout. We label dishes and share prep notes so you can order with confidence.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Common allergens</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <li>• Dairy, eggs, peanuts, tree nuts</li>
            <li>• Gluten/wheat, soy, sesame</li>
            <li>• Shellfish, fish, mustard</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Many dishes can be adjusted—ask in chat before you order and we’ll confirm.
          </p>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Diet-friendly picks</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <li>• Vegetarian & vegan options labeled in menu</li>
            <li>• High-protein bowls and salads</li>
            <li>• Gluten-conscious swaps where available</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Leave notes at checkout; we’ll confirm what’s possible and mark the ticket for the kitchen.
          </p>
        </div>
      </div>
    </section>
  );
}
