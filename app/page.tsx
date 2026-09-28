import type { Metadata } from 'next'
import LandingPage from '../components/LandingPage'

export const metadata: Metadata = {
  title: 'ProbeShield — Network Security Auditor for Android',
  description:
    'Discover hidden devices, scan open ports, and get a clear risk picture of your home WiFi. ' +
    '100% on-device. No cloud, no account, no tracking in the app. Free Android app.',
  alternates: {
    canonical: 'https://probeshield.com',
  },
  openGraph: {
    url: 'https://probeshield.com',
    title: 'ProbeShield — Network Security Auditor for Android',
    description:
      'Discover hidden devices, scan open ports, get a clear risk picture. 100% on-device. Free.',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://probeshield.com/#app',
      name: 'ProbeShield',
      alternateName: 'ProbeShield Network Security Auditor',
      applicationCategory: 'SecurityApplication',
      applicationSubCategory: 'NetworkScanner',
      operatingSystem: 'Android 8.0+',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      description:
        'ProbeShield scans your local WiFi network to identify connected devices, open ports, ' +
        'and security vulnerabilities — giving you a clear risk picture of everything on your network. ' +
        '100% on-device. No scan data ever leaves your phone.',
      softwareVersion: '1.2.0',
      datePublished: '2025-01-01',
      author: {
        '@type': 'Person',
        name: 'Saikiran Bavandla',
        email: 'support@probeshield.com',
        url: 'https://probeshield.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ProbeShield',
        url: 'https://probeshield.com',
      },
      url: 'https://probeshield.com',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.probeshield',
      releaseNotes: 'https://github.com/sai1004/probeshield-releases/blob/main/CHANGELOG.md',
      featureList: [
        'ARP + mDNS + Ping device discovery',
        'Top 100 TCP port scanning per device',
        'MAC OUI manufacturer identification',
        'Five-tier risk scoring (Critical, High, Medium, Low, Safe)',
        'Local scan history and comparisons',
        'PDF audit report export',
        'PIN and biometric app lock',
        '100% on-device — no cloud, no account required',
      ],
      screenshot: 'https://probeshield.com/og-image.png',
      license: 'https://probeshield.com/terms',
      privacyPolicy: 'https://probeshield.com/privacy',
      keywords: 'network security, wifi scanner, port scanner, android, vulnerability scanner, network audit',
      inLanguage: 'en-US',
      isAccessibleForFree: true,
    },
    {
      '@type': 'Organization',
      '@id': 'https://probeshield.com/#org',
      name: 'ProbeShield',
      url: 'https://probeshield.com',
      logo: 'https://probeshield.com/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@probeshield.com',
        contactType: 'customer support',
      },
      sameAs: [
        'https://github.com/sai1004/probeshield-releases',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://probeshield.com/#website',
      url: 'https://probeshield.com',
      name: 'ProbeShield',
      description: 'Network Security Auditor for Android',
      publisher: { '@id': 'https://probeshield.com/#org' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is ProbeShield free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. ProbeShield is completely free to download and use. There are no in-app purchases, subscriptions, or premium tiers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does ProbeShield send my data to the cloud?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Scanning and analysis run on your Android device, and your scan data is stored locally and never uploaded to any server. The only thing the app downloads on its own is public vulnerability (CVE) data from the NIST National Vulnerability Database, about once a week; nothing about you or your network is sent with that request.',
          },
        },
        {
          '@type': 'Question',
          name: 'What Android version is required?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ProbeShield requires Android 8.0 (Oreo) or higher, which corresponds to API level 26+.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need an account to use ProbeShield?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No account is required. Download the APK and start scanning immediately.',
          },
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  )
}
