import Link from 'next/link'
import type { BlogPost } from './types'

function Body() {
  return (
    <>
      <p className="legal-text">
        &quot;Is my security camera hackable?&quot; is a reasonable thing to wonder — IP camera footage ending up
        indexed on camera-search sites is a real and well-documented problem, and it almost always comes down to the
        same two mistakes: a default password that was never changed, and a streaming port left open to more of the
        network (or internet) than it needed to be. Here&apos;s how to check your own setup in a few minutes.
      </p>

      <h2 className="blog-h2">The two things that actually expose a camera</h2>
      <p className="legal-text">
        Camera exposure incidents almost never involve a sophisticated exploit. They come down to:
      </p>
      <ul className="legal-list">
        <li><strong>Default or weak admin credentials</strong> — most cheap IP cameras ship with <code>admin/admin</code>, <code>admin/12345</code>, or a password printed on the box that&apos;s identical across the entire product line.</li>
        <li><strong>Port forwarding turned on carelessly</strong> — some camera apps ask you to enable UPnP or manually forward a port &quot;for remote viewing&quot; without explaining that this makes the camera reachable from the open internet, not just your phone.</li>
      </ul>

      <h2 className="blog-h2">Step 1 — Find the camera on your network</h2>
      <p className="legal-text">
        Run a device discovery scan and look for the manufacturer name attached to each result — camera brands (Hikvision,
        Dahua, Reolink, Wyze, TP-Link/Tapo, and generic ODM chipsets) usually resolve clearly through MAC OUI lookup.
        If you&apos;re not sure which device is which, see our guide on{' '}
        <Link href="/blog/find-hidden-devices-on-wifi">finding every device on your WiFi</Link>.
      </p>

      <h2 className="blog-h2">Step 2 — Check what ports it has open</h2>
      <p className="legal-text">
        Once you&apos;ve identified the camera&apos;s IP address, run a port scan against it specifically. The ports that
        matter most for cameras:
      </p>
      <ul className="legal-list">
        <li><strong>554 (RTSP)</strong> — the actual video stream. Should be reachable from your phone/NVR on the LAN, never from outside it.</li>
        <li><strong>80 / 8080 (HTTP admin)</strong> — the web-based configuration panel. If this is reachable from outside your network, anyone who finds the IP can attempt to log in.</li>
        <li><strong>23 (Telnet)</strong> — a disturbing number of budget cameras leave this open with a hardcoded or undocumented credential. There is essentially no legitimate reason for this to be open.</li>
      </ul>

      <div className="warning-box">
        <p>
          <strong>Port open on your LAN scan is normal — the real question is whether it&apos;s also open from the
          internet.</strong> Log into your router&apos;s admin panel and check the &quot;Port Forwarding&quot; or &quot;Virtual
          Server&quot; section. If you see an entry pointing to your camera&apos;s IP that you don&apos;t remember creating,
          remove it.
        </p>
      </div>

      <h2 className="blog-h2">Step 3 — Change the password, even if you &quot;already did&quot;</h2>
      <p className="legal-text">
        Some camera firmware resets the admin password on factory reset or firmware update without warning. If it&apos;s
        been more than a few months, log in directly and verify the password is still what you think it is — don&apos;t
        assume.
      </p>

      <h2 className="blog-h2">Step 4 — Prefer cloud-free, local-only setups where possible</h2>
      <p className="legal-text">
        Cameras that require a manufacturer cloud account to view footage remotely typically achieve that by having the
        camera phone home to the vendor&apos;s servers constantly — which is a different (and harder to audit) risk
        surface than a camera you access directly over your own network. If remote viewing matters to you, look for
        VPN-based remote access to your own router instead of vendor cloud relay.
      </p>

      <h2 className="blog-h2">Make it a recurring check</h2>
      <p className="legal-text">
        Firmware updates, factory resets, and even router replacements can silently re-expose a camera that was
        previously locked down. Treat a camera network audit the same way you&apos;d treat checking smoke detector
        batteries — a five-minute check every few months, not a one-time setup step. ProbeShield&apos;s scan history makes
        it easy to compare today&apos;s open-port list on a camera against the last time you checked, entirely on-device.
      </p>
    </>
  )
}

export const post: BlogPost = {
  slug: 'is-my-ip-camera-exposed',
  title: 'Is Your Home Security Camera Exposed? How to Check',
  description:
    'How to check whether your IP security camera is reachable from outside your network, why it happens, and how to lock it down in a few minutes.',
  date: '2026-09-27',
  readTime: '6 min read',
  keywords: ['is my ip camera hacked', 'check if security camera is exposed', 'ip camera security', 'camera port scan'],
  Body,
}
