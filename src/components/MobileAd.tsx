import { useEffect, useRef } from 'react'
import './MobileAd.css'

interface MobileAdProps {
  variant?: 'banner' | 'inline'
  className?: string
}

export default function MobileAd({ variant = 'banner', className = '' }: MobileAdProps) {
  const adInitialized = useRef(false)

  useEffect(() => {
    if (adInitialized.current) return
    adInitialized.current = true

    try {
      // AdSenseスクリプトが読み込まれるまで待ってから初期化
      const initAd = () => {
        try {
          if (typeof window !== 'undefined') {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({})
          }
        } catch (err) {
          console.error('AdSense error:', err)
        }
      }

      // スクリプトが既に読み込まれているか確認
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        // 少し待ってから初期化（DOM要素が確実に存在するように）
        setTimeout(initAd, 100)
      } else {
        // スクリプトの読み込みを待つ
        const checkAdSense = setInterval(() => {
          if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
            clearInterval(checkAdSense)
            setTimeout(initAd, 100)
          }
        }, 100)

        // 10秒後にタイムアウト
        setTimeout(() => clearInterval(checkAdSense), 10000)
      }
    } catch (err) {
      console.error('AdSense initialization error:', err)
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


