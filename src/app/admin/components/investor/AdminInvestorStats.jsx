export function AdminInvestorStats({ stats = [] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md dark:bg-zinc-900 dark:border-zinc-800 ${stat.border}`}
        >
          <div
            className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-5 transition-transform group-hover:scale-110 ${stat.bg.replace(
              "bg-",
              "bg-",
            )}`}
          ></div>
          <div className="relative">
            <div className="mb-4 inline-flex rounded-xl bg-gray-50 p-2.5 ring-1 ring-gray-100 dark:bg-zinc-800 dark:ring-zinc-700">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="flex items-center justify-between">
              <dt className="truncate text-sm font-medium text-gray-500 dark:text-zinc-400">
                {stat.label}
              </dt>
              <dd className="md:text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
                {stat.value}
              </dd>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
