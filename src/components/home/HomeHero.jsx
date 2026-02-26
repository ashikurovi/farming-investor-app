export default function HomeHero() {
  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden sm:min-h-[calc(100vh-4rem)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/70 to-amber-800/75 mix-blend-multiply" />

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl flex-col justify-center px-4 py-10 text-white sm:min-h-[calc(100vh-4rem)] sm:px-6 lg:px-8">
        <section className="max-w-2xl space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-300">
            Agro
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Farming Company
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-amber-100/90 sm:text-base">
            The point of using lorem ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using &quot;Content here,
            content here&quot;, making it look like readable English.
          </p>
          <div className="pt-4">
            <a
              href="#discover"
              className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/10 px-9 py-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white shadow-md backdrop-blur transition hover:bg-white/20"
            >
              Discover
            </a>
          </div>
        </section>
      </main>
    </section>
  );
}

