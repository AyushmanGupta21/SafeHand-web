'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { glyph: '<', target: 120, suffix: 'ms', decimals: 0, label: 'Pre-Sign Check' },
  { glyph: '%', target: 99.99, suffix: '%', decimals: 2, label: 'Policy Accuracy' },
  { glyph: '*', target: 24, suffix: '/7', decimals: 0, label: 'Autonomous Guard' },
  { glyph: '#', target: 2.4, suffix: 'M', decimals: 1, label: 'Agent Actions' },
] as const;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function StatValue({
  target,
  suffix,
  decimals,
  index,
}: {
  target: number;
  suffix: string;
  decimals: number;
  index: number;
}): JSX.Element {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState('0');
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;

          const duration = 1500 + index * 80;
          const startOffset = 480 + index * 90;

          window.setTimeout(() => {
            const t0 = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - t0) / duration);
              const value = target * easeOutCubic(p);
              setDisplay(value.toFixed(decimals));
              if (p < 1) requestAnimationFrame(tick);
              else setDisplay(target.toFixed(decimals));
            };
            requestAnimationFrame(tick);
          }, startOffset);
        });
      },
      { threshold: 0.25 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, decimals, index]);

  return (
    <span ref={ref} className="stat-value">
      {display}
      {suffix}
    </span>
  );
}

export default function LandingPage(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    function onResize() {
      if (window.innerWidth > 720) setMenuOpen(false);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Home', active: true, href: '#' },
    { label: 'Product', active: false, href: '/developers' },
    { label: 'Case Studies', active: false, href: '/activity' },
    { label: 'Contact', active: false, href: '/verify' },
  ];

  return (
    <>
      {/* Background video */}
      <div className="bg" aria-hidden="true">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="page">
        {/* ── Header ── */}
        <header className="site-header">
          <a className="logo" href="#" aria-label="SafeHand home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/safehand-mark.png" alt="" width={52} height={52} />
          </a>

          <nav className="nav-pill" aria-label="Primary">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className={`nav-link${l.active ? ' active' : ''}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <a className="sign-in" href="/signin">
            Sign in
          </a>

          {/* Mobile burger */}
          <button
            type="button"
            className={`burger${menuOpen ? ' open' : ''}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </header>

        {/* ── Hero ── */}
        <main className="hero">
          <div className="trust anim" style={{ ['--d' as string]: '0.05s' }}>
            <span className="avatar a1">
              <i className="fa-brands fa-microsoft" aria-hidden="true" />
            </span>
            <span className="avatar a2">
              <i className="fa-brands fa-amazon" aria-hidden="true" />
            </span>
            <span className="avatar a3">
              <i className="fa-brands fa-google" aria-hidden="true" />
            </span>
            <span className="trust-pill">Trusted by 2000+ Enterprises</span>
          </div>

          <h1 className="headline anim">
            <span style={{ ['--hd' as string]: '0.12s' }}>Intelligence</span>
            <span style={{ ['--hd' as string]: '0.3s' }}>Designed To Evolve</span>
          </h1>

          <p className="subhead anim" style={{ ['--d' as string]: '0.28s' }}>
            Give AI agents a wallet-native leash. Enforce spend limits, allowlists and
            humanity proofs before any action is signed.
          </p>

          <a className="cta anim" href="/signin" style={{ ['--d' as string]: '0.4s' }}>
            Get Started
          </a>
        </main>

        {/* ── Stats footer ── */}
        <footer className="stats">
          {STATS.map((s, i) => (
            <div
              className="stat anim"
              key={s.label}
              style={{ ['--d' as string]: `${0.5 + i * 0.08}s` }}
            >
              <span className="stat-icon">{s.glyph}</span>
              <StatValue target={s.target} suffix={s.suffix} decimals={s.decimals} index={i} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </footer>
      </div>

      {/* ── Mobile menu overlay ── */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-sheet" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`mobile-link${l.active ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="/signin" className="mobile-signin" onClick={() => setMenuOpen(false)}>
              Sign in
            </a>
          </div>
        </div>
      )}
    </>
  );
}
