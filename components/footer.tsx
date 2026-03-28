export function Footer() {
  return (
    <footer className="relative overflow-hidden -mt-24 h-[clamp(6rem,19vw,16rem)]" aria-hidden="true">
      {/* Fade overlay to blend with section above */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

      <div className="relative flex justify-center select-none pointer-events-none pt-12">
        {/* Watermark text: gradient fill + darken overlay via ::before/::after */}
        <div className="footer-watermark" />

        {/* Small centered glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1/4 h-1/3 pointer-events-none" aria-hidden="true">
          <div className="w-full h-full rounded-full blur-2xl bg-primary/10 dark:bg-primary/8" />
        </div>
      </div>
    </footer>
  )
}
