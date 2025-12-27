'use client'

import { useMemo, useRef, useState } from 'react'

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'

const countChars = (text) => Array.from(text).length

const buildMap = ({
  upperBase,
  lowerBase,
  digitBase,
  upperPoints,
  lowerPoints,
  digitPoints,
}) => {
  const map = {}

  if (typeof upperBase === 'number') {
    for (let i = 0; i < UPPER.length; i += 1) {
      map[UPPER[i]] = String.fromCodePoint(upperBase + i)
    }
  }

  if (typeof lowerBase === 'number') {
    for (let i = 0; i < LOWER.length; i += 1) {
      map[LOWER[i]] = String.fromCodePoint(lowerBase + i)
    }
  }

  if (typeof digitBase === 'number') {
    for (let i = 0; i < DIGITS.length; i += 1) {
      map[DIGITS[i]] = String.fromCodePoint(digitBase + i)
    }
  }

  if (upperPoints) {
    for (let i = 0; i < UPPER.length; i += 1) {
      const codePoint = upperPoints[i]
      if (typeof codePoint === 'number') {
        map[UPPER[i]] = String.fromCodePoint(codePoint)
      }
    }
  }

  if (lowerPoints) {
    for (let i = 0; i < LOWER.length; i += 1) {
      const codePoint = lowerPoints[i]
      if (typeof codePoint === 'number') {
        map[LOWER[i]] = String.fromCodePoint(codePoint)
      }
    }
  }

  if (digitPoints) {
    for (let i = 0; i < DIGITS.length; i += 1) {
      const codePoint = digitPoints[i]
      if (typeof codePoint === 'number') {
        map[DIGITS[i]] = String.fromCodePoint(codePoint)
      }
    }
  }

  return map
}

// Script (花体)
const scriptUpper = [
  0x1d49c, 0x212c, 0x1d49e, 0x1d49f, 0x2130, 0x2131, 0x1d4a2,
  0x210b, 0x2110, 0x1d4a5, 0x1d4a6, 0x2112, 0x2133, 0x1d4a9,
  0x1d4aa, 0x1d4ab, 0x1d4ac, 0x211b, 0x1d4ae, 0x1d4af,
  0x1d4b0, 0x1d4b1, 0x1d4b2, 0x1d4b3, 0x1d4b4, 0x1d4b5,
]

const scriptLower = [
  0x1d4b6, 0x1d4b7, 0x1d4b8, 0x1d4b9, 0x212f, 0x1d4bb,
  0x210a, 0x1d4bd, 0x1d4be, 0x1d4bf, 0x1d4c0, 0x1d4c1,
  0x1d4c2, 0x1d4c3, 0x2134, 0x1d4c5, 0x1d4c6, 0x1d4c7,
  0x1d4c8, 0x1d4c9, 0x1d4ca, 0x1d4cb, 0x1d4cc, 0x1d4cd,
  0x1d4ce, 0x1d4cf,
]

// Bold Script
const boldScriptUpper = [
  0x1d4d0, 0x1d4d1, 0x1d4d2, 0x1d4d3, 0x1d4d4, 0x1d4d5, 0x1d4d6,
  0x1d4d7, 0x1d4d8, 0x1d4d9, 0x1d4da, 0x1d4db, 0x1d4dc, 0x1d4dd,
  0x1d4de, 0x1d4df, 0x1d4e0, 0x1d4e1, 0x1d4e2, 0x1d4e3, 0x1d4e4,
  0x1d4e5, 0x1d4e6, 0x1d4e7, 0x1d4e8, 0x1d4e9,
]

const boldScriptLower = [
  0x1d4ea,  0x1d4eb, 0x1d4ec, 0x1d4ed, 0x1d4ee, 0x1d4ef, 0x1d4f0,
  0x1d4f1, 0x1d4f2, 0x1d4f3, 0x1d4f4, 0x1d4f5, 0x1d4f6, 0x1d4f7,
  0x1d4f8, 0x1d4f9, 0x1d4fa, 0x1d4fb, 0x1d4fc, 0x1d4fd, 0x1d4fe,
  0x1d4ff, 0x1d500, 0x1d501, 0x1d502, 0x1d503,
]

// Fraktur (哥特体)
const frakturUpper = [
  0x1d506, 0x1d507, 0x2113, 0x1d509, 0x1d50b, 0x1d50d, 0x1d50f,
  0x1d511, 0x1d513, 0x1d515, 0x1d517, 0x1d519, 0x1d51b, 0x1d51d,
  0x1d51f, 0x1d521, 0x1d523, 0x1d525, 0x1d527, 0x1d529, 0x1d52b,
  0x1d52d, 0x1d52f, 0x1d531, 0x1d533, 0x1d535,
]

const frakturLower = [
  0x1d537, 0x1d539, 0x1d53b, 0x1d53d, 0x1d53f, 0x1d541, 0x1d543,
  0x1d545, 0x1d547, 0x1d549, 0x1d54b, 0x1d54d, 0x1d54f, 0x1d551,
  0x1d553, 0x1d555, 0x1d557, 0x1d559, 0x1d55b, 0x1d55d, 0x1d55f,
  0x1d561, 0x1d563, 0x1d565, 0x1d567,
]

// Bold Fraktur
const boldFrakturUpper = [
  0x1d56c, 0x1d56d, 0x1d56e, 0x1d56f, 0x1d570, 0x1d571, 0x1d572,
  0x1d573, 0x1d574, 0x1d575, 0x1d576, 0x1d577, 0x1d578, 0x1d579,
  0x1d57a, 0x1d57b, 0x1d57c, 0x1d57d, 0x1d57e, 0x1d57f, 0x1d580,
  0x1d581, 0x1d582, 0x1d583, 0x1d584, 0x1d585,
]

// Double Struck (黑板体)
const doubleStruckUpper = [
  0x1d538, 0x1d539, 0x2102, 0x1d53b, 0x1d53c, 0x1d53d, 0x1d53e,
  0x210d, 0x1d540, 0x1d541, 0x1d542, 0x1d543, 0x1d544, 0x2115,
  0x1d546, 0x2119, 0x211a, 0x211d, 0x1d54a, 0x1d54b, 0x1d54c,
  0x1d54d, 0x1d54e, 0x1d54f, 0x1d550, 0x2124,
]

// Circled (圈圈体)
const circledDigits = [
  0x24ea, 0x2460, 0x2461, 0x2462, 0x2463,
  0x2464, 0x2465, 0x2466, 0x2467, 0x2468,
]

// Parenthesized (括号体)
const parenthesizedLowerBase = 0x249c
const parenthesizedUpper = Array.from({ length: 26 }, (_, index) =>
  parenthesizedLowerBase + index
)

// Negative Circled (反向圈圈)
const negativeCircledUpper = Array.from({ length: 26 }, (_, i) => 0x1f150 + i)
const negativeCircledLower = Array.from({ length: 26 }, (_, i) => 0x1f151 + i)

// Squared (方块体)
const squaredUpper = Array.from({ length: 26 }, (_, i) => 0x1f130 + i)
const squaredLower = Array.from({ length: 26 }, (_, i) => 0x1f150 + i)

// Mathematical Bold
const mathBoldUpper = Array.from({ length: 26 }, (_, i) => 0x1d7ca + i)
const mathBoldLower = Array.from({ length: 26 }, (_, i) => 0x1d7e2 + i)
const mathBoldDigits = Array.from({ length: 10 }, (_, i) => 0x1d7f6 + i)

// Mathematical Italic
const mathItalicUpper = scriptUpper.slice(0, 26)
const mathItalicLower = scriptLower.slice(0, 26)

// Mathematical Bold Italic
const mathBoldItalicUpper = Array.from({ length: 26 }, (_, i) => 0x1d71c + i)
const mathBoldItalicLower = Array.from({ length: 26 }, (_, i) => 0x1d736 + i)

// Sans Bold
const sansBoldUpper = [
  0x1d5bc, 0x1d5bd, 0x1d5be, 0x1d5bf, 0x1d5c0, 0x1d5c1, 0x1d5c2,
  0x1d5c3, 0x1d5c4, 0x1d5c5, 0x1d5c6, 0x1d5c7, 0x1d5c8, 0x1d5c9,
  0x1d5ca, 0x1d5cb, 0x1d5cc, 0x1d5cd, 0x1d5ce, 0x1d5cf, 0x1d5d0,
  0x1d5d1, 0x1d5d2, 0x1d5d3, 0x1d5d4, 0x1d5d5,
]
const sansBoldLower = [
  0x1d5e6, 0x1d5e7, 0x1d5e8, 0x1d5e9, 0x1d5ea, 0x1d5eb, 0x1d5ec,
  0x1d5ed, 0x1d5ee, 0x1d5ef, 0x1d5f0, 0x1d5f1, 0x1d5f2, 0x1d5f3,
  0x1d5f4, 0x1d5f5, 0x1d5f6, 0x1d5f7, 0x1d5f8, 0x1d5f9, 0x1d5fa,
  0x1d5fb, 0x1d5fc, 0x1d5fd, 0x1d5fe, 0x1d5ff,
]

// Serif Bold
const serifBoldUpper = [
  0x1d5d0, 0x1d5d1, 0x1d5d2, 0x1d5d3, 0x1d5d4, 0x1d5d5, 0x1d5d6,
  0x1d5d7, 0x1d5d8, 0x1d5d9, 0x1d5da, 0x1d5db, 0x1d5dc, 0x1d5dd,
  0x1d5de, 0x1d5df, 0x1d5e0, 0x1d5e1, 0x1d5e2, 0x1d5e3, 0x1d5e4,
  0x1d5e5, 0x1d5e6, 0x1d5e7, 0x1d5e8, 0x1d5e9,
]
const serifBoldLower = [
  0x1d5ee, 0x1d5ef, 0x1d5f0, 0x1d5f1, 0x1d5f2, 0x1d5f3, 0x1d5f4,
  0x1d5f5, 0x1d5f6, 0x1d5f7, 0x1d5f8, 0x1d5f9, 0x1d5fa, 0x1d5fb,
  0x1d5fc, 0x1d5fd, 0x1d5fe, 0x1d5ff, 0x1d600, 0x1d601, 0x1d602,
  0x1d603, 0x1d604, 0x1d605, 0x1d606, 0x1d607,
]

// 完整样式列表
const STYLES = [
  // === 基础样式 ===
  {
    id: 'bold',
    label: '𝐁𝐨𝐥𝐝',
    note: '粗体',
    color: '#ef4444',
    map: buildMap({ upperBase: 0x1d400, lowerBase: 0x1d41a, digitBase: 0x1d7ce }),
  },
  {
    id: 'italic',
    label: '𝐼𝑡𝑎𝑙𝑖𝑐',
    note: '斜体',
    color: '#f97316',
    map: buildMap({ upperBase: 0x1d434, lowerBase: 0x1d44e }),
  },
  {
    id: 'bold-italic',
    label: '𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄',
    note: '粗斜体',
    color: '#eab308',
    map: buildMap({ upperBase: 0x1d468, lowerBase: 0x1d482 }),
  },

  // === Script 花体 ===
  {
    id: 'script',
    label: '𝒮𝒸𝓇𝒾𝓅𝓉',
    note: '花体',
    color: '#22c55e',
    map: buildMap({ upperPoints: scriptUpper, lowerPoints: scriptLower }),
  },
  {
    id: 'bold-script',
    label: '𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽',
    note: '粗花体',
    color: '#14b8a6',
    map: buildMap({ upperPoints: boldScriptUpper, lowerPoints: boldScriptLower }),
  },

  // === Fraktur 哥特体 ===
  {
    id: 'fraktur',
    label: '𝔉𝔯𝔞𝔨𝔱𝔲𝔯',
    note: '哥特体',
    color: '#06b6d4',
    map: buildMap({ upperPoints: frakturUpper, lowerPoints: frakturLower }),
  },
  {
    id: 'bold-fraktur',
    label: '𝕭𝖔𝖑𝖉 𝕱𝖗𝖆𝖐𝖙𝖚𝖗',
    note: '粗哥特体',
    color: '#3b82f6',
    map: buildMap({ upperPoints: boldFrakturUpper, lowerBase: 0x1d586 }),
  },

  // === Double Struck 黑板体 ===
  {
    id: 'double-struck',
    label: '𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜',
    note: '黑板体',
    color: '#6366f1',
    map: buildMap({ upperPoints: doubleStruckUpper, lowerBase: 0x1d552, digitBase: 0x1d7d8 }),
  },

  // === Sans 无衬线 ===
  {
    id: 'sans',
    label: '𝚂𝚊𝚗𝚜',
    note: '无衬线',
    color: '#8b5cf6',
    map: buildMap({ upperBase: 0x1d5a0, lowerBase: 0x1d5ba, digitBase: 0x1d7e2 }),
  },
  {
    id: 'sans-bold',
    label: '𝗦𝗮𝗻𝘀 𝗕𝗼𝗹𝗱',
    note: '无衬线粗体',
    color: '#d946ef',
    map: buildMap({ upperPoints: sansBoldUpper, lowerPoints: sansBoldLower, digitBase: 0x1d7ec }),
  },
  {
    id: 'sans-italic',
    label: '𝘚𝘢𝘯𝘴 𝘐𝘵𝘢𝘭𝘪𝘤',
    note: '无衬线斜体',
    color: '#ec4899',
    map: buildMap({ upperBase: 0x1d608, lowerBase: 0x1d622 }),
  },
  {
    id: 'sans-bold-italic',
    label: '𝙎𝙖𝙣𝙨 𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘',
    note: '无衬线粗斜体',
    color: '#f43f5e',
    map: buildMap({ upperBase: 0x1d63c, lowerBase: 0x1d656 }),
  },

  // === Serif 衬线 ===
  {
    id: 'serif',
    label: '𝚂𝚎𝚛𝚒𝚏',
    note: '衬线体',
    color: '#64748b',
    map: buildMap({ upperBase: 0x1d5b0, lowerBase: 0x1d5ca, digitBase: 0x1d7e2 }),
  },
  {
    id: 'serif-bold',
    label: '𝐒𝐞𝐫𝐢𝐟 𝐁𝐨𝐥𝐝',
    note: '衬线粗体',
    color: '#475569',
    map: buildMap({ upperPoints: serifBoldUpper, lowerPoints: serifBoldLower, digitBase: 0x1d7ce }),
  },
  {
    id: 'serif-italic',
    label: '𝑆𝑒𝑟𝑖𝑓 𝐼𝑡𝑎𝑙𝑖𝑐',
    note: '衬线斜体',
    color: '#334155',
    map: buildMap({ upperBase: 0x1d5c4, lowerBase: 0x1d5de }),
  },
  {
    id: 'serif-bold-italic',
    label: '𝐒𝐞𝐫𝐢𝐟 𝐁𝐨𝐥𝐝 𝐈𝐭𝐚𝐥𝐢𝐜',
    note: '衬线粗斜体',
    color: '#1e293b',
    map: buildMap({ upperBase: 0x1d5f8, lowerBase: 0x1d612 }),
  },

  // === Monospace 等宽 ===
  {
    id: 'mono',
    label: '𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎',
    note: '等宽体',
    color: '#0891b2',
    map: buildMap({ upperBase: 0x1d670, lowerBase: 0x1d68a, digitBase: 0x1d7f6 }),
  },

  // === Circled 圈圈体 ===
  {
    id: 'circled',
    label: 'ⒸⒾⒸⒸⒺⒹ',
    note: '圈圈体',
    color: '#059669',
    map: buildMap({ upperBase: 0x24b6, lowerBase: 0x24d0, digitPoints: circledDigits }),
  },
  {
    id: 'circled-negative',
    label: '🅒🅘🅡🅒🅛🅔🅓',
    note: '反向圈圈',
    color: '#10b981',
    map: buildMap({ upperPoints: negativeCircledUpper, lowerPoints: negativeCircledLower }),
  },

  // === Parenthesized 括号体 ===
  {
    id: 'parenthesized',
    label: '⒫⒠⒮⒯⒲⒴⒲⒠⒟',
    note: '括号体',
    color: '#84cc16',
    map: buildMap({ upperPoints: parenthesizedUpper, lowerBase: parenthesizedLowerBase }),
  },

  // === Squared 方块体 ===
  {
    id: 'squared',
    label: '🅂🅀🅄🄰🅁🄴🄳',
    note: '方块体',
    color: '#22c55e',
    map: buildMap({ upperPoints: squaredUpper, lowerPoints: squaredLower }),
  },

  // === Fullwidth 全角体 ===
  {
    id: 'fullwidth',
    label: 'Ｆｕｌｌｗｉｄｔｈ',
    note: '全角体',
    color: '#8b5cf6',
    map: buildMap({ upperBase: 0xff21, lowerBase: 0xff41, digitBase: 0xff10 }),
  },

  // === Mathematical 数学符号 ===
  {
    id: 'math-bold',
    label: '𝐌𝐚𝐭𝐡 𝐁𝐨𝐥𝐝',
    note: '数学粗体',
    color: '#6366f1',
    map: buildMap({ upperPoints: mathBoldUpper, lowerPoints: mathBoldLower, digitPoints: mathBoldDigits }),
  },
  {
    id: 'math-italic',
    label: '𝑀𝑎𝑡ℎ 𝐼𝑡𝑎𝑙𝑖𝑐',
    note: '数学斜体',
    color: '#8b5cf6',
    map: buildMap({ upperPoints: mathItalicUpper, lowerPoints: mathItalicLower }),
  },
  {
    id: 'math-bold-italic',
    label: '𝑴𝒂𝒕𝒉 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄',
    note: '数学粗斜体',
    color: '#a855f7',
    map: buildMap({ upperPoints: mathBoldItalicUpper, lowerPoints: mathBoldItalicLower }),
  },
]

const transformText = (text, map) =>
  text
    .split('')
    .map((char) => map[char] || char)
    .join('')

const createAllText = (items) =>
  items
    .map((item) => `${item.label}\n${item.text}`)
    .join('\n\n')

export default function Home() {
  const [input, setInput] = useState('hello world')
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  const outputs = useMemo(
    () =>
      STYLES.map((style) => ({
        ...style,
        text: style.map ? transformText(input, style.map) : input,
      })),
    [input]
  )

  const showToast = (message) => {
    setToast(message)
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current)
    }
    toastTimer.current = window.setTimeout(() => {
      setToast('')
    }, 2200)
  }

  const copyText = async (text, label) => {
    if (!text) {
      showToast('请输入一些内容')
      return
    }
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      showToast(`已复制：${label}`)
    } catch (error) {
      showToast('复制失败，请手动选择')
    }
  }

  const hasInput = input.length > 0
  const inputCount = countChars(input)

  return (
    <main className="page">
      <header className="hero">
        <span className="hero-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          花体生成器
        </span>
        <h1>花体转换器</h1>
        <p className="hero-desc">输入英文、数字与符号，一键生成多种花体风格</p>
        <div className="hero-meta">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            实时预览
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            点击复制
          </span>
        </div>
      </header>

      <section className="inputCard">
        <div className="inputHeader">
          <div>
            <h2>输入文本</h2>
            <p>支持英文、数字与符号，中文保持原样。</p>
          </div>
          <span className="charCount">{inputCount} 字符</span>
        </div>
        <textarea
          className="textarea"
          value={input}
          placeholder="例如：hello world 123"
          onChange={(event) => setInput(event.target.value)}
        />
        <div className="actions">
          <button
            className="button primary"
            onClick={() => copyText(createAllText(outputs), '全部花体')}
            disabled={!hasInput}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            复制全部
          </button>
          <button
            className="button ghost"
            onClick={() => setInput('')}
            disabled={!hasInput}
          >
            清空内容
          </button>
          <button
            className="button subtle"
            onClick={() => setInput('hello world')}
          >
            恢复示例
          </button>
        </div>
      </section>

      <section className="grid">
        {outputs.map((style, index) => (
          <article
            key={style.id}
            className="card"
            style={{
              '--accent': style.color,
              '--delay': `${index * 40}ms`,
            }}
          >
            <div className="card-header">
              <div className="card-title">
                <span className="card-dot" style={{ background: style.color }} />
                <div>
                  <p className="card-name">{style.label}</p>
                  <p className="card-note">{style.note}</p>
                </div>
              </div>
              <span className="card-pill">{countChars(style.text)} 字符</span>
            </div>
            <div
              className={`card-output ${style.map ? 'fancy' : ''} ${!style.text ? 'empty' : ''}`}
              aria-live="polite"
            >
              {style.text || '在上方输入内容即可生成'}
            </div>
            <button
              className="button primary"
              onClick={() => copyText(style.text, style.label)}
              disabled={!hasInput}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              复制文本
            </button>
          </article>
        ))}
      </section>

      <footer className="footer">
        <div>
          <h3>提示</h3>
          <p>若出现方块，说明设备字体不支持这些 Unicode 花体。可尝试"全角体/圈圈体"，或在系统中安装数学字体后再预览。</p>
        </div>
        <span className="footer-made">Made with ❤️</span>
      </footer>

      {toast && (
        <div className="toast">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {toast}
        </div>
      )}
    </main>
  )
}
