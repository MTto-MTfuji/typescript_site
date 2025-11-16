// MobileAdコンポーネントは広告削除に伴い使用されていません。
// 将来的に別用途で使う場合に備えて、ダミーコンポーネントとして残しています。
interface MobileAdProps {
  variant?: 'banner' | 'inline'
  className?: string
}

export default function MobileAd(_props: MobileAdProps) {
  return null
}