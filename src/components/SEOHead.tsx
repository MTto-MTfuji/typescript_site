import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonical?: string
  jsonLd?: object
}

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonical,
  jsonLd
}: SEOHeadProps) {
  const location = useLocation()
  const baseUrl = 'https://a-blue-three.vercel.app' // TODO: 実際のドメインに変更
  const fullUrl = `${baseUrl}${location.pathname}`
  const defaultTitle = 'TypeScript道場 - JavaScriptとTypeScriptを体系的に学べる学習サイト'
  const defaultDescription = 'JavaScriptとTypeScriptを基礎から実践的なフレームワークまで体系的に学べる学習サイト。初心者から上級者まで対応。'
  const defaultOgImage = `${baseUrl}/og-image.png` // TODO: 実際のOGP画像パスに変更

  const pageTitle = title ? `${title} | TypeScript道場` : defaultTitle
  const pageDescription = description || defaultDescription
  const pageOgImage = ogImage || defaultOgImage
  const canonicalUrl = canonical || fullUrl

  useEffect(() => {
    // ページタイトルの設定
    document.title = pageTitle

    // メタディスクリプションの更新
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', pageDescription)

    // キーワードの更新
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', keywords)
    }

    // OGPタグの更新
    const updateOrCreateMeta = (property: string, content: string, isProperty = true) => {
      const attr = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attr}="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, property)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    updateOrCreateMeta('og:title', pageTitle)
    updateOrCreateMeta('og:description', pageDescription)
    updateOrCreateMeta('og:url', fullUrl)
    updateOrCreateMeta('og:type', ogType)
    updateOrCreateMeta('og:image', pageOgImage)
    updateOrCreateMeta('og:site_name', 'TypeScript道場')
    updateOrCreateMeta('og:locale', 'ja_JP')

    // Twitter Cardタグの更新
    updateOrCreateMeta('twitter:card', 'summary_large_image', false)
    updateOrCreateMeta('twitter:title', pageTitle, false)
    updateOrCreateMeta('twitter:description', pageDescription, false)
    updateOrCreateMeta('twitter:image', pageOgImage, false)

    // Canonical URLの設定
    let linkCanonical = document.querySelector('link[rel="canonical"]')
    if (!linkCanonical) {
      linkCanonical = document.createElement('link')
      linkCanonical.setAttribute('rel', 'canonical')
      document.head.appendChild(linkCanonical)
    }
    linkCanonical.setAttribute('href', canonicalUrl)

    // JSON-LDの追加
    if (jsonLd) {
      let scriptJsonLd = document.querySelector('script[type="application/ld+json"]')
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script')
        scriptJsonLd.setAttribute('type', 'application/ld+json')
        document.head.appendChild(scriptJsonLd)
      }
      scriptJsonLd.textContent = JSON.stringify(jsonLd)
    }
  }, [pageTitle, pageDescription, keywords, fullUrl, pageOgImage, ogType, canonicalUrl, jsonLd])

  return null
}
