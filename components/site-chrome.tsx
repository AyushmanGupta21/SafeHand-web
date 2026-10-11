'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/developers', label: 'Developers & SDK' },
  { href: '/agent', label: 'AI Leash' },
  { href: '/extension', label: 'Extension' },
  { href: '/activity', label: 'Activity' },
  { href: '/verify', label: 'Verify' },
] as const;

function SafeHandLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="SafeHand home">
      <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/safehand-mark.png" alt="SafeHand" className="size-8 object-contain" />
      </div>
      <span className="text-sm font-bold tracking-tight text-white transition-opacity group-hover:opacity-80">
        SafeHand
      </span>
    </Link>
  );
}

/**
 * Renders the shared site nav + footer on every page EXCEPT the landing page
 * ("/"), which is a self-contained, full-viewport composition with its own header.
 */
export function SiteChrome({ children }: { children: React.ReactNode }): JSX.Element {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <>
      <nav className="glass sticky top-0 z-50 border-b border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-shell items-center justify-between px-6 py-3.5">
          <SafeHandLogo />
          <div className="hidden items-center gap-1 sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-1.5 text-sm text-muted transition-all hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/verify"
              className="hidden rounded-lg px-3 py-1.5 text-sm text-muted transition-all hover:bg-white/[0.04] hover:text-white sm:block"
            >
              Verify
            </Link>
            <Link
              href="/signin"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {children}

      <footer className="border-t border-white/[0.06] px-6 py-12">
        <div className="mx-auto max-w-shell">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <SafeHandLogo />
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-muted transition-colors hover:text-subtext"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-white/[0.04] pt-6">
            <p className="text-xs text-muted">© 2026 SafeHand. All rights reserved.</p>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-success shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
              <span className="text-xs text-muted">Base Sepolia</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
