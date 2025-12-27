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

const doubleStruckUpper = [
  0x1d538, 0x1d539, 0x2102, 0x1d53b, 0x1d53c, 0x1d53d, 0x1d53e,
  0x210d, 0x1d540, 0x1d541, 0x1d542, 0x1d543, 0x1d544, 0x2115,
  0x1d546, 0x2119, 0x211a, 0x211d, 0x1d54a, 0x1d54b, 0x1d54c,
  0x1d54d, 0x1d54e, 0x1d54f, 0x1d550, 0x2124,
]

const STYLES = [
  {
    id: 'bold',
    label: 'Bold 粗体',
    note: '强对比',
    color: '#3b73ff',
    map: buildMap({
      upperBase: 0x1d400,
      lowerBase: 0x1d41a,
      digitBase: 0x1d7ce,
    }),
  },
  {
    id: 'italic',
    label: 'Italic 斜体',
    note: '轻盈',
    color: '#6b5cff',
    map: buildMap({
      upperBase: 0x1d434,
      lowerBase: 0x1d44e,
    }),
  },
  {
    id: 'bold-italic',
    label: 'Bold Italic 粗斜体',
    note: '动感',
    color: '#7b61ff',
    map: buildMap({
      upperBase: 0x1d468,
      lowerBase: 0x1d482,
    }),
  },
  {
    id: 'script',
    label: 'Script 花体',
    note: '手写感',
    color: '#ff7a8a',
    map: buildMap({
      upperPoints: scriptUpper,
      lowerPoints: scriptLower,
    }),
  },
  {
    id: 'double-struck',
    label: 'Double Struck 黑板体',
    note: '复古',
    color: '#ff8a3d',
    map: buildMap({
      upperPoints: doubleStruckUpper,
      lowerBase: 0x1d552,
      digitBase: 0x1d7d8,
    }),
  },
  {
    id: 'sans',
    label: 'Sans 简洁体',
    note: '现代',
    color: '#22b3a6',
    map: buildMap({
      upperBase: 0x1d5a0,
      lowerBase: 0x1d5ba,
      digitBase: 0x1d7e2,
    }),
  },
  {
    id: 'sans-bold',
    label: 'Sans Bold 纯净粗体',
    note: '干净',
    color: '#2fcb7c',
    map: buildMap({
      upperBase: 0x1d5d4,
      lowerBase: 0x1d5ee,
      digitBase: 0x1d7ec,
    }),
  },
  {
    id: 'mono',
    label: 'Monospace 等宽体',
    note: '科技感',
    color: '#2f9bff',
    map: buildMap({
      upperBase: 0x1d670,
      lowerBase: 0x1d68a,
      digitBase: 0x1d7f6,
    }),
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
        text: transformText(input, style.map),
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
        <span className="badge">✨ 花体生成器</span>
        <h1>花体英文转换器</h1>
        <p>
          把普通英文一键变成多种花体、黑板体、等宽体，适合社媒昵称、
          个人主页和海报排版。
        </p>
        <div className="heroHint">
          <span>实时预览</span>
          <span>•</span>
          <span>点击即可复制</span>
        </div>
      </header>

      <section className="inputCard">
        <div className="inputHeader">
          <div>
            <h2>输入文本</h2>
            <p>支持英文、数字与符号，中文会保持原样。</p>
          </div>
          <span className="count">{inputCount} 字符</span>
        </div>
        <textarea
          className="textarea"
          value={input}
          placeholder="例如：hello world"
          onChange={(event) => setInput(event.target.value)}
        />
        <div className="actions">
          <button
            className="button primary"
            onClick={() => copyText(createAllText(outputs), '全部花体')}
            disabled={!hasInput}
          >
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
              '--delay': `${index * 60}ms`,
            }}
          >
            <div className="cardHeader">
              <div className="cardTitle">
                <span className="dot" />
                <div>
                  <p className="title">{style.label}</p>
                  <p className="subtitle">{style.note}</p>
                </div>
              </div>
              <span className="pill">{countChars(style.text)} 字符</span>
            </div>
            <div className="output" aria-live="polite">
              {style.text || '在上方输入内容即可生成'}
            </div>
            <button
              className="button primary block"
              onClick={() => copyText(style.text, style.label)}
              disabled={!hasInput}
            >
              复制文本
            </button>
          </article>
        ))}
      </section>

      <footer className="footer">
        <div>
          <h3>提示</h3>
          <p>
            部分花体字符属于 Unicode 特殊字符，在旧系统或旧字体中可能不
            显示。发布前建议在目标平台预览。
          </p>
        </div>
        <div className="footerTag">Made for Vercel</div>
      </footer>

      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  )
}
