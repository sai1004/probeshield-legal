import type { BlogPost } from './types'
import { post as findHiddenDevices } from './find-hidden-devices-on-wifi'
import { post as openPorts } from './open-ports-home-network-risk'
import { post as ipCamera } from './is-my-ip-camera-exposed'
import { post as checklist } from './home-network-security-checklist'
import { post as wifiDisconnects } from './wifi-disconnects-android'

export type { BlogPost }

export const posts: BlogPost[] = [
  wifiDisconnects,
  checklist,
  findHiddenDevices,
  openPorts,
  ipCamera,
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
