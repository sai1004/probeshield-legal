import Link from 'next/link'
import type { BlogPost, BlogFaq } from './types'

const faqs: BlogFaq[] = [
  {
    question: 'Can a router get hacked without me clicking a suspicious link?',
    answer:
      'Yes. Attackers frequently scan the public internet for routers running unpatched firmware or exposed management ports (such as Telnet 23 or remote web administration on port 8080). Automated exploit scripts and botnets can breach a vulnerable router directly over the internet without anyone in your household clicking a link or downloading malware.',
  },
  {
    question: 'What can a hacker do if they compromise my home router?',
    answer:
      'A compromised router gives an attacker complete control over your home network traffic. They can hijack your DNS to redirect legitimate websites to phishing clones, inject ads into unencrypted web sessions, monitor unencrypted network requests, forward external ports into your smart home devices, or enlist your router into a DDoS botnet or proxy relay.',
  },
  {
    question: 'How do I check if my router DNS has been hijacked?',
    answer:
      "Log into your router's administration portal and check the WAN or Internet DNS settings. If the DNS servers are set to unfamiliar IP addresses instead of your ISP's official servers or reputable public resolvers (like Cloudflare 1.1.1.1, Google 8.8.8.8, or Quad9 9.9.9.9), your DNS has likely been modified or hijacked.",
  },
  {
    question: 'Does a physical factory reset remove malware from a router?',
    answer:
      'In almost all cases, yes. Most router malware resides in temporary memory (RAM) or non-persistent system partitions that are completely wiped during a hard factory reset (holding the physical reset pinhole for 15–30 seconds). However, you must update the firmware immediately after resetting to patch the vulnerability that allowed the initial breach.',
  },
  {
    question: 'Can an attacker compromise my phone or computer through my router?',
    answer:
      'Directly hacking modern operating systems from a router is difficult due to HTTPS encryption and endpoint sandboxing. However, an attacker can redirect your web browser to credential-harvesting phishing pages, prompt fake software updates (such as Trojanized browser extensions), or probe local devices for unpatched vulnerabilities like exposed SMB or Telnet ports.',
  },
  {
    question: 'How do I find my router gateway IP address to log in?',
    answer:
      "On Android, open Settings > Network & internet > Internet, tap the gear icon next to your WiFi, and look for 'Gateway' (commonly 192.168.1.1, 192.168.0.1, or 10.0.0.1). On Windows, open Command Prompt and type 'ipconfig' to find the 'Default Gateway'. ProbeShield also automatically identifies and displays your gateway IP upon opening the app.",
  },
]

function Body() {
  return (
    <>
      <div className="highlight-box" style={{ marginBottom: '2rem' }}>
        <p>
          <strong>Short answer:</strong> The most reliable signs of a hacked router are unexpected browser redirects
          (DNS hijacking), sudden loss of access to your router admin panel, unauthorized port forwarding rules,
          unfamiliar connected devices in your DHCP table, and aggressive pop-up ads appearing across{' '}
          <em>all</em> household devices simultaneously. If you suspect a breach, disconnect your internet cable,
          perform a 15-second physical factory reset, update the firmware, and change all passwords.
        </p>
      </div>

      <p className="legal-text">
        Most people assume that malware only infects laptops and smartphones. In reality, your home router is often
        the most attractive target on your network. Routers run continuously, rarely run antivirus software, and sit
        directly on the boundary between the public internet and every private phone, computer, and smart camera in
        your home.
      </p>
      <p className="legal-text">
        When cybercriminals compromise a router, they don&apos;t usually make it obvious with flashing sirens. Instead,
        they quietly alter network configurations to redirect financial traffic, monitor internet habits, or hijack
        the router&apos;s processing power for botnet swarms. Here are the 10 telltale signs that your router has been
        compromised, how to verify each one, and the exact steps to reclaim your network.
      </p>

      <h2 className="blog-h2">10 warning signs that your router is hacked</h2>

      <div className="warning-box">
        <p>
          <strong>Key distinction:</strong> Slow WiFi or an occasional disconnect does not mean you have been hacked.
          A compromised router involves specific configuration tampering — primarily DNS changes, unauthorized port
          rules, and disabled security controls.
        </p>
      </div>

      <ul className="legal-list">
        <li>
          <strong>1. Unexplained web redirects &amp; DNS hijacking:</strong> You type in a normal URL (like your bank,
          search engine, or news site) and get bounced to an unfamiliar domain, a sketchy survey, or a page demanding
          that you download an &quot;urgent browser update.&quot; Attackers do this by swapping your router&apos;s DNS
          settings with their own rogue nameservers.
        </li>
        <li>
          <strong>2. Your router admin password suddenly stops working:</strong> If you try logging into your gateway
          (usually <code>192.168.1.1</code> or <code>192.168.0.1</code>) and your known credentials fail, an attacker
          or automated bot may have locked you out. If you never changed the default factory credentials (such as{' '}
          <code>admin/admin</code> or <code>admin/password</code>), anyone on the local network or internet could have
          claimed administrative control.
        </li>
        <li>
          <strong>3. Unfamiliar devices in your DHCP client list:</strong> When you review your router&apos;s connected
          devices table, you see unknown MAC addresses and hostnames that remain active even after everyone is asleep.
          (Before panicking, verify whether these are smart plugs or IoT chips; see our guide on{' '}
          <Link href="/blog/what-is-espressif-device-on-wifi/">identifying Espressif and mystery devices</Link>).
        </li>
        <li>
          <strong>4. Remote management (WAN administration) is enabled:</strong> Consumer routers should never have
          their web configuration or command-line interfaces exposed to the outside world. If &quot;Remote Management,&quot;
          &quot;Web Access from WAN,&quot; or port 8080/8443 is turned on in your settings without your knowledge, external
          attackers can reach your login portal from anywhere on the internet.
        </li>
        <li>
          <strong>5. Rogue port forwarding rules or UPnP entries you didn&apos;t create:</strong> Navigate to your
          router&apos;s Port Forwarding section. If you see open ports (like port 22 for SSH, 23 for Telnet, 3389 for
          Remote Desktop, or arbitrary high ports like 8088 or 5555) forwarding external traffic to an internal IP,
          an intruder or malware may have opened a backdoor.
        </li>
        <li>
          <strong>6. Fake virus pop-ups appear on multiple devices at once:</strong> If one Windows PC has adware
          pop-ups, that individual PC is infected. But if your iPhone, Android tablet, and Mac all start displaying
          identical &quot;Critical Virus Detected — Call Support&quot; pop-ups while browsing regular websites, the
          infection is operating at the router level via DNS or script injection.
        </li>
        <li>
          <strong>7. A rogue WiFi SSID or unexpected Guest Network appeared:</strong> Some router malware exploits
          create an open, unencrypted secondary WiFi network (SSID) beaconing from your router hardware. This allows
          passersby or attackers to siphon your internet connection without needing your WPA2/WPA3 password.
        </li>
        <li>
          <strong>8. Extreme bandwidth consumption &amp; network sluggishness:</strong> If your internet speeds crawl
          to a halt even when all streaming and downloads are paused, your router may have been co-opted into an IoT
          botnet (such as Mirai, Mozi, or TheMoon). These botnets utilize thousands of hijacked home gateways to launch
          massive Distributed Denial of Service (DDoS) attacks against third-party targets.
        </li>
        <li>
          <strong>9. Automatic firmware updates are disabled or firmware is outdated:</strong> Many modern routers
          update security definitions automatically. If you discover auto-updates were toggled off, or your firmware
          version displays an unrecognized build number, an intruder may be freezing the router on an exploitable
          version.
        </li>
        <li>
          <strong>10. Security software and operating system updates fail:</strong> Router-level DNS manipulators often
          block access to antivirus update servers (like Microsoft Defender, Malwarebytes, or Apple security updates)
          to prevent your endpoints from detecting the malicious redirection.
        </li>
      </ul>

      <h2 className="blog-h2">Step-by-step diagnostic: How to check your router right now</h2>

      <p className="legal-text">
        You do not need to be a cybersecurity professional to audit your router. Follow these three targeted checks:
      </p>

      <h3 style={{ fontSize: '1.15rem', color: '#fff', marginTop: '1.5rem', marginBottom: '0.6rem' }}>
        Check 1: Verify your upstream DNS settings
      </h3>
      <p className="legal-text">
        DNS (Domain Name System) translates human web addresses (like <code>probeshield.com</code>) into numerical IP
        addresses. When a router is hacked, changing DNS is the attacker&apos;s primary objective:
      </p>
      <ol className="legal-list">
        <li>
          Log into your router&apos;s management interface via your web browser (check our{' '}
          <Link href="/default-passwords/">default router passwords directory</Link> if you need standard gateway IPs).
        </li>
        <li>
          Navigate to <strong>Network</strong>, <strong>Internet</strong>, or <strong>WAN Settings</strong>.
        </li>
        <li>
          Look at the <strong>Primary DNS</strong> and <strong>Secondary DNS</strong> fields.
        </li>
        <li>
          They should either be set to &quot;Obtain automatically from ISP&quot; or match known, reputable public resolvers:
          Cloudflare (<code>1.1.1.1</code> and <code>1.0.0.1</code>), Google (<code>8.8.8.8</code> and <code>8.8.4.4</code>),
          or Quad9 (<code>9.9.9.9</code>).
        </li>
        <li>
          If you see random foreign IP addresses you never configured, take a screenshot, note the numbers, and replace
          them immediately.
        </li>
      </ol>

      <h3 style={{ fontSize: '1.15rem', color: '#fff', marginTop: '1.5rem', marginBottom: '0.6rem' }}>
        Check 2: Audit open management ports on your gateway
      </h3>
      <p className="legal-text">
        A secure home router should only listen on local administrative ports (like HTTPS port 443 or HTTP port 80)
        and should <em>never</em> expose legacy, unencrypted services like <strong>Telnet (port 23)</strong> or an
        unrestricted SSH daemon.
      </p>
      <p className="legal-text">
        Using an on-device port scanner like ProbeShield on Android, run an immediate audit against your default gateway IP
        (such as <code>192.168.1.1</code>). If Telnet port 23 is open or unknown debugging ports are listening, your
        gateway has critical exposure. Read our in-depth analysis on{' '}
        <Link href="/blog/open-ports-home-network-risk/">open ports and network vulnerabilities</Link>.
      </p>

      <h3 style={{ fontSize: '1.15rem', color: '#fff', marginTop: '1.5rem', marginBottom: '0.6rem' }}>
        Check 3: Inspect active UPnP and Port Forwarding rules
      </h3>
      <p className="legal-text">
        Universal Plug and Play (UPnP) allows software on your network to request port forwarding automatically. While
        convenient for gaming consoles, malicious software can abuse UPnP to punch holes straight through your router&apos;s
        firewall without asking for your admin password.
      </p>
      <p className="legal-text">
        Check your router&apos;s <strong>Advanced &gt; UPnP</strong> or <strong>Port Forwarding</strong> page. If you see
        active rules forwarding traffic to IP addresses that don&apos;t match your gaming consoles or approved servers,
        delete the rules immediately.
      </p>

      <h2 className="blog-h2">How to fix and sanitize a hacked router (Recovery Protocol)</h2>
      <p className="legal-text">
        If you have confirmed or strongly suspect that your router has been compromised, do not simply change your WiFi
        password — that will not remove malware embedded in router memory. Follow this step-by-step sanitation protocol:
      </p>

      <ol className="legal-list">
        <li>
          <strong>Step 1: Disconnect the internet cable.</strong> Unplug the Ethernet or coax cable connecting your router
          to your modem or fiber ONT. This cuts off the attacker&apos;s active remote connection while you clean the device.
        </li>
        <li>
          <strong>Step 2: Perform a physical factory reset.</strong> Locate the small recessed reset button on the back of
          the router. While the unit is powered on, press and hold it with a paperclip for 15 to 30 seconds until the LEDs
          flash in unison. This completely clears volatile memory, wipes rogue DNS modifications, and removes temporary
          malware payloads.
        </li>
        <li>
          <strong>Step 3: Connect locally and update firmware.</strong> Connect one computer via an Ethernet cable. Log
          in using the factory default credentials printed on the physical sticker. Immediately navigate to{' '}
          <strong>Firmware Update</strong>, reconnect the internet briefly, and flash the latest vendor patch. If the
          router cannot auto-update offline, download the verified firmware file from the manufacturer&apos;s official
          website using cellular data and upload it manually.
        </li>
        <li>
          <strong>Step 4: Create a strong, unique administrator password.</strong> Never leave the router admin password
          as <code>admin</code> or blank. Use a unique 16+ character password stored in a password manager. This password
          controls router configuration and must be different from your WiFi password.
        </li>
        <li>
          <strong>Step 5: Disable high-risk legacy settings.</strong> In the router interface, disable{' '}
          <strong>Remote Management (WAN access)</strong>, disable <strong>WPS (Wi-Fi Protected Setup)</strong>, and
          disable <strong>UPnP</strong> if your household doesn&apos;t require it for multiple gaming consoles.
        </li>
        <li>
          <strong>Step 6: Update your WiFi WPA2/WPA3 network passphrase.</strong> Change your wireless password to evict
          any unauthorized devices that previously connected.
        </li>
      </ol>

      <div className="tip-box">
        <p>
          <strong>Post-cleanup checklist:</strong> Want to ensure your entire home setup is locked down? Go through our{' '}
          <Link href="/checklist/">interactive home network security checklist</Link> to audit guest networks, device
          isolation, and wireless encryption standards.
        </p>
      </div>

      <h2 className="blog-h2">Audit your home gateway with ProbeShield</h2>
      <p className="legal-text">
        ProbeShield helps you stay ahead of network intruders by giving you complete visibility into your local WiFi
        environment. Right from your Android device, ProbeShield scans your subnet, identifies active hosts, verifies
        hardware manufacturers, and tests your gateway for dangerous open ports (like Telnet 23 and insecure web
        management). Everything runs 100% locally on your phone with zero cloud accounts or telemetry tracking.
      </p>
    </>
  )
}

export const post: BlogPost = {
  slug: 'how-to-tell-if-your-router-is-hacked',
  title: 'How to Tell If Your Router Is Hacked (10 Warning Signs & Fixes)',
  description:
    'Think your WiFi router might be hacked? Learn the 10 critical warning signs of router compromise, how to check for DNS hijacking and open ports, and how to disinfect your gateway.',
  date: '2026-10-17',
  readTime: '8 min read',
  keywords: [
    'how to tell if your router is hacked',
    'signs router is hacked',
    'hacked wifi router symptoms',
    'router dns hijacking check',
    'how to fix a hacked router',
    'router malware signs',
    'check if someone hacked my router',
    'router remote management port',
    'factory reset hacked router',
    'router security audit',
  ],
  faqs,
  Body,
}
