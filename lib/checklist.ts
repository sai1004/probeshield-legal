export type ChecklistItem = {
  id: string
  label: string
  detail: string
  link?: { href: string; label: string }
}

// Same ten items and order as /blog/home-network-security-checklist — kept in sync manually,
// since one is prose for reading and this is short labels for checking off.
export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'know-devices',
    label: "Know every device that's actually connected",
    detail: "Your router's own client list usually isn't complete.",
    link: { href: '/blog/find-hidden-devices-on-wifi', label: 'Why the router list misses devices' },
  },
  {
    id: 'iot-credentials',
    label: 'Check for default or reused credentials on IoT devices',
    detail: 'Smart plugs, cameras, thermostats — assume the password is still the default until you set one.',
    link: { href: '/default-passwords', label: 'Look up default passwords by brand' },
  },
  {
    id: 'iot-ports',
    label: 'Scan for open ports on anything IoT',
    detail: 'Cameras, DVRs, and cheap smart-home hubs are the most likely to have something exposed.',
    link: { href: '/blog/open-ports-home-network-risk', label: 'What open ports mean and which ones matter' },
  },
  {
    id: 'router-password',
    label: "Verify your router isn't using its default admin password",
    detail: 'The single highest-leverage fix on this list — do this one first.',
    link: { href: '/default-passwords', label: 'Look up default passwords by brand' },
  },
  {
    id: 'wps-off',
    label: 'Turn off WPS',
    detail: 'Convenient, but has a long history of PIN-brute-force vulnerabilities.',
  },
  {
    id: 'wpa3',
    label: "Confirm you're on WPA3 (or WPA2 at minimum)",
    detail: "Check it directly in the router admin panel — don't assume it was set correctly at purchase.",
  },
  {
    id: 'guest-network',
    label: 'Separate IoT devices onto a guest network',
    detail: "If one smart-home gadget is compromised, it can't directly reach your laptop or phone.",
  },
  {
    id: 'port-forwarding',
    label: "Check what's actually port-forwarded on your router",
    detail: 'Old rules for a game console or camera app you stopped using are doors left open to the internet.',
  },
  {
    id: 'cameras',
    label: 'Review cameras specifically',
    detail: 'They combine always-on exposure with genuinely sensitive footage.',
    link: { href: '/blog/is-my-ip-camera-exposed', label: 'IP camera exposure check' },
  },
  {
    id: 'rescan',
    label: 'Re-scan on a schedule, not just once',
    detail: "A network that was clean last time you checked isn't guaranteed to still be clean.",
  },
]

const STORAGE_KEY = 'ps_checklist_v1'

export type ChecklistState = {
  checked: Record<string, boolean>
  updatedAt: number | null
}

const EMPTY_STATE: ChecklistState = { checked: {}, updatedAt: null }

export function loadChecklistState(): ChecklistState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_STATE
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || typeof parsed.checked !== 'object') return EMPTY_STATE
    return { checked: parsed.checked, updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : null }
  } catch {
    return EMPTY_STATE
  }
}

export function saveChecklistState(state: ChecklistState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage blocked (private mode, quota, etc.) — the check still works for this page view,
    // it just won't persist across visits.
  }
}
