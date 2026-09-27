import Link from 'next/link'
import type { BlogPost } from './types'

function Body() {
  return (
    <>
      <p className="legal-text">
        If you&apos;ve ever opened your router&apos;s admin page and seen a device you don&apos;t recognize, you&apos;re not alone —
        it&apos;s one of the most common things people search for right after setting up a new router or noticing their
        internet feels slower than usual. The good news: finding every device on your WiFi network doesn&apos;t require
        networking expertise. It requires the right discovery method and five minutes.
      </p>

      <h2 className="blog-h2">Why your router&apos;s device list isn&apos;t enough</h2>
      <p className="legal-text">
        Most routers show a &quot;connected devices&quot; list, but it&apos;s often incomplete or wrong. Routers typically rely on
        DHCP lease tables, which miss devices using static IPs, devices that connected briefly and dropped off, and
        anything hiding behind a MAC address randomization feature (which is now default on most phones). You end up
        with a list of cryptic hostnames like <code>android-7f3a91</code> and no way to tell which one is your
        neighbor&apos;s smart plug and which one is an actual intruder.
      </p>

      <h2 className="blog-h2">The three ways devices reveal themselves</h2>
      <p className="legal-text">
        A proper network scan combines multiple discovery techniques, because no single method catches everything:
      </p>
      <ul className="legal-list">
        <li><strong>ARP requests</strong> — the fastest way to enumerate every device currently active on your local subnet, since anything communicating on the LAN has to respond to ARP.</li>
        <li><strong>mDNS / Bonjour</strong> — many devices (smart TVs, printers, Chromecasts, HomeKit accessories) broadcast their own name and type over multicast DNS, which is often the only way to get a human-readable label instead of a MAC address.</li>
        <li><strong>ICMP ping sweeps</strong> — catches devices that stay quiet on ARP/mDNS but still respond to a direct ping, filling in the gaps the other two methods miss.</li>
      </ul>
      <p className="legal-text">
        This is exactly the combination ProbeShield runs when you tap &quot;Scan&quot; — ARP, mDNS, and ping sweep together,
        then it resolves each result against a manufacturer database (MAC OUI lookup) so you see &quot;Samsung Electronics&quot;
        or &quot;Espressif (likely a smart plug)&quot; instead of a bare MAC address.
      </p>

      <h2 className="blog-h2">What to do when you find a device you don&apos;t recognize</h2>
      <ol className="legal-list legal-list-numbered">
        <li>Check the manufacturer name first — a lot of &quot;mystery devices&quot; turn out to be your own smart bulb, a partner&apos;s laptop, or a game console you forgot was WiFi-connected.</li>
        <li>Cross-reference the IP with what&apos;s physically on and connected in the house right now — unplug something and re-scan to see if it disappears.</li>
        <li>If it&apos;s still unexplained, change your WiFi password immediately (this force-disconnects every device, known and unknown) and re-enable WPA3 if your router supports it.</li>
        <li>Check for open ports on the unknown device before you re-add anything to your trusted list — an unrecognized device with open management ports is a much bigger red flag than one with none.</li>
      </ol>

      <div className="warning-box">
        <p>
          <strong>Don&apos;t stop at &quot;who&apos;s connected.&quot;</strong> A device list only tells you who&apos;s on the
          network. It doesn&apos;t tell you which of those devices have open ports, default credentials, or known
          vulnerabilities — that&apos;s a separate scan. See our guide on{' '}
          <Link href="/blog/open-ports-home-network-risk">why open ports matter</Link>.
        </p>
      </div>

      <h2 className="blog-h2">Scanning regularly, not just once</h2>
      <p className="legal-text">
        Device discovery is most useful as a habit, not a one-time check. New devices join home networks constantly —
        guests, IoT gadgets, seasonal devices — and a network you scanned clean three months ago isn&apos;t necessarily
        clean today. ProbeShield keeps a local scan history so you can compare today&apos;s device list against last
        month&apos;s and immediately spot what changed, entirely on-device with no cloud account required.
      </p>
    </>
  )
}

export const post: BlogPost = {
  slug: 'find-hidden-devices-on-wifi',
  title: 'How to Find Every Device Connected to Your WiFi Network',
  description:
    'A practical guide to discovering every device on your home network — including the ones your router\'s device list misses — and what to do when you find one you don\'t recognize.',
  date: '2026-09-27',
  readTime: '6 min read',
  keywords: ['who is on my wifi', 'find hidden devices on network', 'unknown device connected to wifi', 'wifi device scanner'],
  Body,
}
