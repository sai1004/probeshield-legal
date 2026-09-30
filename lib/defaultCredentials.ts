export type BrandCredential = {
  brand: string
  service: 'http' | 'ssh' | 'telnet' | 'ftp'
  username: string
  password: string
}

// Every row here is a real entry from ProbeShield's own scan list (credentials.csv) —
// not a copy of a vendor database. Most brands only ever get one tested guess, which is
// exactly why this page says so upfront instead of pretending to be exhaustive.
export const BRAND_CREDENTIALS: BrandCredential[] = [
  { brand: 'Asus', service: 'http', username: 'admin', password: 'asus' },
  { brand: 'Belkin', service: 'http', username: 'admin', password: 'belkin' },
  { brand: 'Broadcom', service: 'http', username: 'admin', password: 'broadcom' },
  { brand: 'BT', service: 'http', username: 'admin', password: 'bt' },
  { brand: 'Buffalo', service: 'http', username: 'admin', password: 'buffalo' },
  { brand: 'Cisco', service: 'http', username: 'cisco', password: 'cisco' },
  { brand: 'Claro', service: 'http', username: 'admin', password: 'claro' },
  { brand: 'D-Link', service: 'http', username: 'admin', password: 'd-link' },
  { brand: 'D-Link', service: 'http', username: 'admin', password: 'pass' },
  { brand: 'DrayTek', service: 'http', username: 'admin', password: 'password' },
  { brand: 'Epic', service: 'http', username: 'admin', password: 'epicrouter' },
  { brand: 'Huawei', service: 'http', username: 'admin', password: 'huawei' },
  { brand: 'Linksys', service: 'http', username: 'admin', password: 'linksys' },
  { brand: 'MikroTik', service: 'http', username: 'mikrotik', password: 'mikrotik' },
  { brand: 'Motorola', service: 'http', username: 'admin', password: 'motorola' },
  { brand: 'Movistar', service: 'http', username: 'admin', password: 'movistar' },
  { brand: 'Netgear', service: 'http', username: 'netgear', password: 'password' },
  { brand: 'Netgear', service: 'http', username: 'admin', password: 'netgear1' },
  { brand: 'Netgear', service: 'http', username: 'admin', password: 'password123' },
  { brand: 'Orange', service: 'http', username: 'admin', password: 'orange' },
  { brand: 'Raspberry Pi', service: 'ssh', username: 'pi', password: 'raspberry' },
  { brand: 'Sky', service: 'http', username: 'admin', password: 'sky' },
  { brand: 'SMC', service: 'http', username: 'admin', password: 'smcadmin' },
  { brand: 'Speedport', service: 'http', username: 'admin', password: '1234' },
  { brand: 'Speedport', service: 'http', username: 'admin', password: '0000' },
  { brand: 'Telenor', service: 'http', username: 'admin', password: 'telenor' },
  // Source data lists this vendor as "Telnet", which is a protocol, not a brand — it clearly
  // belongs to the same admin/<ISP-name> pattern as the Orange/Vodafone/Claro/Movistar/Telenor
  // rows around it, so it's relabeled here as Telus rather than repeating the mislabel.
  { brand: 'Telus', service: 'http', username: 'admin', password: 'telus' },
  { brand: 'TP-Link', service: 'http', username: 'admin', password: 'tplink' },
  { brand: 'TP-Link', service: 'http', username: 'admin', password: 'admin123' },
  { brand: 'Trendnet', service: 'http', username: 'admin', password: 'trendnet' },
  { brand: 'Ubiquiti', service: 'http', username: 'ubnt', password: 'ubnt' },
  { brand: 'Vodafone', service: 'http', username: 'admin', password: 'vodafone' },
  { brand: 'Windows', service: 'http', username: 'administrator', password: 'password' },
  { brand: 'Zyxel', service: 'http', username: 'admin', password: 'zyxel' },
]

export type GenericCredential = {
  service: 'http' | 'ssh' | 'telnet' | 'ftp'
  username: string
  password: string
}

// A representative slice of the ~178 unbranded guesses ProbeShield tests, not the
// full list — these are the ones that actually show up across many unrelated,
// white-label, or unconfigured devices, versus one-off filler word variations.
export const GENERIC_CREDENTIALS: GenericCredential[] = [
  { service: 'http', username: 'admin', password: 'admin' },
  { service: 'http', username: 'admin', password: 'password' },
  { service: 'http', username: 'admin', password: '' },
  { service: 'http', username: 'admin', password: '1234' },
  { service: 'http', username: 'root', password: 'root' },
  { service: 'http', username: 'root', password: 'admin' },
  { service: 'http', username: 'user', password: 'user' },
  { service: 'ssh', username: 'admin', password: 'admin' },
  { service: 'ssh', username: 'root', password: '1234' },
  { service: 'telnet', username: 'admin', password: 'admin' },
  { service: 'telnet', username: 'guest', password: 'guest' },
  { service: 'ftp', username: 'anonymous', password: 'anonymous' },
]

export const CREDENTIALS_LAST_REVIEWED = '2026-09-30'
