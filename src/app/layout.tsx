import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
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
        <header className='flex h-16 bg-yellow-300 px-4'>
            {/* cuando toco el formulario, va a redirigir  mi carpeta items, el contenido en el input search, y lo va agregar a los queries params (esto seria mas eficiente si se hiciera con el client side navigation de next pero asi es mas sencillo); en un challenge real seria mejor hacer que el formulario sea un client component, y despues uso el prevent default usando el router de  next.js pára hacer un soft transition*/}
          <form action="/items" className='m-auto flex max-w-screen-xl flex-1 gap-4'>
            <input type="text" name="search" className='h-8 flex-1 px-2 text-white'/>
            <button className='bg-gray-200 px-2 py-1 text-slate-700'>Buscar</button>
          </form>
        </header>
        <main className='max-w-screen-xl p-4'>{children}</main>
      </body>
    </html>
  )
}
