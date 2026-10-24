import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }

async function font(weight: number) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@${weight}`)).text()
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    return url ? await (await fetch(url)).arrayBuffer() : null
  } catch {
    return null
  }
}

/** Brutalist OG card: black skewed title block, accent offset image. */
export async function ogImage({ title, subtitle, kicker, cover }: { title: string; subtitle: string; kicker: string; cover?: string }) {
  const [bold, med] = await Promise.all([font(700), font(500)])
  const fonts = [
    ...(bold ? [{ name: 'SG', data: bold, weight: 700 as const }] : []),
    ...(med ? [{ name: 'SG', data: med, weight: 500 as const }] : []),
  ]
  const img = cover ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), 'public', cover))).toString('base64')}` : null

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#fff', fontFamily: 'SG', padding: 56, position: 'relative',
        backgroundImage: 'linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: img ? 560 : 1088, height: '100%' }}>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, letterSpacing: 6, color: 'rgba(0,0,0,.45)', textTransform: 'uppercase' }}>{kicker}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignSelf: 'flex-start', background: '#000', color: '#fff', fontSize: title.length > 8 ? 92 : 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1, padding: '14px 28px', transform: 'skewX(-6deg)' }}>
              {title.toUpperCase()}
            </div>
            <div style={{ display: 'flex', marginTop: 28, fontSize: 30, fontWeight: 700, color: '#000', textTransform: 'uppercase', letterSpacing: 2, lineHeight: 1.25 }}>{subtitle}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 500, color: 'rgba(0,0,0,.6)' }}>
            <div style={{ display: 'flex', width: 18, height: 18, background: '#fcb345', border: '3px solid #000' }} />
            portfolio.mueed.xyz
          </div>
        </div>
        {img && (
          <div style={{ display: 'flex', position: 'absolute', right: 56, top: 108, width: 540, height: 338 }}>
            <div style={{ display: 'flex', position: 'absolute', left: 16, top: 16, width: 540, height: 338, background: '#fcb345', border: '4px solid #000' }} />
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={img} width={540} height={338} style={{ position: 'absolute', left: 0, top: 0, border: '4px solid #000', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        )}
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined },
  )
}
