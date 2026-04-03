import Link from "next/link";
import Image from "next/image";
import { MoveRight, Mail } from "lucide-react";

export function ContactHero() {
  return (
    <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-zinc-950">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Contact Hero - Sustainable Investing Conversation"
          fill
          priority
          className="object-cover opacity-50 scale-105 animate-slow-zoom"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[color:rgba(77,140,30,0.22)] via-zinc-950/40 to-zinc-950/80" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          
          {/* Badge */}
          <div className="mb-8 inline-flex animate-fade-in-up opacity-0 [animation-delay:200ms] items-center gap-2 rounded-full border border-[color:rgba(77,140,30,0.22)] bg-[color:rgba(77,140,30,0.12)] px-4 py-1.5 text-sm font-medium text-[color:rgba(124,194,46,0.95)] backdrop-blur-md shadow-[0_0_18px_-6px_rgba(124,194,46,0.22)] hover:bg-[color:rgba(77,140,30,0.16)] transition-colors">
            <Mail className="h-4 w-4 text-[color:rgba(124,194,46,0.95)]" />
            <span className="tracking-wide">Get in Touch</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 animate-fade-in-up opacity-0 [animation-delay:400ms] text-5xl font-bold tracking-tight text-white sm:text-4xl lg:text-6xl font-display">
            Let&apos;s start a conversation about{" "}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]">
              sustainable investing
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl animate-fade-in-up opacity-0 [animation-delay:600ms] text-lg leading-relaxed text-zinc-300/90 sm:text-md font-light">
            Have questions about our projects or want to discuss investment
            opportunities? Our team is ready to help you grow your portfolio
            with{" "}
            <span className="text-[color:rgba(124,194,46,0.95)] font-medium">
              purpose
            </span>
            .
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 [animation-delay:800ms]">
            <Link
              href="#contact-form"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-6 py-3 text-[13px] font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_-6px_rgba(124,194,46,0.35)] sm:px-7 sm:py-3 sm:text-sm"
            >
              <span className="relative z-10">Send a Message</span>
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            </Link>
            
            <Link 
              href="/"
              className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-[13px] font-medium text-zinc-300 transition-colors hover:text-white hover:bg-white/5 sm:px-7 sm:py-3 sm:text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500/50">
        <div className="h-10 w-6 rounded-full border-2 border-current flex justify-center p-1">
          <div className="h-1.5 w-1 rounded-full bg-current animate-scroll-down" />
        </div>
      </div>
    </div>
  );
}
