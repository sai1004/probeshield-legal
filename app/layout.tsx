import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#051424',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://probeshield.com'),
  title: {
    default: 'ProbeShield — Network Security Auditor for Android',
    template: '%s | ProbeShield',
  },
  description:
    'Discover hidden devices, scan open ports, and get a clear risk picture of your WiFi network. 100% on-device, no cloud, no account. Free Android app.',
  keywords: [
    'network security', 'android', 'wifi scanner', 'port scanner',
    'network audit', 'device discovery', 'vulnerability scanner',
    'home network security', 'probeshield', 'network monitor',
    'LAN scanner', 'IP scanner', 'network tool',
  ],
  authors: [{ name: 'Saikiran Bavandla', url: 'https://probeshield.com' }],
  creator: 'Saikiran Bavandla',
  publisher: 'ProbeShield',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://probeshield.com',
    siteName: 'ProbeShield',
    title: 'ProbeShield — Network Security Auditor for Android',
    description:
      'Discover hidden devices, scan open ports, get a clear risk picture. 100% on-device. Free Android app.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProbeShield — Network Security Auditor for Android',
    description:
      'Discover hidden devices, scan open ports, get a clear risk picture. 100% on-device. Free.',
    creator: '@probeshield',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
