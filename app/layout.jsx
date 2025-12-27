import './globals.css'
import {
  DM_Sans,
  Playfair_Display,
  Noto_Sans_SC,
  Noto_Serif_SC,
  ZCOOL_XiaoWei,
  ZCOOL_QingKe_HuangYou,
  Ma_Shan_Zheng,
  Zhi_Mang_Xing,
} from 'next/font/google'

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

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cn-sans',
  display: 'swap',
})

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cn-serif',
  display: 'swap',
})

const zcoolXiaoWei = ZCOOL_XiaoWei({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cn-kai',
  display: 'swap',
})

const zcoolQingKe = ZCOOL_QingKe_HuangYou({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cn-round',
  display: 'swap',
})

const maShanZheng = Ma_Shan_Zheng({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cn-brush',
  display: 'swap',
})

const zhiMangXing = Zhi_Mang_Xing({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cn-cursive',
  display: 'swap',
})

export const metadata = {
  title: '花体转换器',
  description: '输入英文、数字与符号，一键生成多种 Unicode 字体风格。中文保持原样。',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="zh-CN"
      className={`${dmSans.variable} ${playfair.variable} ${notoSansSC.variable} ${notoSerifSC.variable} ${zcoolXiaoWei.variable} ${zcoolQingKe.variable} ${maShanZheng.variable} ${zhiMangXing.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
