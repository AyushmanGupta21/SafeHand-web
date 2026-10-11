import './globals.css';
import type { Metadata } from 'next';
import { SiteChrome } from '../components/site-chrome';
import { ToastProvider } from '../components/ui/toast';

export const metadata: Metadata = {
  title: {
    default: 'Intelligence Designed To Evolve',
    template: '%s | SafeHand',
  },
  description:
    'SafeHand — a wallet-native trust and permission layer for AI agents. Prove humanity, sign your actions, and put AI agents on a hard leash without exposing a single identity attribute.',
  keywords: ['Web3', 'wallet', 'AI agents', 'zero-knowledge', 'Base', 'SafeHand'],
  openGraph: {
    title: 'SafeHand — Intelligence Designed To Evolve',
    description: 'Wallet-native trust and permission layer for AI agents.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <head>
        {/* Inter (UI) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* BubbledotICG-FinePos (retro dot-matrix display) */}
        <link
          href="https://db.onlinewebfonts.com/c/8cb707a9b8a73f8a7403336b861c3074?family=BubbledotICG-FinePos"
          rel="stylesheet"
        />
        {/* Font Awesome 6.5.2 (enterprise brand icons) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <ToastProvider>
          <SiteChrome>{children}</SiteChrome>
        </ToastProvider>
      </body>
    </html>
  );
}
