import {Inter} from 'next/font/google'
import localFont from "next/font/local"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
export const Pretendard = localFont({
    src: "../../public/font/PretendardVariable.woff2"
})

export const metadata = {
    title: 'CCA - Chest Check AI',
    description: 'Made by TEAM 나홀로마이스터',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={Pretendard.className}>
    {children}
    </body>
    </html>
  )
}
