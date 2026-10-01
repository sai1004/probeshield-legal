import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — ProbeShield',
  description: 'Privacy Policy for ProbeShield Android app and web services. Learn how we handle your data.',
  alternates: { canonical: 'https://probeshield.com/privacy' },
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper">

        {/* Header */}
        <div className="page-header">
          <div className="page-badge">📄 Legal Document</div>
          <h1 className="page-title">Privacy <span>Policy</span></h1>
          <div className="page-meta">
            <span className="page-meta-item">
              <strong>Effective Date:</strong> March 26, 2026
            </span>
            <span className="page-meta-item">
              <strong>Last Updated:</strong> September 28, 2026
            </span>
            <span className="page-meta-item">
              <strong>Version:</strong> 1.1
            </span>
          </div>
        </div>

        {/* Intro */}
        <div className="highlight-box" style={{ marginBottom: '2rem' }}>
          <p>
            <strong>Short version:</strong> ProbeShield does not collect, transmit, or store any personal data on external servers. All scanning activity runs entirely on your device. The only internet request the app makes on its own is a weekly download of public vulnerability data (see Section 6). Our website, but not the app, can use Google Analytics to count visits if you agree (see Section 7). We have nothing to sell and nothing to share.
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
              'Data Security',
              'Children\'s Privacy',
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

        {/* Section 1 */}
        <section className="legal-section" id="section-1">
          <div className="section-number">Section 01</div>
          <h2 className="section-title">Overview</h2>
          <p className="legal-text">
            ProbeShield (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is operated by Saikiran Bavandla, trading as ProbeShield (probeshield.com). This Privacy Policy applies to the ProbeShield Android application and the website at probeshield.com. The app does not use analytics; the website can, but only with your consent (see Section 7).
          </p>
          <p className="legal-text">
            We are committed to protecting your privacy. ProbeShield was built with a privacy-first architecture — the app operates entirely on your device and has no dependency on external servers for its core functionality.
          </p>
        </section>

        {/* Section 2 */}
        <section className="legal-section" id="section-2">
          <div className="section-number">Section 02</div>
          <h2 className="section-title">Information We Do Not Collect</h2>
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
            <p><strong>Your scan data never leaves your device.</strong> ProbeShield has no servers that receive or store scan results. Every vulnerability finding, device record, and scan history item lives exclusively in your phone&apos;s local storage.</p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="legal-section" id="section-3">
          <div className="section-number">Section 03</div>
          <h2 className="section-title">Information Stored Locally</h2>
          <p className="legal-text">
            ProbeShield stores the following data <strong>locally on your device only</strong>, using Android&apos;s secure local database (Room/SQLite):
          </p>
          <ul className="legal-list">
            <li>Scan history — list of previous scans with timestamps</li>
            <li>Discovered device records — IP addresses and device names on your network</li>
            <li>Risk scores and vulnerability findings per device</li>
            <li>App settings and preferences you configure</li>
            <li>Your chosen app lock PIN (stored encrypted via Android Keystore)</li>
          </ul>
          <p className="legal-text">
            This data is only accessible to ProbeShield on your device and is never transmitted to us or any third party. When you uninstall the app, all locally stored data is permanently deleted.
          </p>
        </section>

        {/* Section 4 */}
        <section className="legal-section" id="section-4">
          <div className="section-number">Section 04</div>
          <h2 className="section-title">Network Scanning</h2>
          <p className="legal-text">
            ProbeShield scans only the local Wi-Fi network your Android device is currently connected to. The app does not:
          </p>
          <ul className="legal-list">
            <li>Scan networks remotely or from a server</li>
            <li>Upload scan results to any external service</li>
            <li>Share discovered device information with us or third parties</li>
            <li>Access the content of network traffic (packet inspection)</li>
            <li>Scan networks without the user initiating a scan manually</li>
          </ul>
          <div className="warning-box">
            <p><strong>Important:</strong> Android requires location permission to access Wi-Fi network information. This permission is used solely to identify the connected Wi-Fi network and enable LAN scanning. We do not use this permission to track your physical location.</p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="legal-section" id="section-5">
          <div className="section-number">Section 05</div>
          <h2 className="section-title">Crash Reports</h2>
          <p className="legal-text">
            If ProbeShield crashes, it saves a short report <strong>on your device only</strong> (the 10 most recent are kept; older ones are deleted automatically). A report contains the time of the crash, the app version, your Android version, your device&apos;s manufacturer and model, and the technical error details (a stack trace). It does <strong>not</strong> include your scan results, but technical error messages can occasionally mention details such as a network address, so please look a report over before you share it.
          </p>
          <p className="legal-text">
            <strong>Nothing is sent automatically.</strong> When reports are waiting, Settings shows a &quot;Share crash report&quot; option. Tapping it opens Android&apos;s share sheet so you decide where the reports go (for example, an email to us), and they are then removed from your device. ProbeShield does not use a third-party crash-reporting service.
          </p>
        </section>

        {/* Section 6 */}
        <section className="legal-section" id="section-6">
          <div className="section-number">Section 06</div>
          <h2 className="section-title">Third Party Services</h2>
          <p className="legal-text">
            ProbeShield uses a minimal set of third-party services:
          </p>
          <ul className="legal-list">
            <li><strong>NIST National Vulnerability Database (NVD)</strong> — About once a week, on an unmetered connection (typically Wi-Fi), the app downloads recent public vulnerability records (CVEs) from <code>services.nvd.nist.gov</code> so the on-device scanner can recognise newly published issues. This is a download only: no scan results, device information, or personal data are sent. As with any web request, NVD&apos;s servers can see your device&apos;s IP address and the time of the request, which we do not receive or store. The request identifies itself as &quot;ProbeShield-CVE-Updater/1.0&quot;. NVD is operated by the U.S. National Institute of Standards and Technology and is governed by its own policies.</li>
            <li><strong>Google Play Billing</strong> — The app connects to Google Play&apos;s billing service on startup to check available subscription products and restore any existing purchase. Google Play Billing may receive your device&apos;s product query and purchase history as part of this; ProbeShield never sees or stores your payment details. A purchase flow is not currently available in the app. Governed by Google&apos;s Payments Privacy Notice.</li>
            <li><strong>Google Forms</strong> — Used for voluntary user feedback submission. Governed by Google&apos;s Privacy Policy. Submitting feedback is entirely optional.</li>
          </ul>
          <p className="legal-text">
            No advertising SDKs, tracking libraries, analytics platforms, or data brokers are integrated into the ProbeShield Android app. The website is covered separately in Section 7.
          </p>
        </section>

        {/* Section 7 */}
        <section className="legal-section" id="section-7">
          <div className="section-number">Section 07</div>
          <h2 className="section-title">Website and Analytics</h2>
          <p className="legal-text">
            This section covers the website at probeshield.com only. <strong>The Android app does not use Google Analytics or any similar analytics tool.</strong>
          </p>
          <p className="legal-text">
            The website can use <strong>Google Analytics 4</strong> (Google LLC) to count visits and see which pages are read, <strong>but only if you accept</strong>. When you first visit, a banner asks whether to allow analytics cookies. Until you accept, Google Analytics is not loaded and nothing about your visit is sent to Google. If you accept, Google Analytics may set cookies and collect technical information such as the pages you view, how long you stay, the site that referred you, your browser and device type, and your approximate location (derived from your IP address). We use this in aggregate to understand how the site is used and to improve it.
          </p>
          <ul className="legal-list">
            <li><strong>Your choice:</strong> it is saved in your browser (local storage) so we don&apos;t ask again. You can change it at any time with &quot;Cookie settings&quot; in the page footer; choosing Decline stops analytics and removes the analytics cookies from your browser.</li>
            <li>Google Analytics is governed by Google&apos;s Privacy Policy, available at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</li>
            <li>The website is hosted on Cloudflare Pages. Like any web host, Cloudflare processes technical request data, such as your IP address, to deliver pages and protect the service.</li>
          </ul>
          <p className="legal-text">
            The website has no accounts, sign-in, or forms, and nothing you do in the app is linked to your visits to the website.
          </p>
        </section>

        {/* Section 8 */}
        <section className="legal-section" id="section-8">
          <div className="section-number">Section 08</div>
          <h2 className="section-title">Data Security</h2>
          <p className="legal-text">
            We take security seriously — it is, after all, what ProbeShield is about. Security measures in place include:
          </p>
          <ul className="legal-list">
            <li>App lock with PIN or biometric authentication to prevent unauthorized access</li>
            <li>PIN stored using Android Keystore — never in plain text</li>
            <li>Local database not world-readable — accessible only by the app</li>
            <li>No external API calls for core scanning functionality (the weekly public CVE download is described in Section 6)</li>
            <li>ProGuard/R8 code obfuscation on release builds</li>
          </ul>
        </section>

        {/* Section 9 */}
        <section className="legal-section" id="section-9">
          <div className="section-number">Section 09</div>
          <h2 className="section-title">Children&apos;s Privacy</h2>
          <p className="legal-text">
            ProbeShield is not directed at children under the age of 13. We do not knowingly collect any personal information from children. If you believe a child has provided personal information through our app, please contact us and we will take immediate steps to address it.
          </p>
        </section>

        {/* Section 10 */}
        <section className="legal-section" id="section-10">
          <div className="section-number">Section 10</div>
          <h2 className="section-title">Changes to This Policy</h2>
          <p className="legal-text">
            We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last Updated&quot; date at the top of this page and notify users via an in-app notification on the next app launch following a material change.
          </p>
          <p className="legal-text">
            Continued use of ProbeShield after a policy update constitutes your acceptance of the revised policy. We encourage you to review this page periodically.
          </p>
        </section>

        {/* Section 11 */}
        <section className="legal-section" id="section-11">
          <div className="section-number">Section 11</div>
          <h2 className="section-title">Contact Us</h2>
          <p className="legal-text">
            If you have any questions, concerns, or requests regarding this Privacy Policy or ProbeShield&apos;s data practices, please contact us:
          </p>
          <div className="contact-card">
            <div className="contact-row">
              <span className="contact-label">Product</span>
              <span className="contact-value">ProbeShield</span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Email</span>
              <span className="contact-value"><a href="mailto:support@probeshield.com">support@probeshield.com</a></span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Website</span>
              <span className="contact-value"><a href="https://probeshield.com">probeshield.com</a></span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
