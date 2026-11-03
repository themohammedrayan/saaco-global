import { ArrowRight, MapPin } from 'lucide-react'
import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { pillars, timeline } from '@/content/company'
import { countries, site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { Img } from '@/components/Img'
import { Icon } from '@/components/Icon'
import { CtaBand, Particulars, PartnersGrid } from '@/components/sections'
import { ButtonLink, Section, SectionTitle } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/about', t.about.title, t.about.body, '/images/hero/spice-harvest.webp')
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  const { lat, lng } = site.address.geo
  return (
    <>
      <PageBanner locale={locale} eyebrow={t.about.eyebrow} title={t.about.title} body={t.about.body} image="/images/hero/spice-harvest.webp" crumbs={[{ label: t.nav.about }]} />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-lg">
              <Img src="/images/hero/spice-harvest.webp" alt={ar ? 'مزارع التوابل في كيرالا' : 'Spice farms in Kerala'} fill sizes="(min-width:1024px) 45vw, 100vw" className="photo object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Img src="/images/plates/black-pepper.webp" alt={ar ? 'الفلفل الأسود' : 'Black pepper'} fill sizes="(min-width:1024px) 22vw, 50vw" className="photo object-cover" />
            </div>
            <div className="flex flex-col justify-center rounded-lg bg-navy-900 p-5 text-white">
              <span className="font-heading text-4xl font-black text-gold-400" dir="ltr">{site.foundedYear}</span>
              <span className="mt-1 text-sm text-white/75">{ar ? 'بداية رحلتنا في مالابار' : 'Our journey began in Malabar'}</span>
            </div>
          </div>
          <div>
            <SectionTitle kicker={t.v3.welcomeKicker} title={t.v3.welcomeTitle} className="!mb-6" />
            <p className="text-[1.05rem] leading-relaxed text-ink-2">{t.v3.welcomeBody}</p>
            <div className="mt-6 rounded-lg border-s-4 border-gold-500 bg-gold-50 p-5">
              <p className="font-heading text-sm font-extrabold uppercase text-navy-900">{t.about.mission}</p>
              <p className="mt-2 text-ink-2">{t.about.missionBody}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionTitle kicker={ar ? 'السجل' : 'Our story'} title={t.about.timeline} />
            <ol className="relative space-y-5 border-s-2 border-gold-500/50 ps-8">
              {timeline.map((s) => (
                <li key={s.year} data-reveal className="relative rounded-lg border border-line bg-white p-6 shadow-card">
                  <span aria-hidden className="absolute -start-[2.6rem] top-7 size-4 rounded-full border-4 border-mist bg-gold-500" />
                  <p className="inline-block rounded bg-navy-900 px-3 py-1 font-heading text-sm font-black text-gold-400" dir="ltr">{s.year}</p>
                  <h3 className="mt-3 font-heading text-lg font-extrabold uppercase text-navy-900">{tr(s.title, locale)}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{tr(s.body, locale)}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionTitle kicker={ar ? 'نبذة سريعة' : 'At a glance'} title={ar ? 'بيانات الشركة' : 'Company facts'} />
            <Particulars locale={locale} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle kicker={t.about.values} title={ar ? 'ما نؤمن به' : 'What we stand for'} center />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={i} data-reveal className="rounded-lg border border-line bg-white p-6 text-center shadow-card">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-gold-100 text-gold-600"><Icon name={p.icon} className="size-7" /></span>
              <h3 className="mt-5 font-heading text-base font-extrabold uppercase text-navy-900">{tr(p.title, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tr(p.body, locale)}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <SectionTitle kicker={t.v3.presenceKicker} title={t.v3.presenceTitle} lead={t.v3.presenceLead} light center />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {countries.map((c, k) => (
              <li key={c.code} data-reveal className={`rounded-lg p-5 ${k === 0 ? 'bg-gold-500 text-navy-950' : 'bg-white/5 ring-1 ring-white/15'}`}>
                <span className="font-heading text-xs font-black tracking-widest opacity-70" dir="ltr">{c.code}</span>
                <p className="mt-2 font-heading text-lg font-extrabold uppercase">{tr(c.name, locale)}</p>
                <p className={`mt-1 text-sm ${k === 0 ? 'text-navy-900/80' : 'text-white/60'}`}>{k === 0 ? t.v3.hq : `${t.v3.market} · ${tr(c.region, locale)}`}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section tone="cream">
        <SectionTitle kicker={t.v3.partnersKicker} title={t.v3.partnersTitle} center />
        <PartnersGrid />
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle kicker={t.about.whereTitle} title={ar ? 'زورونا في كيرالا' : 'Visit us in Kerala'} lead={t.about.whereBody} />
            <p className="flex gap-3 rounded-lg border border-line bg-mist p-4 text-ink-2">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden />
              <span><strong className="text-navy-900">{site.name}</strong><br />{ar ? 'المكتب الرئيسي' : 'Head office'}: {tr(site.headOffice.lines, locale)}<br />{ar ? 'الفرع' : 'Branch'}: {tr(site.address.lines, locale)}</span>
            </p>
            <ButtonLink href={href(locale, '/contact')} variant="navy" className="mt-6">{t.nav.contact} <ArrowRight className="flip-rtl size-4" /></ButtonLink>
          </div>
          <div className="overflow-hidden rounded-lg border border-line shadow-card">
            <iframe title={tr(site.address.lines, locale)} src={`https://www.google.com/maps?q=${lat},${lng}&z=10&output=embed&hl=${locale}`} className="h-96 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  )
}
