import { Link } from 'react-router-dom'
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">
        <h1>プライバシーポリシー</h1>
        <p className="last-updated">最終更新日: {new Date().toLocaleDateString('ja-JP')}</p>

        <section>
          <h2>1. はじめに</h2>
          <p>
            本プライバシーポリシーは、当サイト（以下「本サイト」）が収集・利用する
            個人情報の取り扱いについて説明するものです。
          </p>
        </section>

        <section>
          <h2>2. 収集する情報</h2>
          <h3>2.1 ユーザーが提供する情報</h3>
          <ul>
            <li><strong>アカウント情報</strong>: ユーザー名、パスワード（ハッシュ化して保存）</li>
            <li><strong>学習データ</strong>: 学習進捗、ノート、練習問題の結果、ブックマーク</li>
          </ul>

          <h3>2.2 自動的に収集される情報</h3>
          <ul>
            <li><strong>セッション情報</strong>: 訪問したページ、滞在時間（10秒以上）</li>
            <li><strong>技術情報</strong>: ブラウザの種類、デバイス情報（localStorageの容量制限により）</li>
          </ul>
        </section>

        <section>
          <h2>3. データの保存方法と場所</h2>
          <p>
            すべてのデータは<strong>ブラウザのlocalStorage</strong>に保存されます。
            データはサーバーに送信されず、ユーザーのデバイス上のみに保存されます。
          </p>
          <div className="warning-box">
            <strong>⚠️ 重要な注意事項</strong>
            <ul>
              <li>ブラウザのデータを削除すると、すべてのデータが失われます</li>
              <li>別のデバイスやブラウザではデータにアクセスできません</li>
              <li>定期的にエクスポート機能を使用してバックアップを取ることをお勧めします</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>4. データの使用目的</h2>
          <p>収集したデータは以下の目的でのみ使用されます：</p>
          <ul>
            <li>ユーザー認証とアカウント管理</li>
            <li>学習進捗の追跡と表示</li>
            <li>ダッシュボードでの統計情報の表示</li>
            <li>サービスの改善（匿名化された統計データのみ）</li>
          </ul>
        </section>

        <section>
          <h2>5. データの共有と開示</h2>
          <p>
            <strong>当サイトは、ユーザーのデータを第三者と共有しません。</strong>
          </p>
          <p>データは以下の場合を除き、開示されません：</p>
          <ul>
            <li>法的要求がある場合</li>
            <li>ユーザーの明示的な同意がある場合</li>
          </ul>
        </section>

        <section>
          <h2>6. データの保存期間</h2>
          <p>
            データは、ユーザーがアカウントを削除するか、ブラウザのデータを削除するまで
            保存されます。アカウント削除機能は現在実装されていませんが、
            ブラウザの設定からlocalStorageを削除することで、すべてのデータを削除できます。
          </p>
        </section>

        <section>
          <h2>7. ユーザーの権利</h2>
          <p>ユーザーは以下の権利を有します：</p>
          <ul>
            <li><strong>アクセス権</strong>: 保存されているデータの確認（エクスポート機能を使用）</li>
            <li><strong>訂正権</strong>: データの修正（各機能から直接編集可能）</li>
            <li><strong>削除権</strong>: データの削除（ブラウザの設定からlocalStorageを削除、または<Link to="/account-settings">アカウント設定</Link>から削除）</li>
            <li><strong>データポータビリティ</strong>: データのエクスポート（<Link to="/export-import">エクスポート機能</Link>を使用）</li>
          </ul>
        </section>

        <section>
          <h2>8. セキュリティ対策</h2>
          <p>データの保護のために以下の対策を実施しています：</p>
          <ul>
            <li>パスワードのハッシュ化（bcrypt）</li>
            <li>HTTPS通信の使用（本番環境）</li>
            <li>XSS対策（Content Security Policyの設定）</li>
            <li>コード実行のサンドボックス化（Web Worker）</li>
          </ul>
          <div className="warning-box">
            <strong>⚠️ セキュリティに関する注意</strong>
            <p>
              本サイトは学習目的で作成されており、認証システムはクライアントサイドのみで
              実装されています。重要なデータを保存する場合は、自己責任でご利用ください。
            </p>
          </div>
        </section>

        <section>
          <h2>9. クッキー（Cookie）の使用</h2>
          <p>
            本サイトは現在、Cookieを使用していません。
            すべてのデータはlocalStorageに保存されます。
          </p>
        </section>

        <section>
          <h2>10. 第三者サービス</h2>
          <h3>10.1 外部リソース</h3>
          <ul>
            <li><strong>SQL.js</strong>: ローカルにバンドルされています（学習機能のため）</li>
          </ul>
          <p>
            これらのサービスは、本サイトの機能を提供するために必要です。
            これらのサービスのプライバシーポリシーについては、各サービスの
            公式サイトを参照してください。
          </p>
        </section>

        <section>
          <h2>11. お子様のプライバシー</h2>
          <p>
            本サイトは13歳未満の子供を対象としていません。
            13歳未満の子供の個人情報を意図的に収集することはありません。
          </p>
        </section>

        <section>
          <h2>12. プライバシーポリシーの変更</h2>
          <p>
            本プライバシーポリシーは、予告なく変更される場合があります。
            重要な変更がある場合は、本サイト上で通知します。
            変更後も本サイトを利用する場合、変更されたプライバシーポリシーに
            同意したものとみなされます。
          </p>
        </section>

        <section>
          <h2>13. お問い合わせ</h2>
          <p>
            プライバシーポリシーに関するご質問やご意見がございましたら、
            以下の方法でお問い合わせください：
          </p>
          <ul>
            <li>GitHubリポジトリのIssues（公開されている場合）</li>
          </ul>
        </section>

        <section>
          <h2>14. 適用される法律</h2>
          <p>
            本プライバシーポリシーは、日本の法律に準拠します。
            EU圏内のユーザーについては、GDPR（EU一般データ保護規則）の
            原則に従ってデータを処理します。
          </p>
        </section>

        <div className="policy-footer">
          <Link to="/terms" className="policy-link">利用規約を読む</Link>
          <Link to="/" className="policy-link">ホームに戻る</Link>
        </div>
      </div>
    </div>
  )
}

