import './globals.css'
import { DM_Sans, Playfair_Display } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata = {
  title: '花体英文转换器',
  description: '输入普通文本，一键生成多种花体英文风格并复制。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
