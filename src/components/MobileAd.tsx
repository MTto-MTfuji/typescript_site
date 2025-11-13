import { useEffect } from 'react'
import './MobileAd.css'

interface MobileAdProps {
  variant?: 'banner' | 'inline'
  className?: string
}

export default function MobileAd({ variant = 'banner', className = '' }: MobileAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div className={`mobile-ad-container ${variant} ${className}`}>
      <div className="mobile-ad-banner">
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
  )
}


