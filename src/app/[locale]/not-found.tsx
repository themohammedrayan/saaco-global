import Link from 'next/link'
import { buttonClass } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center bg-mist px-4 py-20 text-center">
      <div>
        <p className="font-heading text-8xl font-black text-gold-500">404</p>
        <h1 className="mt-4 font-heading text-2xl font-extrabold uppercase text-navy-900">Page not found · الصفحة غير موجودة</h1>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/en" className={buttonClass('gold')}>Home</Link>
          <Link href="/ar" className={buttonClass('outline')}>الرئيسية</Link>
        </div>
      </div>
    </section>
  )
}
