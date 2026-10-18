import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LegalPageHeader } from '@/components/legal/LegalPageHeader'
import { LegalSection } from '@/components/legal/LegalSection'

export const metadata: Metadata = {
  title: 'Terms of Service — ProbeShield',
  description: 'Terms of Service for ProbeShield Android app. Read our usage terms before using the app.',
  alternates: { canonical: 'https://probeshield.com/terms/' },
}

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper">

        <LegalPageHeader
          badge="📋 Legal Document"
          title="Terms of"
          titleAccent="Service"
          effectiveDate="March 26, 2026"
          lastUpdated="October 18, 2026"
          version="1.1"
        />

        {/* Intro */}
        <div className="highlight-box" style={{ marginBottom: '2rem' }}>
          <p>
            <strong>Short version:</strong> ProbeShield is a defensive security tool for use exclusively on networks you own or have explicit permission to audit. Unauthorized scanning is illegal and strictly prohibited. Use it responsibly.
          </p>
        </div>

        {/* TOC */}
        <div className="toc">
          <div className="toc-title">Table of Contents</div>
          <ol className="toc-list">
            {[
              'Acceptance of Terms',
              'Description of Service',
              'Permitted Use',
              'Prohibited Use',
              'User Responsibilities',
              'Intellectual Property',
              'Disclaimer of Warranties',
              'Limitation of Liability',
              'Indemnification',
              'Termination',
              'Changes to Terms',
              'Governing Law',
              'Contact Us',
            ].map((item, i) => (
              <li key={i}>
                <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
                <a href={`#section-${i + 1}`}>{item}</a>
              </li>
            ))}
          </ol>
        </div>

        <LegalSection number={1} title="Acceptance of Terms">
          <p className="legal-text">
            By downloading, installing, or using ProbeShield (&quot;the App&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not install or use the App.
          </p>
          <p className="legal-text">
            These Terms constitute a legally binding agreement between you and ProbeShield (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          </p>
        </LegalSection>

        <LegalSection number={2} title="Description of Service">
          <p className="legal-text">
            ProbeShield is a network security auditing application for Android devices. The App provides the following functionality:
          </p>
          <ul className="legal-list">
            <li>Discovery of devices connected to a local Wi-Fi network</li>
            <li>Port scanning and service detection on discovered devices</li>
            <li>Risk assessment and vulnerability identification</li>
            <li>Security audit report generation</li>
            <li>Guided remediation recommendations</li>
          </ul>
          <p className="legal-text">
            ProbeShield is currently free to download and use, with no in-app purchases or subscriptions.
          </p>
        </LegalSection>

        <LegalSection number={3} title="Permitted Use">
          <p className="legal-text">
            ProbeShield may only be used on networks and devices for which you have explicit authorization. Permitted uses include:
          </p>
          <ul className="legal-list">
            <li>Scanning your own personal home Wi-Fi network</li>
            <li>Scanning your own business or office network</li>
            <li>Scanning a client&apos;s network with explicit written authorization from the network owner</li>
            <li>Scanning a test or lab network you own or control</li>
            <li>Security research on networks you own or have signed permission to test</li>
          </ul>
          <div className="highlight-box">
            <p><strong>The golden rule:</strong> If you do not own the network or do not have written permission from the owner, you may not use ProbeShield to scan it. Full stop.</p>
          </div>
        </LegalSection>

        <LegalSection number={4} title="Prohibited Use">
          <div className="warning-box">
            <p><strong>Warning:</strong> Unauthorized network scanning is illegal in many jurisdictions and may result in criminal prosecution. ProbeShield must never be used for unauthorized access.</p>
          </div>
          <p className="legal-text" style={{ marginTop: '1rem' }}>
            You may <strong>not</strong> use ProbeShield to:
          </p>
          <ul className="legal-list">
            <li>Scan any network you do not own or have explicit written permission to audit</li>
            <li>Scan networks in public places (coffee shops, hotels, airports) without owner authorization</li>
            <li>Conduct unauthorized penetration testing on any organization</li>
            <li>Attempt to gain unauthorized access to devices discovered during scanning</li>
            <li>Use discovered vulnerability information to exploit or attack devices</li>
            <li>Circumvent security measures on devices or networks you do not own</li>
            <li>Use the App for any illegal purpose under applicable local, national, or international law</li>
            <li>Resell, redistribute, or sublicense the App without written permission</li>
            <li>Reverse engineer, decompile, or disassemble the App</li>
          </ul>
          <p className="legal-text">
            Violation of these prohibited use terms may result in immediate termination of your access to ProbeShield and may be reported to relevant law enforcement authorities.
          </p>
        </LegalSection>

        <LegalSection number={5} title="User Responsibilities">
          <p className="legal-text">
            As a user of ProbeShield, you are solely responsible for:
          </p>
          <ul className="legal-list">
            <li>Ensuring you have proper authorization before scanning any network</li>
            <li>Complying with all applicable laws and regulations in your jurisdiction</li>
            <li>Any consequences arising from your use or misuse of the App</li>
            <li>Keeping your account credentials and app lock PIN secure</li>
            <li>Maintaining the security of any exported scan reports</li>
            <li>Notifying us promptly of any unauthorized use of your account</li>
          </ul>
        </LegalSection>

        <LegalSection number={6} title="Intellectual Property">
          <p className="legal-text">
            ProbeShield, including its name, logo, design, code, and all associated content, is the exclusive intellectual property of ProbeShield. All rights are reserved.
          </p>
          <p className="legal-text">
            You are granted a limited, non-exclusive, non-transferable, revocable license to use the App for its intended purpose in accordance with these Terms. No ownership rights are transferred to you.
          </p>
          <ul className="legal-list">
            <li>You may not copy, reproduce, or distribute the App or its content</li>
            <li>You may not create derivative works based on the App</li>
            <li>You may not use the ProbeShield name or logo without written permission</li>
          </ul>
        </LegalSection>

        <LegalSection number={7} title="Disclaimer of Warranties">
          <p className="legal-text">
            ProbeShield is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied.
          </p>
          <ul className="legal-list">
            <li>We do not warrant that the App will be error-free, uninterrupted, or completely secure.</li>
            <li>Scan results are provided for informational purposes only. We do not guarantee the completeness or accuracy of vulnerability detection.</li>
            <li>ProbeShield may not detect all vulnerabilities present on a network. The absence of findings does not guarantee a network is secure.</li>
            <li>We are not responsible for decisions made based on scan results.</li>
          </ul>
        </LegalSection>

        <LegalSection number={8} title="Limitation of Liability">
          <p className="legal-text">
            To the maximum extent permitted by applicable law, ProbeShield and its developer shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:
          </p>
          <ul className="legal-list">
            <li>Your use or inability to use the App</li>
            <li>Any unauthorized use of the App by you or a third party</li>
            <li>Any decisions made based on scan results or vulnerability findings</li>
            <li>Any security breach or network compromise on networks you scan</li>
            <li>Any legal consequences arising from unauthorized scanning activities</li>
          </ul>
          <p className="legal-text">
            Our total liability to you for any claims arising from these Terms or your use of the App shall not exceed the amount you paid for the App in the 12 months preceding the claim.
          </p>
        </LegalSection>

        <LegalSection number={9} title="Indemnification">
          <p className="legal-text">
            You agree to indemnify, defend, and hold harmless ProbeShield, its developer, and affiliates from any claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from:
          </p>
          <ul className="legal-list">
            <li>Your use or misuse of the App</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any applicable law or regulation</li>
            <li>Unauthorized network scanning activities conducted using the App</li>
            <li>Any third-party claims arising from your use of the App</li>
          </ul>
        </LegalSection>

        <LegalSection number={10} title="Termination">
          <p className="legal-text">
            We reserve the right to terminate or suspend your access to ProbeShield at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
          </p>
          <p className="legal-text">
            You may terminate your use of the App at any time by uninstalling it. Upon uninstallation, all locally stored data will be permanently deleted from your device.
          </p>
        </LegalSection>

        <LegalSection number={11} title="Changes to Terms">
          <p className="legal-text">
            We may update these Terms of Service at any time. We will notify you of material changes via an in-app notification. The updated Terms will be effective immediately upon posting to probeshield.com/terms.
          </p>
          <p className="legal-text">
            Continued use of ProbeShield after changes are posted constitutes your acceptance of the updated Terms. If you do not agree to the updated Terms, you must stop using the App.
          </p>
        </LegalSection>

        <LegalSection number={12} title="Governing Law">
          <p className="legal-text">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in India.
          </p>
          <p className="legal-text">
            If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining Terms will remain in full force and effect.
          </p>
        </LegalSection>

        <LegalSection number={13} title="Contact Us">
          <p className="legal-text">
            If you have any questions about these Terms of Service, please contact us:
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
        </LegalSection>

      </main>
      <Footer />
    </>
  )
}
