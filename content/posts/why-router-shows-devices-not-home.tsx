import Link from 'next/link'
import BlogCtaCard from '@/components/BlogCtaCard'
import type { BlogPost, BlogFaq } from './types'

const faqs: BlogFaq[] = [
  {
    question: "Why does my router show a device is connected when it isn't home?",
    answer:
      "Your router's device list is not a real-time radar; it is a cached DHCP lease table. When a device joins your WiFi, the router reserves its IP address for a lease period (usually 24 to 72 hours). Even if that device powers off or leaves the house, your router will continue listing it as 'connected' or 'active' until the lease timer expires.",
  },
  {
    question: 'Why do I see duplicate devices for the same smartphone on my WiFi?',
    answer:
      "Modern smartphones (iPhones with 'Private Wi-Fi Address' and Android with 'Use randomized MAC') generate randomized, temporary MAC addresses for privacy. If your phone rotates its address or switches between private and hardware modes, your router treats it as a brand-new device, creating ghost duplicate entries for the same physical phone.",
  },
  {
    question: 'How can I tell if a device in my router list has a randomized MAC address?',
    answer:
      'Look at the second character of the MAC address. If the second digit is 2, 6, A, or E (such as da:a1:19:xx:xx:xx or 4e:22:15:xx:xx:xx), it is an IEEE Locally Administered Address, which means it is a randomized privacy address from an iPhone, iPad, Android phone, or Windows 11 PC.',
  },
  {
    question: 'Can I turn off Private Wi-Fi Address on my home network?',
    answer:
      "Yes. On your home WiFi, turning off 'Private Wi-Fi Address' (iOS) or setting MAC address type to 'Use device MAC' (Android) allows your router to recognize your phone by its permanent hardware address. This eliminates ghost duplicates and keeps parental controls or static IP reservations stable. Keep it turned ON for public networks (airports, hotels, cafes).",
  },
  {
    question: 'Why does my smart TV or game console show as connected when turned off?',
    answer:
      "Most modern smart TVs, streaming sticks (Apple TV, Roku, Chromecast), and game consoles (PS5, Xbox) enter a low-power 'Connected Standby' or 'Instant On' mode rather than shutting down completely. Their WiFi radios periodically maintain contact with the router to listen for Wake-on-LAN packets, remote app commands, or background firmware downloads.",
  },
  {
    question: 'How can I see which devices are truly transmitting on my WiFi right now?',
    answer:
      'Instead of relying on the router cached DHCP table, run an active ARP sweep using an on-device network scanner like ProbeShield on Android. An ARP sweep broadcasts real-time Layer 2 query frames across your subnet. Devices that are offline or out of the house cannot respond, giving you an accurate, real-time snapshot of active hardware.',
  },
]

function Body() {
  return (
    <>
      <div className="highlight-box" style={{ marginBottom: '2rem' }}>
        <p>
          <strong>Short answer:</strong> You almost certainly don&apos;t have an intruder. When your router shows a
          device that has left the house or is powered off, it is usually because of{' '}
          <strong>DHCP lease persistence</strong> (routers keep devices listed for 24–72 hours after they disconnect) or{' '}
          <strong>MAC address randomization</strong> (iPhones and Androids generating temporary privacy MACs that create
          duplicate &quot;ghost&quot; entries).
        </p>
      </div>

      <p className="legal-text">
        You log into your router&apos;s administration dashboard or companion app, click &quot;Connected Devices,&quot;
        and notice something bewildering: your spouse&apos;s iPhone is listed as connected, even though they are 10
        miles away at work. Or you see an unfamiliar device name with full signal strength, and you wonder if a neighbor
        is siphoning your internet.
      </p>
      <p className="legal-text">
        These &quot;ghost devices&quot; are one of the most common sources of panic for home network managers. Here is
        the technical reality behind why router device lists show phantom equipment, why modern privacy settings cause
        duplicate entries, and how to tell real active devices from stale router cache.
      </p>

      <h2 className="blog-h2">Reason 1: DHCP lease duration keeps offline devices &quot;alive&quot;</h2>
      <p className="legal-text">
        The most common reason an offline device appears on your router is a misunderstanding of how routers track
        connected clients.
      </p>
      <p className="legal-text">
        When a phone or computer joins your WiFi, it requests an IP address from your router&apos;s{' '}
        <strong>DHCP</strong> (Dynamic Host Configuration Protocol) server. The router doesn&apos;t simply lend out the
        address indefinitely — it grants a <strong>DHCP Lease</strong> with a set timer.
      </p>
      <ul className="legal-list">
        <li>
          <strong>Typical lease duration:</strong> Most consumer routers (Netgear, ASUS, TP-Link, Eero, and ISP gateway
          combos from Comcast, AT&amp;T, and Spectrum) set their default DHCP lease time to <strong>24 hours</strong>,{' '}
          <strong>48 hours</strong>, or even <strong>1 week</strong>.
        </li>
        <li>
          <strong>No goodbye handshake:</strong> When you leave your house, your smartphone drops out of WiFi range. It
          does not send a formal <em>DHCP Release</em> packet to inform the router it is leaving — the radio signal
          simply fades out.
        </li>
        <li>
          <strong>The stale table:</strong> Because the lease timer has not expired, the router reserves that IP and
          continues displaying the device in its client table. Until the lease clock runs down to zero, the router
          assumes the device might return and keeps its record active.
        </li>
      </ul>

      <h2 className="blog-h2">Reason 2: Smartphone MAC randomization creates &quot;duplicate ghosts&quot;</h2>
      <p className="legal-text">
        Have you ever noticed two or three entries for the exact same iPhone or Android in your router&apos;s device
        list? This is caused by mobile privacy features.
      </p>
      <p className="legal-text">
        Historically, every network interface had a permanent, globally unique hardware identifier called a{' '}
        <strong>MAC address</strong> (like <code>ac:de:48:12:34:56</code>). Because this permanent identifier allowed
        commercial WiFi trackers in shopping malls and airports to follow people across locations, Apple introduced{' '}
        <strong>Private Wi-Fi Address</strong> in iOS 14, and Google introduced <strong>Randomized MAC</strong> in
        Android 10.
      </p>
      <p className="legal-text">
        With these features enabled, your phone invents a synthetic, randomized MAC address instead of using its true
        hardware chip address:
      </p>
      <ul className="legal-list">
        <li>
          When your phone connects with a new randomized address, your router has no way of knowing it is the same phone
          it saw yesterday.
        </li>
        <li>The router registers the new MAC as a completely new device and hands it a new IP address.</li>
        <li>The old MAC address remains in the DHCP table until its lease expires.</li>
        <li>
          <strong>The result:</strong> A single household with four smartphones can easily produce 10 to 15 entries in a
          router&apos;s device table over a few days.
        </li>
      </ul>

      <div className="tip-box">
        <p>
          <strong>The Secret 2-6-A-E Trick:</strong> How to prove a mystery device is a randomized smartphone: look at
          the <strong>second character</strong> of its MAC address. If the second digit is <code>2</code>,{' '}
          <code>6</code>, <code>A</code>, or <code>E</code> (for example,{' '}
          <code>
            d<strong>2</strong>:xx
          </code>
          ,{' '}
          <code>
            f<strong>6</strong>:xx
          </code>
          ,{' '}
          <code>
            3<strong>a</strong>:xx
          </code>
          , or{' '}
          <code>
            8<strong>e</strong>:xx
          </code>
          ), it is an IEEE Locally Administered Address. This confirms 100% that the address is generated by software on
          an iPhone, Android, or Windows 11 PC, not an external hacker&apos;s custom hardware!
        </p>
      </div>

      <BlogCtaCard
        variant="mid"
        headline="Filter out stale ghost devices with real-time ARP sweeps"
        description="Don't trust stale DHCP lease tables. ProbeShield sends real-time Layer 2 ARP frames across your subnet to show only devices actively transmitting right now."
        buttonText="Scan Active Devices (Free)"
        badgeText="100% On-Device • Zero Cloud Tracking • No Account"
      />

      <h2 className="blog-h2">Reason 3: Low-power &quot;Connected Standby&quot; states in smart appliances</h2>
      <p className="legal-text">Many gadgets in your home never actually turn off when you press the power button:</p>
      <ul className="legal-list">
        <li>
          <strong>Smart TVs &amp; streaming sticks:</strong> Roku, Apple TV, Chromecast, and smart TVs from Samsung, LG,
          and Sony sleep in an ultra-low-power standby mode. They maintain an active WiFi association so they can
          respond instantly when you cast a YouTube video or turn on the TV via your phone app.
        </li>
        <li>
          <strong>Game consoles:</strong> PlayStation 5 and Xbox Series X maintain network connectivity in &quot;Rest
          Mode&quot; to download game patches and background cloud saves during the night.
        </li>
        <li>
          <strong>Smart home plugs &amp; bulbs:</strong> Smart plugs (often powered by{' '}
          <Link href="/blog/what-is-espressif-device-on-wifi/">Espressif or Tuya microcontrollers</Link>) send regular
          heartbeat packets every 30 to 60 seconds to maintain their cloud connection.
        </li>
      </ul>

      <h2 className="blog-h2">Reason 4: Mesh WiFi nodes &amp; range extenders cloning MAC addresses</h2>
      <p className="legal-text">
        If you use a mesh WiFi system (like Google Nest WiFi, Eero, or Netgear Orbi) or a standard plug-in WiFi range
        extender, you may see duplicate devices appearing on different nodes.
      </p>
      <p className="legal-text">
        Some range extenders use a technique called <strong>MAC Masquerading</strong> or Proxy ARP. When a phone roams
        from the main router to an extender, the extender modifies the client&apos;s MAC address to route packets back
        to the main gateway. Your main router sees two different MAC entries for the same device — one associated with
        the router directly, and one associated with the extender.
      </p>

      <h2 className="blog-h2">How to verify: Is it a ghost device or a real intruder?</h2>
      <p className="legal-text">
        If you want to know whether an unfamiliar entry is a harmless ghost or someone actively stealing your bandwidth,
        perform this three-step verification:
      </p>

      <ol className="legal-list">
        <li>
          <strong>Check the MAC address with our vendor tool:</strong> Copy the MAC address from your router and paste
          it into our free <Link href="/tools/mac-lookup/">MAC Address Vendor Lookup tool</Link>. If the manufacturer is
          Apple, Samsung, or Google, but the second digit is 2/6/A/E, it is a family member&apos;s phone using private
          addresses.
        </li>
        <li>
          <strong>Run an active ARP scan instead of trusting the router:</strong> Router web pages show historical DHCP
          leases. An active network scanner like ProbeShield sends real-time ARP queries across your subnet. If a device
          is powered off or not home, it <em>cannot</em> answer an ARP query. If ProbeShield doesn&apos;t detect it, the
          device is a ghost. See our guide on{' '}
          <Link href="/blog/find-hidden-devices-on-wifi/">finding all active devices on your WiFi</Link>.
        </li>
        <li>
          <strong>Check for data throughput:</strong> In your router&apos;s administration portal, look at the
          device&apos;s real-time bandwidth consumption (TX/RX packets). A ghost device will show 0 KB/s transfer rates.
          An active intruder streaming video or browsing the web will show constant active traffic. (If you confirm an
          intruder, read our guide on{' '}
          <Link href="/blog/how-to-know-if-someone-is-stealing-your-wifi/">
            how to know if someone is stealing your WiFi
          </Link>
          ).
        </li>
      </ol>

      <h2 className="blog-h2">How to clean up ghost devices and keep your list accurate</h2>
      <p className="legal-text">
        If your router&apos;s client list has become cluttered and confusing, here is how to clean it up:
      </p>

      <ul className="legal-list">
        <li>
          <strong>Shorten your DHCP lease time:</strong> Log into your router&apos;s settings (check{' '}
          <Link href="/default-passwords/">standard router logins</Link> if needed), navigate to{' '}
          <strong>LAN &gt; DHCP Server</strong>, and change the lease duration from 24 hours (or 7 days) to{' '}
          <strong>4 hours or 8 hours</strong>. Offline devices will drop off your list within hours instead of days.
        </li>
        <li>
          <strong>Disable Private Address for your home network only:</strong> On your iPhone or Android, open your WiFi
          settings, tap the info button (<code>i</code> or gear) next to your home network, and turn off{' '}
          <strong>Private Wi-Fi Address</strong> (or select <strong>Use device MAC</strong>). Your phone will now use
          its permanent hardware MAC address on your trusted home network, giving it a stable name and preventing
          duplicate ghosts. <em>(Keep this setting enabled on public networks like hotels and coffee shops!)</em>
        </li>
        <li>
          <strong>Reboot your router:</strong> A quick power cycle (unplugging for 15 seconds) flushes volatile memory
          and forces the router&apos;s DHCP server to re-evaluate active wireless associations, immediately clearing
          stale records.
        </li>
      </ul>

      <div className="warning-box">
        <p>
          <strong>Routine network hygiene:</strong> Want to keep your home network organized and secure against actual
          threats? Follow our interactive 10-step <Link href="/checklist/">home network security checklist</Link> to
          audit guest networks, change default credentials, and isolate IoT equipment.
        </p>
      </div>

      <h2 className="blog-h2">Get real-time network visibility with ProbeShield</h2>
      <p className="legal-text">
        Stop guessing whether an entry on your router is an active intruder or a stale DHCP ghost. ProbeShield for
        Android scans your network in real time using Layer 2 ARP sweeps, showing you only devices that are actively
        powered on and connected right now. ProbeShield matches hardware MAC addresses against its local vendor
        database, checks for open ports, and flags potential security risks — 100% on-device with zero cloud telemetry.
      </p>
    </>
  )
}

export const post: BlogPost = {
  slug: 'why-router-shows-devices-not-home',
  title: "Why Is My Router Showing Devices That Aren't Home? (Ghost Devices Explained)",
  description:
    "See devices on your WiFi router that aren't home or are turned off? Learn why DHCP lease times and iPhone/Android private MAC addresses create ghost devices, and how to verify real active clients.",
  date: '2026-10-17',
  readTime: '7 min read',
  keywords: [
    'why is my router showing devices that arent home',
    'router shows device connected when off',
    'ghost devices on router',
    'router duplicate devices',
    'dhcp lease time ghost device',
    'private wifi address duplicate router',
    'why does router show phone connected when away',
    'router shows old devices',
    'unknown device on wifi router',
    'real time wifi device scan',
  ],
  cta: {
    headline: 'Get real-time WiFi device visibility on Android',
    description: 'Accurate Layer 2 ARP discovery, automatic MAC vendor identification, and zero cloud tracking.',
    buttonText: 'Scan Active WiFi Devices (Google Play)',
  },
  faqs,
  Body,
}
