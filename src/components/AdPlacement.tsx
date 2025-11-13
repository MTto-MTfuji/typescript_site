import { useEffect } from 'react'
import MobileAd from './MobileAd'
import './AdPlacement.css'

interface AdPlacementProps {
  variant?: 'sidebar' | 'inline' | 'banner'
  className?: string
}

export default function AdPlacement({ variant = 'inline', className = '' }: AdPlacementProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  // デスクトップ/タブレット用のインライン広告
  if (variant === 'inline') {
    return (
      <>
        {/* デスクトップ/タブレット用インライン広告 */}
        <div className={`desktop-inline-ad ${className}`}>
          <div className="ad-placeholder-inline">
            <div className="ad-label">広告</div>
            <div className="ad-content">
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-3371107571212159"
                data-ad-slot="5746847394"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          </div>
        </div>
        {/* モバイル用インライン広告 */}
        <MobileAd variant="inline" />
      </>
    )
  }

  // バナー広告（モバイルのみ）
  if (variant === 'banner') {
    return <MobileAd variant="banner" />
  }

  return null
}

