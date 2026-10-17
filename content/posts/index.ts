import type { BlogPost } from './types'
import { post as stealingWifi } from './how-to-know-if-someone-is-stealing-your-wifi'
import { post as findHiddenDevices } from './find-hidden-devices-on-wifi'
import { post as openPorts } from './open-ports-home-network-risk'
import { post as ipCamera } from './is-my-ip-camera-exposed'
import { post as checklist } from './home-network-security-checklist'
import { post as wifiDisconnects } from './wifi-disconnects-android'
import { post as espressifDevice } from './what-is-espressif-device-on-wifi'
import { post as routerHacked } from './how-to-tell-if-your-router-is-hacked'
import { post as ghostDevices } from './why-router-shows-devices-not-home'

export type { BlogPost }

export const posts: BlogPost[] = [
  ghostDevices,
  routerHacked,
  espressifDevice,
  stealingWifi,
  wifiDisconnects,
  checklist,
  findHiddenDevices,
  openPorts,
  ipCamera,
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
