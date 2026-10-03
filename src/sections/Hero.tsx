import { ArrowRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { AnimatedWord, Emblem } from '../components/BrandMark';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '../data/links';

const socials = [
  { icon: Github, href: GITHUB_URL, label: 'GitHub' },
  { icon: Linkedin, href: LINKEDIN_URL, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${EMAIL}`, label: 'Email' },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-24">
      {/* The entrance is CSS-driven (see .hero-in), so it plays from the server-rendered HTML. */}
      <div className="hero-in mx-auto max-w-5xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-pencil/15 bg-surface px-4 py-1.5 text-sm font-medium text-pencil/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to software developer roles
        </div>

        {/* Brand lockup: first name in heavy type, with the K monogram as its final letter */}
        <div className="relative mb-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[115%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(111,142,219,0.22),transparent)]"
          />
          <div className="font-display relative flex items-center justify-center gap-[0.1em] text-[3.75rem] font-extrabold leading-[0.9] tracking-[-0.045em] sm:text-8xl md:text-[9rem] lg:text-[11rem]">
            <h1 aria-label="Behlah Katleriwala" className="m-0">
              <AnimatedWord text="Behlah" baseDelay={0.2} base="#ffffff" peak="#8fa9ee" />
            </h1>
            <span className="emblem-in inline-flex">
              <Emblem
                draw
                interactive
                greet
                className="h-[0.74em] w-[0.74em] text-white drop-shadow-[0_12px_32px_rgba(111,142,219,0.35)]"
              />
            </span>
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink-blue md:text-sm">
          Behlah Katleriwala · Software Developer
        </p>
        <p className="mx-auto mb-10 max-w-2xl text-base text-pencil/60 md:text-lg">
          BSc Computing Science, Thompson Rivers University · Kamloops, BC
        </p>

        <div className="mb-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-ink-blue px-7 font-semibold text-paper transition-opacity hover:opacity-90"
          >
            See My Work <ArrowRight className="h-5 w-5" />
          </button>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-pencil/25 px-7 font-semibold text-pencil transition-colors hover:bg-pencil/5"
          >
            View Resume <FileText className="h-5 w-5" />
          </a>
        </div>

        <div className="flex justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              {...(social.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={social.label}
              className="rounded-full border border-pencil/15 p-3 text-pencil/70 transition-colors hover:border-ink-blue/50 hover:text-ink-blue"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
