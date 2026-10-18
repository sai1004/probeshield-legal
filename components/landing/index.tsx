'use client'

import { T } from './theme'
import { LandingNav } from './LandingNav'
import { HeroSection } from './HeroSection'
import { StatsBar } from './StatsBar'
import { FeaturesSection } from './FeaturesSection'
import { RiskSection } from './RiskSection'
import { PrivacySection } from './PrivacySection'
import { HowItWorksSection } from './HowItWorksSection'
import { CtaSection } from './CtaSection'
import { LandingFooter } from './LandingFooter'

export default function LandingPage() {
  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: 'var(--font-body)' }}>
      <LandingNav />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <RiskSection />
        <PrivacySection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
