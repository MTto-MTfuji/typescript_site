// コード実行用Web Worker（サンドボックス環境）
// 危険な関数を制限してコードを実行

// 危険な関数・オブジェクトのリスト
const DANGEROUS_PATTERNS = [
  'fetch',
  'XMLHttpRequest',
  'localStorage',
  'sessionStorage',
  'document',
  'window',
  'parent',
  'top',
  'frames',
  'self',
  'globalThis',
  'importScripts',
  'eval',
  'Function',
  'setTimeout',
  'setInterval',
  'WebSocket',
  'Worker',
  'SharedWorker',
  'navigator',
  'location',
  'history',
  'open',
  'close',
  'postMessage'
];

// コードを検証する関数
function validateCode(code) {
  const codeLower = code.toLowerCase();
  
  // 危険なパターンの検出
  for (const pattern of DANGEROUS_PATTERNS) {
    // より厳密な検証（文字列リテラル内を除外）
    const regex = new RegExp(`\\b${pattern}\\b`, 'i');
    if (regex.test(code) && !isInString(code, regex)) {
      throw new Error(`セキュリティ上の理由により、${pattern}の使用は許可されていません`);
    }
  }
  
  // eval, Function の直接使用を検出
  if (/eval\s*\(|new\s+Function\s*\(/i.test(code)) {
    throw new Error('eval()やFunction()の使用は許可されていません');
  }
  
  return true;
}

// 文字列リテラル内かどうかをチェック
function isInString(code, regex) {
  const match = regex.exec(code);
  if (!match) return false;
  
  const beforeMatch = code.substring(0, match.index);
  const singleQuotes = (beforeMatch.match(/'/g) || []).length;
  const doubleQuotes = (beforeMatch.match(/"/g) || []).length;
  const backticks = (beforeMatch.match(/`/g) || []).length;
  
  // エスケープされていないクォートの数が奇数の場合、文字列内
  return (singleQuotes % 2 !== 0) || (doubleQuotes % 2 !== 0) || (backticks % 2 !== 0);
}

// 安全な実行環境を作成
function createSafeContext() {
  const logs = [];
  const errors = [];
  
  // console.logとconsole.errorをオーバーライド
  const safeConsole = {
    log: (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    },
    error: (...args) => {
      errors.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    },
    warn: (...args) => {
      logs.push('警告: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    },
    info: (...args) => {
      logs.push('情報: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    }
  };
  
  // 安全なグローバルオブジェクト
  const safeGlobal = {
    console: safeConsole,
    Math: Math,
    Date: Date,
    JSON: JSON,
    Array: Array,
    Object: Object,
    String: String,
    Number: Number,
    Boolean: Boolean,
    RegExp: RegExp,
    Error: Error,
    TypeError: TypeError,
    RangeError: RangeError,
    SyntaxError: SyntaxError,
    isNaN: isNaN,
    isFinite: isFinite,
    parseInt: parseInt,
    parseFloat: parseFloat,
    encodeURI: encodeURI,
    encodeURIComponent: encodeURIComponent,
    decodeURI: decodeURI,
    decodeURIComponent: decodeURIComponent
  };
  
  return { safeGlobal, logs, errors };
}

// メッセージを受信
self.onmessage = function(e) {
  const { code, id } = e.data;
  
  try {
    // コードの検証
    validateCode(code);
    
    // 安全な実行環境を作成
    const { safeGlobal, logs, errors } = createSafeContext();
    
    // コードを関数でラップして実行
    const wrappedCode = `
      (function() {
        ${code}
      })();
    `;
    
    // 安全なコンテキストで実行
    const func = new Function(...Object.keys(safeGlobal), wrappedCode);
    const result = func(...Object.values(safeGlobal));
    
    // 結果を返す
    let output = '';
    if (logs.length > 0) {
      output += logs.join('\n') + '\n';
    }
    if (errors.length > 0) {
      output += 'エラー: ' + errors.join('\n') + '\n';
    }
    if (result !== undefined) {
      const resultStr = typeof result === 'object' 
        ? JSON.stringify(result, null, 2) 
        : String(result);
      output += resultStr;
    }
    
    self.postMessage({
      id,
      success: true,
      output: output || '(出力なし)'
    });
    
  } catch (error) {
    self.postMessage({
      id,
      success: false,
      error: error.message || '実行エラーが発生しました'
    });
  }
};



