import { useEffect, useRef } from 'react'
import './MobileAd.css'

interface MobileAdProps {
  variant?: 'banner' | 'inline'
  className?: string
}

export default function MobileAd({ variant = 'banner', className = '' }: MobileAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adInitialized = useRef(false)

  useEffect(() => {
    if (adInitialized.current) return

    const initAd = () => {
      if (!adRef.current) return
      
      try {
        // この広告ユニット内の<ins>タグを探す
        const insElement = adRef.current.querySelector('.adsbygoogle') as HTMLElement
        if (insElement && !insElement.getAttribute('data-adsbygoogle-status')) {
          // AdSenseがまだ初期化されていない場合のみ初期化
          if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
            try {
              // @ts-ignore
              (window.adsbygoogle = window.adsbygoogle || []).push({})
              adInitialized.current = true
            } catch (err) {
              console.error('AdSense error:', err)
            }
          }
        }
      } catch (err) {
        console.error('AdSense initialization error:', err)
      }
    }

    // AdSenseスクリプトが読み込まれるまで待つ
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      setTimeout(initAd, 200)
    } else {
      const checkAdSense = setInterval(() => {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          clearInterval(checkAdSense)
          setTimeout(initAd, 200)
        }
      }, 100)
      setTimeout(() => clearInterval(checkAdSense), 10000)
    }
  }, [])

  return (
    <div className={`mobile-ad-container ${variant} ${className}`} ref={adRef}>
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


