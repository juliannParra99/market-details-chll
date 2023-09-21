import './globals.css'
import type { Metadata } from 'next'
import Link from "next/link";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Market Price',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <header className='flex h-16  bg-blue-300  '>
          <form action="/items" className='px-4 flex max-w-screen-lg flex-1 m-auto gap-4 items-center'>
            <Link href="/" className="text-yellow-900">Market Price</Link>
            <input type="text" name="search" className='h-8 flex-1 px-2 text-white'/>
            <button className='bg-gray-200 px-2 py-1 text-slate-700'>Buscar</button>
          </form>
        </header>
        <main className='max-w-screen-lg p-4 m-auto'>{children}</main>
      </body>
    </html>
  )
}
