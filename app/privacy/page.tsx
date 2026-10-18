import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LegalPageHeader } from '@/components/legal/LegalPageHeader'
import { LegalSection } from '@/components/legal/LegalSection'

export const metadata: Metadata = {
  title: 'Privacy Policy — ProbeShield',
  description: 'Privacy Policy for ProbeShield Android app and web services. Learn how we handle your data.',
  alternates: { canonical: 'https://probeshield.com/privacy/' },
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper">
        <LegalPageHeader
          badge="📄 Legal Document"
          title="Privacy"
          titleAccent="Policy"
          effectiveDate="March 26, 2026"
          lastUpdated="October 18, 2026"
          version="1.5"
        />

        {/* Intro */}
        <div className="highlight-box" style={{ marginBottom: '2rem' }}>
          <p>
            <strong>Short version:</strong> ProbeShield does not collect, transmit, or store any personal data on
            external servers. All scanning activity runs entirely on your device. The only internet requests the app
            makes on its own are a weekly download of public vulnerability data (see Section 6), and automatic crash
            reports to Google Firebase if the app crashes (see Section 5). Our website, but not the app, can use Google
            Analytics to count visits if you agree (see Section 7), and offers a couple of optional lookup tools that
            send a small amount of technical data to our own minimal server (see Section 8). We have nothing to sell and
            nothing to share.
          </p>
        </div>

        {/* TOC */}
        <div className="toc">
          <div className="toc-title">Table of Contents</div>
          <ol className="toc-list">
            {[
              'Overview',
              'Information We Do Not Collect',
              'Information Stored Locally',
              'Network Scanning',
              'Crash Reports',
              'Third Party Services',
              'Website and Analytics',
              'Website Tools (MAC Lookup & Port Checker)',
              'Data Security',
              "Children's Privacy",
              'Changes to This Policy',
              'Contact Us',
            ].map((item, i) => (
              <li key={i}>
                <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
                <a href={`#section-${i + 1}`}>{item}</a>
              </li>
            ))}
          </ol>
        </div>

        <LegalSection number={1} title="Overview">
          <p className="legal-text">
            This Privacy Policy applies to ProbeShield (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), the Android
            application and the website at probeshield.com. The app does not track your behaviour or usage in any way;
            the website can use Google Analytics, but only with your consent (see Section 7). The app does automatically
            send a crash report if it crashes — see Section 5 for exactly what that contains.
          </p>
          <p className="legal-text">
            We are committed to protecting your privacy. ProbeShield was built with a privacy-first architecture — the
            app operates entirely on your device and has no dependency on external servers for its core functionality.
          </p>
        </LegalSection>

        <LegalSection number={2} title="Information We Do Not Collect">
          <p className="legal-text">
            We want to be crystal clear about what we do <strong>not</strong> collect:
          </p>
          <ul className="legal-list">
            <li>Personal identification information (name, address, phone number)</li>
            <li>Network scan results or device data discovered during scans</li>
            <li>IP addresses, MAC addresses, or hostnames of scanned devices</li>
            <li>Open port lists or vulnerability findings</li>
            <li>Location data beyond what Android requires for Wi-Fi access</li>
            <li>Device identifiers or advertising IDs</li>
            <li>Usage patterns, session data, or behavioral analytics</li>
            <li>Payment information of any kind</li>
          </ul>
          <div className="highlight-box">
            <p>
              <strong>Your scan data never leaves your device.</strong> ProbeShield has no servers that receive or store
              scan results. Every vulnerability finding, device record, and scan history item lives exclusively in your
              phone&apos;s local storage.
            </p>
          </div>
          <p className="legal-text">
            This describes the Android app&apos;s scanning feature specifically. The website separately offers a couple
            of optional, standalone lookup tools that do send a small, different category of technical data — covered
            honestly in Section 8, not hidden behind this section&apos;s claims about the app.
          </p>
        </LegalSection>

        <LegalSection number={3} title="Information Stored Locally">
          <p className="legal-text">
            ProbeShield stores the following data <strong>locally on your device only</strong>, using Android&apos;s
            secure local database (Room/SQLite):
          </p>
          <ul className="legal-list">
            <li>Scan history — list of previous scans with timestamps</li>
            <li>Discovered device records — IP addresses and device names on your network</li>
            <li>Risk scores and vulnerability findings per device</li>
            <li>App settings and preferences you configure</li>
            <li>Your chosen app lock PIN (stored encrypted via Android Keystore)</li>
          </ul>
          <p className="legal-text">
            This data is only accessible to ProbeShield on your device and is never transmitted to us or any third
            party. When you uninstall the app, all locally stored data is permanently deleted.
          </p>
        </LegalSection>

        <LegalSection number={4} title="Network Scanning">
          <p className="legal-text">
            ProbeShield scans only the local Wi-Fi network your Android device is currently connected to. The app does
            not:
          </p>
          <ul className="legal-list">
            <li>Scan networks remotely or from a server</li>
            <li>Upload scan results to any external service</li>
            <li>Share discovered device information with us or third parties</li>
            <li>Access the content of network traffic (packet inspection)</li>
            <li>Scan networks without the user initiating a scan manually</li>
          </ul>
          <div className="warning-box">
            <p>
              <strong>Important:</strong> Android requires location permission to access Wi-Fi network information. This
              permission is used solely to identify the connected Wi-Fi network and enable LAN scanning. We do not use
              this permission to track your physical location.
            </p>
          </div>
        </LegalSection>

        <LegalSection number={5} title="Crash Reports">
          <p className="legal-text">
            If ProbeShield crashes, it always saves a short report <strong>on your device</strong> (the 10 most recent
            are kept; older ones are deleted automatically). A report contains the time of the crash, the app version,
            your Android version, your device&apos;s manufacturer and model, and the technical error details (a stack
            trace). It does <strong>not</strong> include your scan results, but technical error messages can
            occasionally mention details such as a network address, so please look a report over before you share it.
            When reports are waiting, Settings also shows a &quot;Share crash report&quot; option, which opens
            Android&apos;s share sheet so you can forward a copy yourself (for example, by email to us) — this is
            separate from, and in addition to, the automatic reporting described below.
          </p>
          <p className="legal-text">
            <strong>Automatic crash reporting.</strong> ProbeShield also sends the same information automatically to{' '}
            <strong>Google Firebase Crashlytics</strong> — the device model, Android version, app version, and stack
            trace described above, plus a Firebase-generated installation identifier (not tied to your name, email, or
            any account, since the app has none). This happens for every crash and cannot be turned off from within the
            app: we need crash reports to find and fix bugs, and an opt-out would mean learning about crashes from only
            a fraction of the people who hit them. Governed by Google&apos;s Privacy Policy and Firebase&apos;s own
            terms.
          </p>
        </LegalSection>

        <LegalSection number={6} title="Third Party Services">
          <p className="legal-text">ProbeShield uses a minimal set of third-party services:</p>
          <ul className="legal-list">
            <li>
              <strong>Google Play Billing</strong> — The app connects to Google Play&apos;s billing service on startup
              to check available subscription products and restore any existing purchase. Google Play Billing may
              receive your device&apos;s product query and purchase history as part of this; ProbeShield never sees or
              stores your payment details. A purchase flow is not currently available in the app. Governed by
              Google&apos;s Payments Privacy Notice.
            </li>
            <li>
              <strong>Google Forms</strong> — Used for voluntary user feedback submission. Governed by Google&apos;s
              Privacy Policy. Submitting feedback is entirely optional.
            </li>
            <li>
              <strong>Google Firebase Crashlytics</strong> — Active on every crash; see Section 5 for exactly what it
              sends. Governed by Google&apos;s Privacy Policy.
            </li>
          </ul>
          <p className="legal-text">
            The app also makes one request of its own, to our own server rather than a third party — described next.
          </p>
          <p className="legal-text">
            <strong>CVE catalog sync (our own server).</strong> About once a week, on an unmetered connection (typically
            Wi-Fi), the app asks <code>api.probeshield.com</code> — a server we operate — for any public vulnerability
            records (CVEs) added or changed since its last check, so the on-device scanner can recognise newly published
            issues. The request sends only a sync timestamp; no scan results, device information, or personal data are
            included or requested. Vulnerability <em>matching</em> itself — comparing something the scanner found
            against this catalog — always happens on your device, using the locally-synced copy; our server never sees
            or receives what your scanner finds.
          </p>
          <p className="legal-text">
            Our server, in turn, builds that catalog from the U.S. National Institute of Standards and Technology&apos;s
            public National Vulnerability Database (NVD), on its own periodic schedule — not per device. Because of
            this, NVD never sees your device&apos;s IP address or knows your device exists; only our server contacts NVD
            directly.
          </p>
          <p className="legal-text">
            No advertising SDKs, tracking libraries, behavioural-analytics platforms, or data brokers are integrated
            into the ProbeShield Android app. The one exception is the crash reporter above, which only ever sees crash
            data — never your scan results, device list, or how you use the app. The website is covered separately in
            Section 7.
          </p>
        </LegalSection>

        <LegalSection number={7} title="Website and Analytics">
          <p className="legal-text">
            This section covers the website at probeshield.com only.{' '}
            <strong>The Android app does not use Google Analytics or any similar analytics tool.</strong>
          </p>
          <p className="legal-text">
            The website can use <strong>Google Analytics 4</strong> (Google LLC) to count visits and see which pages are
            read, <strong>but only if you accept</strong>. When you first visit, a banner asks whether to allow
            analytics cookies. Until you accept, Google Analytics is not loaded and nothing about your visit is sent to
            Google. If you accept, Google Analytics may set cookies and collect technical information such as the pages
            you view, how long you stay, the site that referred you, your browser and device type, and your approximate
            location (derived from your IP address). We use this in aggregate to understand how the site is used and to
            improve it.
          </p>
          <ul className="legal-list">
            <li>
              <strong>Your choice:</strong> it is saved in your browser (local storage) so we don&apos;t ask again. You
              can change it at any time with &quot;Cookie settings&quot; in the page footer; choosing Decline stops
              analytics and removes the analytics cookies from your browser.
            </li>
            <li>
              Google Analytics is governed by Google&apos;s Privacy Policy, available at{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                policies.google.com/privacy
              </a>
              .
            </li>
            <li>
              The website is hosted on Cloudflare Pages. Like any web host, Cloudflare processes technical request data,
              such as your IP address, to deliver pages and protect the service.
            </li>
          </ul>
          <p className="legal-text">
            The website has no accounts, sign-in, or forms, and nothing you do in the app is linked to your visits to
            the website.
          </p>
        </LegalSection>

        <LegalSection number={8} title="Website Tools (MAC Lookup & Port Checker)">
          <p className="legal-text">
            probeshield.com also offers a couple of small, free, optional tools — a{' '}
            <strong>MAC address vendor lookup</strong> and an <strong>external open-port checker</strong> — on the same
            minimal server (<code>api.probeshield.com</code>) the app uses for CVE catalog sync (Section 6). These two
            tools are separate from the Android app itself: they&apos;re used from your browser on the website, not from
            inside the app.
          </p>
          <ul className="legal-list">
            <li>
              <strong>MAC lookup</strong> sends only the first 6 characters of a MAC address (the manufacturer prefix) —
              never the full address, which is truncated in your browser before anything is sent, so the part that
              identifies your specific device never leaves it.
            </li>
            <li>
              <strong>Port checker</strong> sends the port number you choose and, necessarily, your device&apos;s public
              IP address — checking whether a port is reachable from outside your network requires testing from an
              external server by definition; there is no way to check a different target.
            </li>
          </ul>
          <div className="highlight-box">
            <p>
              <strong>
                Server logs for these tools, including IP addresses, are kept for approximately 14 days and then deleted
                automatically.
              </strong>{' '}
              They exist solely to detect and prevent abuse of the service (for example, automated scanning) — we do not
              use them for analytics, profiling, advertising, or any purpose beyond that.
            </p>
          </div>
          <p className="legal-text">
            These tools require no account and aren&apos;t linked to any app usage, Play Store purchase, or identity.
            Requests to them pass through <strong>Cloudflare</strong>, which provides DNS, reverse-proxy routing, DDoS
            protection, and the tunnel connecting our server to the internet — as with any web request, Cloudflare
            processes technical request data (such as your IP address) to deliver and protect the service.
          </p>
          <p className="legal-text">
            None of this affects the Android app&apos;s core scanning and vulnerability-matching, which remain entirely
            on-device as described throughout this policy. These two tools are separate, optional website utilities you
            choose to use in your browser — not something the app does on its own. (The app&apos;s own, narrower use of
            this same server — CVE catalog sync only — is described in Section 6.)
          </p>
        </LegalSection>

        <LegalSection number={9} title="Data Security">
          <p className="legal-text">
            We take security seriously — it is, after all, what ProbeShield is about. Security measures in place
            include:
          </p>
          <ul className="legal-list">
            <li>App lock with PIN or biometric authentication to prevent unauthorized access</li>
            <li>PIN stored using Android Keystore — never in plain text</li>
            <li>Local database not world-readable — accessible only by the app</li>
            <li>
              No external API calls for core scanning functionality (the weekly public CVE download is described in
              Section 6)
            </li>
            <li>ProGuard/R8 code obfuscation on release builds</li>
          </ul>
        </LegalSection>

        <LegalSection number={10} title="Children's Privacy">
          <p className="legal-text">
            ProbeShield is not directed at children under the age of 13. We do not knowingly collect any personal
            information from children. If you believe a child has provided personal information through our app, please
            contact us and we will take immediate steps to address it.
          </p>
        </LegalSection>

        <LegalSection number={11} title="Changes to This Policy">
          <p className="legal-text">
            We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last Updated&quot;
            date at the top of this page and notify users via an in-app notification on the next app launch following a
            material change.
          </p>
          <p className="legal-text">
            Continued use of ProbeShield after a policy update constitutes your acceptance of the revised policy. We
            encourage you to review this page periodically.
          </p>
        </LegalSection>

        <LegalSection number={12} title="Contact Us">
          <p className="legal-text">
            If you have any questions, concerns, or requests regarding this Privacy Policy or ProbeShield&apos;s data
            practices, please contact us:
          </p>
          <div className="contact-card">
            <div className="contact-row">
              <span className="contact-label">Product</span>
              <span className="contact-value">ProbeShield</span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Email</span>
              <span className="contact-value">
                <a href="mailto:support@probeshield.com">support@probeshield.com</a>
              </span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Website</span>
              <span className="contact-value">
                <a href="https://probeshield.com">probeshield.com</a>
              </span>
            </div>
          </div>
        </LegalSection>
      </main>
      <Footer />
    </>
  )
}
