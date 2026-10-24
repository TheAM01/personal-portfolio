import { ogImage, ogSize } from '@/lib/og'

export const alt = 'Abdul Mueed — portfolio of SaaS products'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return ogImage({ title: 'Mueed', subtitle: 'Software engineer · Products I’ve built & shipped', kicker: 'Portfolio', cover: '/projects/krest/cover.jpg' })
}
