import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories } from '@/content/products'
import { markets, pillars, services, timeline } from '@/content/company'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { Img } from '@/components/Img'
import { AddToQuote } from '@/components/AddToQuote'
import { CategoryIndex, CtaBand, FaqList, Particulars, PartnersGrid, ProcessSteps } from '@/components/sections'
import { WorldMap } from '@/components/WorldMap'
import { Arrow, ButtonLink, Container, RunningHead, Seal, Section, SectionHeading } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  const locale = await getLocale(params)
  return {
    ...pageMeta(locale, '/', '', site.description),
    title: { absolute: `${site.name} — ${locale === 'ar' ? 'مصدّر توابل فاخرة من كيرالا، الهند' : 'Premium Spice Exporter from Kerala, India'}` },
  }
}

export default async function Home({ params }: PageProps<'/[locale]'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const g = t.ledger
  const spices = categories[0]

  return (
    <>
      {/* ───────────── FRONT PAGE ───────────── */}
      <section className="paper-grain border-b border-ink">
        <Container>
          <div className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-rule py-3 text-muted">
            <span>{g.meta}</span>
            <span className="hidden sm:inline">{g.place}</span>
            <span dir="ltr">{site.address.geo.lat.toFixed(4)}°N · {site.address.geo.lng.toFixed(4)}°E</span>
          </div>

          <div className="grid gap-12 pb-14 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-20">
            <div className="lg:col-span-7 lg:pt-6">
              <h1 className="font-display text-[3.4rem] leading-[0.92] tracking-[-0.02em] sm:text-8xl lg:text-[7.4rem]">
                {g.heroA}{' '}
                <em className="font-serif italic text-wax">{g.heroB}</em>{' '}
                {g.heroC}
              </h1>
              <p className="mt-10 max-w-xl font-serif text-lg leading-relaxed text-ink-2 sm:text-xl">{g.heroBody}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ButtonLink href={href(locale, '/quote')}>{t.common.requestQuote} <Arrow /></ButtonLink>
                <ButtonLink href={href(locale, '/products')} variant="line">{t.common.viewProducts}</ButtonLink>
                <a href="/catalogue/saaco-global-catalogue.pdf" download className="label ink-link ms-2 text-ink-2 hover:text-wax">
                  {t.common.downloadCatalogue} (PDF)
                </a>
              </div>
            </div>

            <figure className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden border border-ink bg-paper-2">
                <Img src="/images/hero/spice-harvest.webp" alt={g.fig1} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="plate-img object-cover" />
              </div>
              <figcaption className="label mt-3 flex justify-between gap-4 text-muted">
                <span>{g.fig1}</span><span dir="ltr">SAACO · KL</span>
              </figcaption>
              <Seal className="absolute -top-12 -start-8 hidden drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] sm:block lg:-start-14" size={140} text="SAACO GLOBAL · EXPORT HOUSE · KERALA · INDIA · " />
            </figure>
          </div>

          {/* Lot sheet: immediately actionable, reads like a trade document */}
          <div className="pb-16">
            <RunningHead no="00">{g.lotSheet}</RunningHead>
            <div className="relative mt-4">
              <table className="w-full text-start text-sm">
                <thead>
                  <tr className="label border-b border-ink text-muted">
                    {g.lotCols.map((c, k) => <th key={c} scope="col" className={`py-3 pe-4 text-start font-normal ${k === 2 || k === 3 ? 'hidden md:table-cell' : k === 4 ? 'hidden sm:table-cell' : ''}`}>{c}</th>)}
                    <th scope="col" className="py-3 text-end font-normal"><span className="sr-only">{t.products.addToQuote}</span></th>
                  </tr>
                </thead>
                <tbody>
                  {spices.items.slice(0, 5).map((i, n) => (
                    <tr key={i.id} className="ledger-row">
                      <td className="label py-4 pe-4 text-muted"><span dir="ltr">SG-{String(n + 1).padStart(3, '0')}</span></td>
                      <th scope="row" className="py-4 pe-4 text-start font-display text-xl font-normal sm:text-2xl">{tr(i.name, locale)}</th>
                      <td className="hidden py-4 pe-4 font-serif italic text-ink-2 md:table-cell"><span dir="ltr">{i.latin}</span></td>
                      <td className="hidden py-4 pe-4 text-ink-2 md:table-cell">{tr(i.forms, locale)}</td>
                      <td className="hidden py-4 pe-4 font-mono text-xs sm:table-cell"><span dir="ltr">{i.hs}</span></td>
                      <td className="py-3 text-end"><AddToQuote locale={locale} id={i.id} name={i.name.en} category={spices.name.en} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── § 01 INDEX ───────────── */}
      <Section>
        <SectionHeading no="01" kicker={g.index} title={g.indexTitle} body={t.home.productsBody} />
        <CategoryIndex locale={locale} />
        <div className="mt-10">
          <ButtonLink href={href(locale, '/products')} variant="line">{g.fullIndex} <Arrow /></ButtonLink>
        </div>
      </Section>

      {/* ───────────── § 02 THE HOUSE ───────────── */}
      <Section tone="paper-2" className="border-y border-ink">
        <SectionHeading no="02" kicker={g.house} title={t.home.farmTitle} />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden border border-ink">
              <Img src="/images/vegetables-fruits/basket.webp" alt="" fill sizes="(min-width:1024px) 35vw, 100vw" className="plate-img object-cover" />
            </div>
            <p className="label mt-3 text-muted">{locale === 'ar' ? 'شكل 2 — من مزارع موثوقة' : 'Fig. 2 — From trusted farms'}</p>
          </div>
          <div className="lg:col-span-7">
            <p data-reveal className="font-serif text-xl leading-relaxed text-ink-2 first-letter:float-start first-letter:me-3 first-letter:font-display first-letter:text-[5.5rem] first-letter:leading-[0.8] first-letter:text-wax sm:text-2xl rtl:first-letter:float-none rtl:first-letter:me-0 rtl:first-letter:text-inherit">
              {t.home.farmBody}
            </p>
            <blockquote data-reveal className="my-12 border-y border-ink py-8 font-display text-4xl leading-tight sm:text-5xl">
              {g.pull}
            </blockquote>
            <dl className="grid gap-px border border-ink bg-ink sm:grid-cols-2">
              {pillars.map((p, i) => (
                <div key={i} className="bg-paper-2 p-6">
                  <dt className="flex items-baseline gap-3">
                    <span className="label text-wax">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-2xl">{tr(p.title, locale)}</span>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-2">{tr(p.body, locale)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ───────────── § 03 PARTICULARS + SERVICES ───────────── */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <RunningHead no="03">{g.particulars}</RunningHead>
            <div className="mt-8"><Particulars locale={locale} /></div>
          </div>
          <div className="lg:col-span-6">
            <RunningHead>{t.home.servicesEyebrow}</RunningHead>
            <ol className="mt-8 border-t border-ink">
              {services.map((s, i) => (
                <li key={s.id} data-reveal className="grid grid-cols-[1fr_8rem] gap-6 border-b border-rule py-6 sm:grid-cols-[1fr_10rem]">
                  <div>
                    <p className="label text-wax">{roman(i)}</p>
                    <h3 className="mt-2 font-display text-3xl">{tr(s.title, locale)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">{tr(s.body, locale)}</p>
                  </div>
                  <div className="relative aspect-square overflow-hidden border border-ink">
                    <Img src={s.image} alt="" fill sizes="10rem" className="plate-img object-cover" />
                  </div>
                </li>
              ))}
            </ol>
            <ButtonLink href={href(locale, '/services')} variant="line" className="mt-8">{t.nav.services} <Arrow /></ButtonLink>
          </div>
        </div>
      </Section>

      {/* ───────────── § 04 TERMS ───────────── */}
      <Section tone="night">
        <SectionHeading no="04" kicker={g.terms} title={t.home.processTitle} light>
          <ButtonLink href={href(locale, '/export')} variant="line-light" className="mt-2">{t.nav.export} <Arrow /></ButtonLink>
        </SectionHeading>
        <ProcessSteps locale={locale} light />
      </Section>

      {/* ───────────── § 05 ROUTES ───────────── */}
      <Section className="border-b border-ink">
        <SectionHeading no="05" kicker={g.routes} title={t.home.marketsTitle} body={g.routesNote} />
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8"><WorldMap locale={locale} /></div>
          <ol className="border-t border-ink lg:col-span-4">
            <li className="flex items-baseline justify-between border-b border-rule py-3">
              <span className="font-display text-xl text-wax">{locale === 'ar' ? 'كوتشين، كيرالا' : 'Cochin, Kerala'}</span>
              <span className="label text-muted">{locale === 'ar' ? 'المنشأ' : 'Origin'}</span>
            </li>
            {markets.map((m, i) => (
              <li key={m.id} className="flex items-baseline justify-between border-b border-rule py-3">
                <span className="flex items-baseline gap-3">
                  <span className="label text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl">{tr(m.name, locale)}</span>
                </span>
                <span className="label text-muted" dir="ltr">{Math.abs(m.lat).toFixed(0)}°{m.lat >= 0 ? 'N' : 'S'} {Math.abs(m.lon).toFixed(0)}°{m.lon >= 0 ? 'E' : 'W'}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ───────────── § 06 CORRESPONDENTS ───────────── */}
      <Section>
        <SectionHeading no="06" kicker={g.correspondents} title={t.home.partnersTitle} />
        <PartnersGrid />
      </Section>

      {/* ───────────── § 07 CHRONICLE ───────────── */}
      <Section tone="paper-2" className="border-y border-ink">
        <SectionHeading no="07" kicker={g.chronicle} title={t.home.storyTitle} body={t.home.storyBody}>
          <ButtonLink href={href(locale, '/about')} variant="line" className="mt-6">{t.common.learnMore} <Arrow /></ButtonLink>
        </SectionHeading>
        <ol className="grid border-t border-ink md:grid-cols-3">
          {timeline.map((s) => (
            <li key={s.year} data-reveal className="border-b border-rule py-8 md:border-b-0 md:border-e md:px-8 md:first:ps-0 md:last:border-e-0">
              <p className="font-display text-7xl leading-none text-wax sm:text-8xl" dir="ltr">{s.year}</p>
              <h3 className="mt-6 font-display text-2xl">{tr(s.title, locale)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{tr(s.body, locale)}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ───────────── § 08 ENQUIRIES ───────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <RunningHead no="08">{g.enquiries}</RunningHead>
            <h2 className="mt-8 font-display text-5xl leading-[1.02] sm:text-6xl">{t.faq.title}</h2>
            <p className="mt-6 font-serif text-lg text-ink-2">{t.faq.body}</p>
            <ButtonLink href={href(locale, '/faq')} variant="line" className="mt-8">{t.nav.faq} <Arrow /></ButtonLink>
          </div>
          <div className="lg:col-span-8"><FaqList locale={locale} limit={5} /></div>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  )
}

function roman(i: number) {
  return ['I', 'II', 'III', 'IV', 'V'][i] ?? String(i + 1)
}
