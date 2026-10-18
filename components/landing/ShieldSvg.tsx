import { T } from './theme'

export function ShieldSvg({ size = 36, color = T.primary }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L3 6.5V12c0 5.25 3.84 10.15 9 11.36C17.16 22.15 21 17.25 21 12V6.5L12 2z"
        fill={`${color}20`}
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
