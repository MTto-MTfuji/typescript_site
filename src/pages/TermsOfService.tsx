import { Link } from 'react-router-dom'
import './TermsOfService.css'

export default function TermsOfService() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>利用規約</h1>
        <p className="last-updated">最終更新日: {new Date().toLocaleDateString('ja-JP')}</p>

        <section>
          <h2>1. はじめに</h2>
          <p>
            本利用規約（以下「本規約」）は、当サイトの利用条件を定めるものです。
            本サイトを利用することにより、本規約に同意したものとみなされます。
          </p>
        </section>

        <section>
          <h2>2. サービスの内容</h2>
          <p>
            本サイトは、JavaScriptとTypeScriptの学習を支援するための
            教育用Webアプリケーションです。
          </p>
        </section>

        <section>
          <h2>3. 利用条件</h2>
          <h3>3.1 利用資格</h3>
          <ul>
            <li>13歳以上であること</li>
            <li>本規約に同意すること</li>
          </ul>

          <h3>3.2 禁止行為</h3>
          <p>以下の行為を禁止します：</p>
          <ul>
            <li>悪意のあるコードの実行（コード実行機能の悪用）</li>
            <li>システムへの不正アクセス</li>
            <li>他のユーザーへの迷惑行為</li>
            <li>著作権を侵害する行為</li>
            <li>その他、法令に違反する行為</li>
          </ul>
        </section>

        <section>
          <h2>4. 免責事項</h2>
          <p>
            <strong>本サイトは「現状のまま」提供され、以下の事項について
            一切の保証をいたしません：</strong>
          </p>
          <ul>
            <li>サービスの完全性、正確性、有用性</li>
            <li>サービスの中断、停止、エラー、データの消失</li>
            <li>本サイトの利用により生じた損害</li>
          </ul>
          <div className="warning-box">
            <strong>⚠️ 重要な注意事項</strong>
            <p>
              本サイトは学習目的で作成されており、本番環境での使用を想定していません。
              重要なデータの保存や、本番環境での使用は自己責任で行ってください。
            </p>
            <p>
              認証システムはクライアントサイドのみで実装されており、
              セキュリティ上の制限があります。
            </p>
          </div>
        </section>

        <section>
          <h2>5. 知的財産権</h2>
          <p>
            本サイトのコンテンツ（テキスト、コード、デザインなど）の著作権は
            当サイト運営者に帰属します。ただし、学習目的での使用は自由です。
          </p>
        </section>

        <section>
          <h2>6. データの取り扱い</h2>
          <p>
            データの取り扱いについては、<Link to="/privacy-policy">プライバシーポリシー</Link>
            を参照してください。
          </p>
        </section>

        <section>
          <h2>7. サービスの変更・終了</h2>
          <p>
            当サイトは、予告なくサービスの内容を変更または終了する場合があります。
            これにより生じた損害について、当サイトは一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2>8. 規約の変更</h2>
          <p>
            本規約は、予告なく変更される場合があります。
            変更後も本サイトを利用する場合、変更された規約に同意したものとみなされます。
          </p>
        </section>

        <section>
          <h2>9. 準拠法</h2>
          <p>
            本規約は、日本の法律に準拠します。
            本規約に関する紛争については、当サイト運営者の所在地を管轄する
            裁判所を専属的合意管轄とします。
          </p>
        </section>

        <div className="terms-footer">
          <Link to="/privacy-policy" className="terms-link">プライバシーポリシーを読む</Link>
          <Link to="/" className="terms-link">ホームに戻る</Link>
        </div>
      </div>
    </div>
  )
}

