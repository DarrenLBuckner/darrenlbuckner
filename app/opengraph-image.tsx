import { ImageResponse } from 'next/og'

export const alt = 'Darren L. Buckner — Entrepreneur, Builder, Technologist, Veteran'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Top gold line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '3px',
            background: '#c9a84c',
          }}
        />

        {/* DLB monogram */}
        <div
          style={{
            fontSize: 24,
            color: '#c9a84c',
            fontWeight: 700,
            letterSpacing: '8px',
            marginBottom: '32px',
          }}
        >
          DLB
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ededed',
            letterSpacing: '-1px',
            lineHeight: 1.1,
          }}
        >
          Darren L. Buckner
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: '#c9a84c',
            marginTop: '20px',
            letterSpacing: '2px',
          }}
        >
          Entrepreneur · Builder · Technologist · Veteran
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: '80px',
            height: '2px',
            background: '#c9a84c',
            marginTop: '32px',
            marginBottom: '32px',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            color: '#888888',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.5,
          }}
        >
          He didn't wait for the tools to exist. He built them.
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: 16,
            color: '#555555',
            letterSpacing: '2px',
          }}
        >
          darrenlbuckner.com
        </div>

        {/* Bottom gold line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '3px',
            background: '#c9a84c',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
