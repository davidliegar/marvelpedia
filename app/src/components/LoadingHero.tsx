function LoadingHero() {
  return (
    <article data-testid="loading" className="bg-white grid grid-rows-[240px_auto_max-content]">
    <div className="animate-pulse w-full h-full bg-slate-200" />
    <div className="p-4">
      <p className="text-lg font-semibold py-4 w-1/2 h-10 bg-slate-200 animate-pulse"  />
      <p className="text-neutral-600 max-h-28 mt-2 line-clamp-4 w-full h-10 bg-slate-200 bg-slate-200 animate-pulse" />
    </div>

    <div className="w-2/5 h-10 bg-slate-200 bg-slate-200 animate-pulse place-self-end m-4">
    </div>
  </article>
  )
}

export default LoadingHero
