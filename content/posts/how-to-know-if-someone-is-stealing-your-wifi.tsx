import Link from 'next/link'
import type { BlogPost, BlogFaq } from './types'

const faqs: BlogFaq[] = [
  {
    question: 'How can I tell if someone is using my WiFi without the app?',
    answer:
      'Log in to your router admin page (usually 192.168.1.1 or 192.168.0.1) and open the connected devices or DHCP client list. Turn off WiFi on every phone, laptop, and TV you own, refresh the list, and any device still listed is one you need to identify. Look up unfamiliar MAC addresses with a vendor lookup to see the manufacturer.',
  },
  {
    question: 'Can I see who is on my WiFi from my phone?',
    answer:
      'Yes. Open your router\'s app or admin page in a mobile browser, or run a network scanner such as ProbeShield on Android. A scanner finds devices with ARP, mDNS, and ping sweeps, so it catches devices a router\'s lease table can miss.',
  },
  {
    question: 'Is it illegal to use someone else\'s WiFi without permission?',
    answer:
      'In many countries, yes. Accessing a network without authorization can violate computer misuse laws such as the US Computer Fraud and Abuse Act or the UK Computer Misuse Act, even if the person only uses it to browse. Laws vary by jurisdiction.',
  },
  {
    question: 'Does a slow internet connection mean someone is stealing my WiFi?',
    answer:
      'Not necessarily. Slow speeds are far more often caused by router placement, channel congestion, an overloaded ISP line, or your own devices running updates and backups. Treat slowness as a reason to check the device list, not as proof of theft.',
  },
  {
    question: 'How do I kick someone off my WiFi for good?',
    answer:
      'Change your WiFi password to a long, unique passphrase using WPA3 or WPA2-AES, disable WPS, change the router admin password, and turn off remote management. Changing the WiFi password disconnects every device, and unauthorized devices cannot rejoin without the new one.',
  },
  {
    question: 'Will hiding my WiFi name or filtering MAC addresses stop WiFi theft?',
    answer:
      'No. Hidden SSIDs are still visible to scanning tools, and MAC addresses can be spoofed by copying one from a legitimate device. A strong WiFi password with WPA3 or WPA2-AES is the control that actually works.',
  },
  {
    question: 'Can a guest or neighbor see my files if they are on my WiFi?',
    answer:
      'It depends on what you share. A device on your network can reach other devices on the same network, so open file shares, unprotected cameras, NAS boxes, and printers are exposed. This is why a guest network and a strong password matter beyond the bandwidth loss.',
  },
]

function Body() {
  return (
    <>
      <div className="highlight-box" style={{ marginBottom: '2rem' }}>
        <p>
          <strong>Short answer:</strong> Open your router&apos;s connected-devices list, switch off WiFi on every device
          you own, and refresh. Anything still listed is a device you haven&apos;t identified. Look up its MAC
          address to find the manufacturer, and if you can&apos;t account for it, change your WiFi password and disable
          WPS. The whole check takes about five minutes.
        </p>
      </div>

      <p className="legal-text">
        &quot;Stealing your WiFi&quot; usually means a neighbor, a former roommate, or someone who got your password once and
        kept using it. The cost isn&apos;t only bandwidth. Anyone on your network can reach other devices on it, which is
        why this is worth five minutes to verify instead of guessing from how fast your internet feels.
      </p>

      <h2 className="blog-h2">Signs someone may be on your WiFi</h2>
      <p className="legal-text">
        None of these prove anything alone. They&apos;re reasons to run the check below, ranked by how reliable they are.
      </p>
      <ul className="legal-list">
        <li><strong>Devices you don&apos;t recognize in the router&apos;s list.</strong> The only strong evidence. Everything else is circumstantial.</li>
        <li><strong>Router activity lights stay busy when everything of yours is off.</strong> Useful, but modems and routers also light up for background updates and smart devices you forgot about.</li>
        <li><strong>Unexplained data usage.</strong> Many routers and ISP portals show usage per device or per day. A spike while you&apos;re away is worth investigating.</li>
        <li><strong>Slower speeds or lag.</strong> The weakest signal. Congestion, distance from the router, and ISP issues cause this far more often than a stranger does.</li>
        <li><strong>Your WiFi password was shared widely or never changed.</strong> Ex-roommates, past guests, and contractors who still have it count as unauthorized in practice.</li>
      </ul>

      <h2 className="blog-h2">How to check who is on your WiFi (5 minutes)</h2>
      <ol className="legal-list legal-list-numbered">
        <li>
          <strong>Log in to your router.</strong> Open <code>192.168.1.1</code> or <code>192.168.0.1</code> in a browser.
          On Android, Settings → WiFi → your network → Advanced shows the gateway address. The default login is often on
          a sticker on the router. If it still uses it, see our list of{' '}
          <Link href="/default-passwords/">default router passwords</Link> and change it today.
        </li>
        <li>
          <strong>Open the device list.</strong> Look for &quot;Connected Devices,&quot; &quot;Attached Devices,&quot; &quot;Client
          List,&quot; or &quot;DHCP Clients.&quot; Note the name, IP address, and MAC address of each entry.
        </li>
        <li>
          <strong>Do the elimination test.</strong> Turn off WiFi on every phone, tablet, laptop, console, and TV you own,
          or unplug smart devices. Refresh the list. Whatever remains is unaccounted for.
        </li>
        <li>
          <strong>Identify what&apos;s left.</strong> Paste the MAC address into our free{' '}
          <Link href="/tools/mac-lookup/">MAC address vendor lookup</Link>. &quot;Espressif&quot; is usually a smart plug or
          bulb, &quot;Apple&quot; or &quot;Samsung&quot; is a phone or TV. A vendor match tells you what kind of device it is, not who
          owns it.
        </li>
        <li>
          <strong>Cross-check with a scan.</strong> Router lists come from DHCP leases and can miss static-IP devices.
          A scanner that combines ARP, mDNS, and ping sweeps finds more. We cover that in{' '}
          <Link href="/blog/find-hidden-devices-on-wifi/">how to find every device on your network</Link>.
        </li>
      </ol>

      <div className="warning-box">
        <p>
          <strong>Phones now randomize their MAC address.</strong> Android and iOS use a private MAC per network by default,
          so your own phone can appear as an unfamiliar device with an unknown vendor. Before assuming a stranger, check
          each phone&apos;s WiFi settings: the &quot;private&quot; or &quot;randomized&quot; address shown there will match the router&apos;s
          entry.
        </p>
      </div>

      <h2 className="blog-h2">What to do if there&apos;s an intruder</h2>
      <ol className="legal-list legal-list-numbered">
        <li><strong>Change the WiFi password.</strong> Use a unique passphrase of 14+ characters. This disconnects every device, so unauthorized ones can&apos;t rejoin without the new password.</li>
        <li><strong>Use WPA3, or WPA2 with AES.</strong> Avoid WEP, WPA, and TKIP. If your router offers only those, it&apos;s time to replace it.</li>
        <li><strong>Turn off WPS.</strong> The PIN-based setup has known weaknesses on many routers and gives a way in that doesn&apos;t need your password.</li>
        <li><strong>Change the router admin password.</strong> This is separate from the WiFi password. If an intruder could log in, they could have changed settings.</li>
        <li><strong>Disable remote management</strong> and update the router firmware.</li>
        <li><strong>Reconnect your devices</strong>, then recheck the device list to confirm nothing unexpected returns.</li>
        <li><strong>Set up a guest network</strong> for visitors and smart-home devices so the main network stays small and known.</li>
      </ol>
      <p className="legal-text">
        Two things that <em>don&apos;t</em> work: hiding your network name (scanning tools still see it) and MAC address
        filtering (MAC addresses are trivially copied). Don&apos;t spend time on either.
      </p>

      <h2 className="blog-h2">How people get onto a WiFi network</h2>
      <ul className="legal-list">
        <li><strong>A password that was shared and never changed.</strong> By far the most common cause.</li>
        <li><strong>A weak or guessable password,</strong> including the factory default printed on the router.</li>
        <li><strong>WPS enabled</strong> on a router with a vulnerable implementation.</li>
        <li><strong>Outdated encryption</strong> such as WEP, which can be broken in minutes.</li>
        <li><strong>A compromised router admin panel</strong> via default or reused credentials.</li>
      </ul>

      <h2 className="blog-h2">Is WiFi theft illegal?</h2>
      <p className="legal-text">
        In many jurisdictions, yes. Using a network without authorization can fall under computer misuse laws,
        regardless of intent. If you identify who it is and it&apos;s someone you know, a password change usually ends it.
        If you suspect something more serious, such as access to your devices or accounts, document what you found and
        contact your ISP or local authorities. Laws differ by country, so this is general information, not legal advice.
      </p>

      <h2 className="blog-h2">Make it a habit, not a one-time check</h2>
      <p className="legal-text">
        A clean list today says nothing about next month. ProbeShield scans your network on-device, labels each device
        by manufacturer, and keeps a local history, so you can compare today against last time and see exactly what
        changed. It also checks each device for open ports and risky services, which tells you whether a device on your
        network is a problem even when you do recognize it. For the full hardening routine, use the{' '}
        <Link href="/checklist/">home network security checklist</Link>.
      </p>
    </>
  )
}

export const post: BlogPost = {
  slug: 'how-to-know-if-someone-is-stealing-your-wifi',
  title: 'How to Know If Someone Is Stealing Your WiFi (5-Min Check)',
  description:
    'Check who is on your WiFi in 5 minutes: the signs of WiFi theft, how to see every connected device, how to identify unknown ones, and how to kick them off for good.',
  date: '2026-10-11',
  readTime: '7 min read',
  keywords: [
    'how to know if someone is stealing my wifi',
    'is someone stealing my wifi',
    'how to see who is connected to my wifi',
    'signs someone is using my wifi',
    'how to kick someone off my wifi',
    'who is on my wifi',
    'unknown device on wifi',
    'wifi stealing',
    'check devices connected to wifi',
    'is my neighbor using my wifi',
  ],
  faqs,
  Body,
}
