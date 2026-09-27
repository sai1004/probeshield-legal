import Link from 'next/link'
import type { BlogPost } from './types'

function Body() {
  return (
    <>
      <p className="legal-text">
        Port scanning sounds like something only penetration testers do to corporate networks. In reality, the single
        most useful security check you can run on your own home network is exactly that — a scan of which ports are
        open on each device, and why. Here&apos;s what a port actually is, why an open one matters, and how to check
        yours without installing anything on a computer.
      </p>

      <h2 className="blog-h2">What a &quot;port&quot; actually is</h2>
      <p className="legal-text">
        Every device on your network can run multiple services at once — a printer might serve a web-based admin
        panel, accept print jobs, and respond to file-sharing requests, all at the same time. Each of those services
        listens on a numbered &quot;port,&quot; and a port scan simply checks which of those ports respond when you knock on
        them. An open port means: <em>something on that device is listening and willing to talk to whoever asks.</em>
      </p>

      <h2 className="blog-h2">Why an open port is a risk, specifically</h2>
      <p className="legal-text">
        An open port isn&apos;t automatically dangerous — your router needs port 80/443 open to serve its admin page, for
        instance. The risk comes from three specific patterns:
      </p>
      <ul className="legal-list">
        <li><strong>Default credentials.</strong> Cheap IoT devices — cameras, smart plugs, DVRs — often ship with an admin service exposed on the LAN and a default username/password the manufacturer never forces you to change.</li>
        <li><strong>Services you don&apos;t remember enabling.</strong> Old NAS boxes, printers, or dev tools left running with Telnet, FTP, or an unauthenticated debug port open — often installed years ago and forgotten.</li>
        <li><strong>Version-specific vulnerabilities.</strong> An open port tells you which software is listening and often its version, which is exactly the information a known-vulnerability lookup needs.</li>
      </ul>

      <div className="highlight-box">
        <p>
          <strong>Rule of thumb:</strong> every open port should be something you can explain. If you scan a device and
          find a port open that you can&apos;t account for, that&apos;s the one to investigate first — not the ones you
          already know about.
        </p>
      </div>

      <h2 className="blog-h2">The ports worth paying attention to</h2>
      <p className="legal-text">
        A full scan checks the top 100 TCP ports on every device, but a handful come up disproportionately often in
        home-network findings:
      </p>
      <ul className="legal-list">
        <li><strong>23 (Telnet)</strong> — unencrypted remote access, still shipped open by default on a surprising number of budget routers and cameras. Should essentially never be open.</li>
        <li><strong>21 (FTP)</strong> — file transfer with no encryption; common on NAS devices and printers with sharing features left on.</li>
        <li><strong>8080 / 8443</strong> — alternate web admin ports, frequently used by IP cameras and DVR systems for their management UI.</li>
        <li><strong>554 (RTSP)</strong> — the streaming port for IP cameras; open to the whole LAN (or worse, forwarded to the internet) means anyone who finds it can potentially view the feed.</li>
        <li><strong>445 (SMB)</strong> — Windows file sharing; a frequent target for lateral movement if one device on the network is already compromised.</li>
      </ul>
      <p className="legal-text">
        If port 554 shows up on a device that turns out to be a security camera, that&apos;s worth a closer look — see our
        dedicated guide on <Link href="/blog/is-my-ip-camera-exposed">checking whether your camera is exposed</Link>.
      </p>

      <h2 className="blog-h2">Scanning your own network is legal — scanning others&apos; isn&apos;t</h2>
      <p className="legal-text">
        One important boundary: port scanning is only appropriate on networks you own or have explicit permission to
        test. Scanning a network you don&apos;t control — a neighbor&apos;s WiFi, a coffee shop&apos;s router, an employer&apos;s
        network without authorization — can violate computer-misuse laws even when no harm is intended. ProbeShield
        (and its CLI counterpart) are built around that boundary: private/RFC1918 ranges by default, no scanning
        outside your own subnet without an explicit override.
      </p>

      <h2 className="blog-h2">Closing what you find</h2>
      <ol className="legal-list legal-list-numbered">
        <li>Log into the device directly (not through the scanner) and check its admin settings for the service tied to the open port.</li>
        <li>Change any default credentials immediately, even on a &quot;low risk&quot; device — default creds are the single most common way home IoT gets compromised.</li>
        <li>Disable the service entirely if you don&apos;t use it (Telnet and FTP almost never need to be on).</li>
        <li>Re-scan after making changes to confirm the port actually closed — some devices need a reboot before a setting change takes effect.</li>
      </ol>
    </>
  )
}

export const post: BlogPost = {
  slug: 'open-ports-home-network-risk',
  title: 'What Open Ports Are, and Why You Should Scan Your Own Home Network',
  description:
    'A plain-English explanation of what an open port is, which ones actually matter on a home network, and how to check and close the risky ones.',
  date: '2026-09-27',
  readTime: '7 min read',
  keywords: ['what is port scanning', 'open ports security risk home network', 'port scanner for home network', 'home network vulnerability'],
  Body,
}
