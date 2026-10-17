import Link from 'next/link'
import BlogCtaCard from '@/components/BlogCtaCard'
import type { BlogPost, BlogFaq } from './types'

const faqs: BlogFaq[] = [
  {
    question: 'How often should I audit or scan my home network?',
    answer:
      'We recommend running a network discovery and port scan every 2 to 3 months, or immediately after adding a new smart device, hosting guests, or updating router firmware. Periodic checks ensure no unauthorized devices or open services go unnoticed.',
  },
  {
    question: 'Why should smart home IoT devices be on a separate guest network?',
    answer:
      'Many IoT appliances receive infrequent security patches and have known firmware weaknesses. Isolating them on a guest WiFi network prevents a compromised gadget from communicating with your laptops, phones, or network storage on your private LAN.',
  },
  {
    question: 'What is the single most important step in securing a home router?',
    answer:
      'Changing the default router administrator password. Most home router compromises happen because the owner left the factory login (like admin/admin) untouched. Setting a custom password closes the most common attack vector.',
  },
  {
    question: 'Should I disable WPS (WiFi Protected Setup)?',
    answer:
      'Yes. WPS contains legacy PIN brute-force vulnerabilities that allow an attacker to bypass even strong WPA2 or WPA3 passphrases. Keep WPS disabled unless you are temporarily pairing a specific device.',
  },
  {
    question: 'Is an interactive network checklist better than static advice?',
    answer:
      'An interactive checklist allows you to track and check off each hardening item directly on your device, saving your progress locally so you can return and re-evaluate your network health in a few months.',
  },
]

function Body() {
  return (
    <>
      <p className="legal-text">
        Most home network security advice is either too vague (&quot;use a strong password&quot;) or too technical (assumes
        you already know what VLANs are). This is a checklist built the other way — ten specific, concrete things to
        check, in the order that matters most, each doable in a few minutes with tools you already have or a free scan.
      </p>

      <h2 className="blog-h2">1. Know every device that&apos;s actually connected</h2>
      <p className="legal-text">
        You can&apos;t secure what you don&apos;t know exists. Start with a full device discovery scan rather than trusting
        your router&apos;s built-in client list — see{' '}
        <Link href="/blog/find-hidden-devices-on-wifi/">why the router&apos;s list usually isn&apos;t complete</Link>.
      </p>

      <h2 className="blog-h2">2. Check for default or reused credentials on IoT devices</h2>
      <p className="legal-text">
        Every smart plug, camera, thermostat, and speaker ships with a default admin password. Manufacturers rarely
        force a change. If you&apos;ve never explicitly set a password on a device, assume it&apos;s still the default —
        that&apos;s the single most exploited weakness in home networks. See our{' '}
        <Link href="/default-passwords/">list of default passwords by brand</Link> to check yours.
      </p>

      <h2 className="blog-h2">3. Scan for open ports on anything IoT</h2>
      <p className="legal-text">
        Cameras, DVRs, and cheap smart-home hubs are the most likely devices to have an unnecessary service exposed.
        See our full breakdown of{' '}
        <Link href="/blog/open-ports-home-network-risk/">what open ports mean and which ones matter</Link>.
      </p>

      <BlogCtaCard
        variant="mid"
        headline="Audit steps 1, 2, and 3 in one tap with ProbeShield"
        description="ProbeShield combines device discovery, manufacturer lookup, and open port scanning into an on-device 5-tier risk audit for your home network."
        buttonText="Audit My Home Network (Free)"
        badgeText="100% On-Device • Zero Cloud Data • No Account"
      />

      <h2 className="blog-h2">4. Verify your router isn&apos;t using its default admin password</h2>
      <p className="legal-text">
        This is the highest-leverage single fix on this list. Your router is the one device that, if compromised, gives
        an attacker visibility into everything else. If you&apos;ve never changed the admin login from what was printed
        on the box or sticker, do this first, before anything else here — check{' '}
        <Link href="/default-passwords/">your router brand&apos;s default</Link> if you&apos;re not sure what it shipped
        with.
      </p>

      <h2 className="blog-h2">5. Turn off WPS</h2>
      <p className="legal-text">
        WiFi Protected Setup is convenient and has a long history of PIN-brute-force vulnerabilities. Unless you
        specifically need it for a one-time device pairing, it&apos;s worth leaving off by default.
      </p>

      <h2 className="blog-h2">6. Confirm you&apos;re on WPA3 (or WPA2 at minimum)</h2>
      <p className="legal-text">
        WEP and open networks are both still surprisingly common on older router configurations that were never
        revisited after initial setup. Check your WiFi security setting directly in the router admin panel — don&apos;t
        assume it was configured correctly at purchase.
      </p>

      <h2 className="blog-h2">7. Separate IoT devices onto a guest network</h2>
      <p className="legal-text">
        Most consumer routers support a second SSID (&quot;guest network&quot;) that isolates connected devices from your main
        LAN. Putting smart-home gadgets on it means that if one of them is compromised, it can&apos;t directly reach your
        laptop or phone.
      </p>

      <h2 className="blog-h2">8. Check what&apos;s actually port-forwarded on your router</h2>
      <p className="legal-text">
        Open your router&apos;s Port Forwarding / Virtual Server settings and review every entry. It&apos;s common for a rule
        added years ago for a game console or a camera app to still be active long after you stopped using the
        service — each one is a door left open to the internet, not just your LAN.
      </p>

      <h2 className="blog-h2">9. Review cameras specifically</h2>
      <p className="legal-text">
        Cameras deserve their own pass because they combine the two riskiest properties — always-on network exposure
        and genuinely sensitive footage. See our dedicated{' '}
        <Link href="/blog/is-my-ip-camera-exposed/">IP camera exposure check</Link>.
      </p>

      <h2 className="blog-h2">10. Re-scan on a schedule, not just once</h2>
      <p className="legal-text">
        New devices join, firmware updates reset settings, and forgotten port-forwarding rules accumulate. A network
        that was clean when you last checked isn&apos;t guaranteed to still be clean. Treat this checklist as something
        to re-run every couple of months, not a one-time setup task.
      </p>

      <div className="highlight-box">
        <p>
          <strong>Want to check these off as you go?</strong> Use the{' '}
          <Link href="/checklist/">interactive version of this checklist</Link> — it saves your progress on your
          device so you can come back and re-check it in a few months.
        </p>
      </div>

      <div className="highlight-box">
        <p>
          <strong>The fast way to run most of this list:</strong> ProbeShield combines device discovery, port scanning,
          and manufacturer identification into one scan with a five-tier risk score per device, entirely on-device —
          no cloud account, no scan data leaving your phone.
        </p>
      </div>
    </>
  )
}

export const post: BlogPost = {
  slug: 'home-network-security-checklist',
  title: 'The Home Network Security Checklist: 10 Steps to Protect Your WiFi',
  description:
    'A concrete 10-step checklist to secure your home WiFi network: from router admin credentials to IoT isolation and port exposure checks.',
  date: '2026-09-27',
  readTime: '8 min read',
  keywords: ['home network security checklist', 'how to secure home wifi', 'home network audit', 'iot security checklist'],
  cta: {
    headline: 'Take control of your home network security',
    description:
      'Run a comprehensive, on-device vulnerability audit on Android with zero cloud tracking or telemetry.',
    buttonText: 'Audit Network (Google Play)',
  },
  faqs,
  Body,
}
