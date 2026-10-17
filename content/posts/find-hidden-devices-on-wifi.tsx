import Link from 'next/link'
import type { BlogPost, BlogFaq } from './types'

const faqs: BlogFaq[] = [
  {
    question: "Why isn't a connected device showing in my router's device list?",
    answer:
      "Routers build their client list from DHCP leases, which miss devices with static IP addresses, devices that connected and disconnected quickly, or devices in deep power-saving sleep modes. Network scanners send active ARP, mDNS, and ping sweeps directly across the local subnet to detect devices that bypass DHCP.",
  },
  {
    question: "What does it mean if I see an unknown device named 'Espressif' or 'Tuya' on my WiFi?",
    answer:
      "Espressif Systems and Tuya manufacture the WiFi and microcontroller chips inside millions of smart home appliances, such as smart plugs, LED light strips, smart bulbs, and robot vacuums. If you see an Espressif or Tuya device, it is almost certainly one of your smart home gadgets rather than an intruder.",
  },
  {
    question: 'How can I tell which physical device belongs to an unknown IP or MAC address?',
    answer:
      'First, look up the manufacturer using a MAC vendor lookup tool. Next, unplug or turn off suspected smart home devices one by one and re-scan the network to see which IP address drops off.',
  },
  {
    question: 'How many devices are normally connected to a home WiFi network?',
    answer:
      'A typical household usually has between 10 and 25 connected devices once you account for phones, laptops, smart TVs, streaming sticks, gaming consoles, smart plugs, and smart bulbs. What matters is recognizing every device on the list.',
  },
  {
    question: 'Can someone connect to my WiFi without having the password?',
    answer:
      'Yes, if WPS (WiFi Protected Setup) is enabled on an older router, as it has known PIN brute-force vulnerabilities. In other cases, former guests, neighbors, or contractors who were given the WiFi password once might still remain connected. Disabling WPS and updating your WPA2/WPA3 password prevents unauthorized access.',
  },
  {
    question: 'Does a network scan detect devices that are turned off?',
    answer:
      "No. Network scanners and router admin tables only detect devices currently powered on, connected, and communicating on the subnet. A device that is switched off will only appear once it reconnects.",
  },
]

function Body() {
  return (
    <>
      <p className="legal-text">
        If you&apos;ve ever opened your router&apos;s admin page and seen a device you don&apos;t recognize, you&apos;re not alone —
        it&apos;s one of the most common things people search for right after setting up a new router or noticing their
        internet feels slower than usual. The good news: finding every device on your WiFi network doesn&apos;t require
        networking expertise. It requires the right discovery method and five minutes.
      </p>

      <h2 className="blog-h2">Checking manually: your router&apos;s admin panel</h2>
      <p className="legal-text">
        Before reaching for an app, it helps to know how to check this by hand — every router keeps a live connected-devices
        list, you just have to log in to see it.
      </p>
      <ol className="legal-list legal-list-numbered">
        <li>
          Find your router&apos;s IP address. On most home networks it&apos;s <code>192.168.1.1</code> or{' '}
          <code>192.168.0.1</code>. On Android: Settings → WiFi → tap your network → Advanced → look for
          &quot;Gateway.&quot;
        </li>
        <li>Open that address in a browser and log in — check the sticker on the router itself if you&apos;ve never changed the default login.</li>
        <li>Look for &quot;Connected Devices,&quot; &quot;Attached Devices,&quot; or &quot;DHCP Client List&quot; — the exact wording depends on your router brand.</li>
      </ol>
      <p className="legal-text">
        This works, but it&apos;s exactly the limitation the next section covers: you&apos;ll see IP and MAC addresses, not
        &quot;Mom&apos;s iPad&quot; or &quot;Living Room Camera.&quot;
      </p>

      <h2 className="blog-h2">Why your router&apos;s device list isn&apos;t enough</h2>
      <p className="legal-text">
        Most routers show a &quot;connected devices&quot; list, but it&apos;s often incomplete or wrong. Routers typically rely on
        DHCP lease tables, which miss devices using static IPs, devices that connected briefly and dropped off, and
        anything hiding behind a MAC address randomization feature (which is now default on most phones). You end up
        with a list of cryptic hostnames like <code>android-7f3a91</code> and no way to tell which one is your
        neighbor&apos;s smart plug and which one is an actual intruder. If you do have a MAC address but not a
        name, our free{' '}
        <Link href="/tools/mac-lookup/">MAC address vendor lookup tool</Link> will at least tell you the
        manufacturer in a few seconds.
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

      <h2 className="blog-h2">Common mystery device names on router lists (and what they are)</h2>
      <p className="legal-text">
        When people open their router admin panel or run a network scanner, seeing an unfamiliar manufacturer name often causes immediate panic.
        In reality, most consumer smart home brands do not manufacture their own microchips. Instead, they buy integrated WiFi modules
        from semiconductor foundries, so your smart plug or robot vacuum appears under the chipmaker&apos;s name:
      </p>
      <ul className="legal-list">
        <li>
          <strong>Espressif Inc (Espressif Systems):</strong> The #1 most commonly questioned mystery device. Espressif manufactures the
          ubiquitous ESP8266 and ESP32 WiFi microcontrollers used in millions of smart plugs, LED strips, smart bulbs, Tuya gadgets, and IoT switches.
        </li>
        <li>
          <strong>Tuya Smart / Tuya Inc:</strong> The underlying IoT chipset and cloud platform powering hundreds of budget smart home brands
          (smart plugs, robotic vacuums, pet feeders, and security sensors).
        </li>
        <li>
          <strong>Hon Hai Precision (Foxconn):</strong> The world&apos;s largest contract electronics manufacturer. Usually corresponds to a Nintendo Switch,
          smart TV component, gaming console, or Apple device.
        </li>
        <li>
          <strong>Murata Manufacturing:</strong> A Japanese electronics manufacturer that supplies compact wireless modules for smart thermostats,
          Sony gaming accessories, smart appliances, and smart energy meters.
        </li>
        <li>
          <strong>Chicony Electronics:</strong> A primary OEM supplier of internal webcams, smart video doorbells, and baby monitors.
        </li>
        <li>
          <strong>AzureWave / Wistron / Arcadyan:</strong> Common OEM wireless hardware inside streaming dongles, TV set-top boxes, and WiFi extenders.
        </li>
      </ul>
      <p className="legal-text">
        If you see an unfamiliar MAC address on your router, use our free{' '}
        <Link href="/tools/mac-lookup/">MAC address vendor lookup tool</Link> to identify the manufacturer behind it in seconds.
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
          <Link href="/blog/open-ports-home-network-risk/">why open ports matter</Link>.
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
  title: 'How to Find Every Device Connected to Your WiFi Network (Even Hidden Ones)',
  description:
    'A practical guide to discovering every device on your home network — including the ones your router\'s device list misses — and identifying unknown devices in minutes.',
  date: '2026-09-27',
  readTime: '8 min read',
  keywords: [
    'who is on my wifi',
    'find hidden devices on network',
    'unknown device connected to wifi',
    'wifi device scanner',
    'see all devices on my network',
    'how to find devices on your network',
    'discover network devices',
    'connected devices on wifi',
    'monitor devices on my wifi network',
    'list all connected devices on network',
    'how to check wifi connected devices',
  ],
  faqs,
  Body,
}
