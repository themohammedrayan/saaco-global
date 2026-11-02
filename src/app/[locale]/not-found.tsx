import Link from 'next/link'
import { buttonClass } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-forest-900 px-4 pt-24 text-center text-white">
      <div>
        <p className="font-display text-7xl text-gold-300">404</p>
        <h1 className="mt-4 font-display text-3xl">Page not found · الصفحة غير موجودة</h1>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/en" className={buttonClass('primary')}>Home</Link>
          <Link href="/ar" className={buttonClass('ghost-light')}>الرئيسية</Link>
        </div>
      </div>
    </section>
  )
}
