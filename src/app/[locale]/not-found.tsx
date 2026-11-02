import Link from 'next/link'
import { buttonClass } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="paper-grain grid min-h-[70vh] place-items-center bg-paper px-5 text-center">
      <div>
        <p className="label text-muted">Error · خطأ</p>
        <p className="mt-4 font-display text-[9rem] leading-none text-wax">404</p>
        <h1 className="mt-4 font-display text-3xl">Page not found · الصفحة غير موجودة</h1>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/en" className={buttonClass('ink')}>Home</Link>
          <Link href="/ar" className={buttonClass('line')}>الرئيسية</Link>
        </div>
      </div>
    </section>
  )
}
