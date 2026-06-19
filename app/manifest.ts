import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ProbeShield — Network Security Auditor',
    short_name: 'ProbeShield',
    description: 'Discover hidden devices, scan open ports, and get a clear risk picture of your WiFi. 100% on-device. Free Android app.',
    start_url: '/',
    display: 'standalone',
    background_color: '#051424',
    theme_color: '#4bdcc1',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
