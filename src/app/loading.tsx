export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="max-w-7xl w-full mx-auto mb-8 flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-80 bg-zinc-800 rounded-xl" />
          <div className="h-4 w-48 bg-zinc-900 rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-zinc-800 rounded-xl" />
      </div>

      {/* KPI Cards skeleton */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-zinc-900/80 rounded-2xl border border-zinc-800" />
        ))}
      </div>

      {/* Podium skeleton */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-end">
        <div className="h-64 bg-zinc-900/60 rounded-2xl border border-zinc-800" />
        <div className="h-80 bg-zinc-900/80 rounded-2xl border border-amber-500/20" />
        <div className="h-56 bg-zinc-900/60 rounded-2xl border border-zinc-800" />
      </div>

      {/* Charts skeleton */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 h-80 bg-zinc-900/80 rounded-2xl border border-zinc-800" />
        <div className="h-80 bg-zinc-900/80 rounded-2xl border border-zinc-800" />
      </div>
    </div>
  );
}
