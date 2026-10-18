export const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'Device Discovery',
    desc: 'ARP + mDNS + ping sweep identifies every device on your WiFi within seconds — including hidden ones.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
      </svg>
    ),
    title: 'Port Scanner',
    desc: 'Probes the top 100 TCP ports per device, exposing open attack surfaces and running services.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
    title: 'Manufacturer ID',
    desc: 'MAC OUI lookup tells you exactly which brand and model each device is — no guessing.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v5c0 5.25 3.84 10.15 9 11.36C17.16 17.15 21 12.25 21 12V7L12 2z"/>
      </svg>
    ),
    title: 'Risk Scoring',
    desc: 'Five-tier security ratings — Critical to Safe — with per-device vulnerability breakdowns.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Scan History',
    desc: 'Every scan saved locally. Compare over time to catch new devices and emerging threats.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'App Lock',
    desc: 'PIN + biometric protection. Your audit data stays private even on shared devices.',
  },
]

export const RISK_LEVELS = [
  { label: 'Critical', color: '#FF3B3B', pct: 100, desc: 'Remote exploit possible' },
  { label: 'High',     color: '#FF6B35', pct:  78, desc: 'Significant exposure found' },
  { label: 'Medium',   color: '#FFB800', pct:  52, desc: 'Potential weakness detected' },
  { label: 'Low',      color: '#4FC3F7', pct:  28, desc: 'Minor issue noted' },
  { label: 'Safe',     color: '#00C896', pct:   6, desc: 'No threats identified' },
]

export const STEPS = [
  {
    num: '01',
    title: 'Connect to WiFi',
    desc: 'Launch ProbeShield on your Android device while connected to any home or office WiFi network.',
  },
  {
    num: '02',
    title: 'Start Network Scan',
    desc: 'Tap "Start Network Scan." ProbeShield maps every device, probes ports, and fingerprints manufacturers.',
  },
  {
    num: '03',
    title: 'Review Risk Report',
    desc: 'Get a prioritised risk list with per-device breakdowns. Export a full PDF audit report.',
  },
]

export const STATS = [
  { value: '100+', label: 'TCP ports per device' },
  { value: '0',    label: 'Bytes of scan data uploaded' },
  { value: '5',    label: 'Risk severity tiers' },
  { value: '100%', label: 'On-device processing' },
]

export const TRUST_BADGES = ['No Cloud', 'No Account', 'No App Tracking', 'Scans Stay Local']

export const PRIVACY_ITEMS = [
  'Your scan data never leaves your phone',
  'No account or sign-up required',
  'No analytics, crash reporters, or ads',
  'Scan history stored in local Room database',
  'Optional PIN + biometric app lock',
  'Open permissions model — full transparency',
]
