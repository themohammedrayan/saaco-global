import { ArrowRight, Check, Download } from 'lucide-react'
import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories } from '@/content/products'
import { markets, pillars, services, timeline } from '@/content/company'
import { site } from '@/content/site'
import { pageMeta } from '@/lib/seo'
import { Icon } from '@/components/Icon'
import { Img } from '@/components/Img'
import { CategoryCard, CtaBand, FaqList, PartnersMarquee, ProcessSteps, StatsBand } from '@/components/sections'
import { WorldMap } from '@/components/WorldMap'
import { ButtonLink, Container, Section, SectionHeading } from '@/components/ui'
import { getLocale } from '@/lib/locale'

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
  const [lead, ...rest] = categories

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-950 pb-16 pt-32 text-white sm:items-center sm:pb-24">
        <Img src="/images/hero/spice-harvest.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/95 via-forest-950/75 to-forest-950/20 rtl:bg-gradient-to-l" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-forest-950/80 to-transparent" />
        <Container>
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
              <span className="size-1.5 rounded-full bg-saffron-400" aria-hidden /> {t.home.eyebrow}
            </p>
            <h1 className="font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">{t.home.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{t.home.heroBody}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={href(locale, '/quote')} className="px-7 py-3.5 text-base">
                {t.common.requestQuote} <ArrowRight className="flip-rtl size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href={href(locale, '/products')} variant="ghost-light" className="px-7 py-3.5 text-base">{t.common.viewProducts}</ButtonLink>
              <a href="/catalogue/saaco-global-catalogue.pdf" download className="inline-flex items-center gap-2 px-3 py-3.5 text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
                <Download className="size-4" aria-hidden /> {t.common.downloadCatalogue}
              </a>
            </div>
            <ul className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/85 sm:flex sm:flex-wrap sm:gap-x-8">
              {t.home.trust.map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="size-4 text-saffron-400" aria-hidden />{x}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* OUR FARM */}
      <Section tone="cream">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="relative">
            <div className="grid grid-cols-5 grid-rows-6 gap-4" style={{ aspectRatio: '1 / 1' }}>
              <div className="relative col-span-3 row-span-4 overflow-hidden rounded-3xl">
                <Img src="/images/tea-coffee/tea-leaves.webp" alt={locale === 'ar' ? 'أوراق الشاي من مرتفعات كيرالا' : 'Tea from the Kerala highlands'} fill sizes="(min-width:1024px) 30vw, 60vw" className="object-cover" />
              </div>
              <div className="relative col-span-2 row-span-3 overflow-hidden rounded-3xl">
                <Img src="/images/vegetables-fruits/coconut.webp" alt={locale === 'ar' ? 'جوز الهند الطازج' : 'Fresh coconuts'} fill sizes="(min-width:1024px) 20vw, 40vw" className="object-cover" />
              </div>
              <div className="relative col-span-2 row-span-3 overflow-hidden rounded-3xl">
                <Img src="/images/vegetables-fruits/basket.webp" alt={locale === 'ar' ? 'سلة خضروات طازجة' : 'Basket of fresh vegetables'} fill sizes="(min-width:1024px) 20vw, 40vw" className="object-cover" />
              </div>
              <div className="col-span-3 row-span-2 flex flex-col justify-center rounded-3xl bg-forest-800 p-6 text-white">
                <p className="font-display text-4xl text-gold-300" dir="ltr">{site.foundedYear}</p>
                <p className="mt-1 text-sm text-white/75">{locale === 'ar' ? 'نعمل مع مزارعي مالابار' : 'Working with Malabar farmers since'}</p>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={t.home.farmEyebrow} title={t.home.farmTitle} body={t.home.farmBody} />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <li key={i} data-reveal className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-100 text-forest-800"><Icon name={p.icon} className="size-6" /></span>
                  <div>
                    <h3 className="font-semibold text-forest-900">{tr(p.title, locale)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{tr(p.body, locale)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section tone="sand">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.home.productsEyebrow} title={t.home.productsTitle} body={t.home.productsBody} />
          <ButtonLink href={href(locale, '/products')} variant="outline" className="shrink-0">
            {t.common.allProducts} <ArrowRight className="flip-rtl size-4" aria-hidden />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <CategoryCard c={lead} locale={locale} large />
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.slice(0, 2).map((c) => <CategoryCard key={c.slug} c={c} locale={locale} />)}
            {rest.slice(2, 4).map((c) => <CategoryCard key={c.slug} c={c} locale={locale} />)}
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {rest.slice(4).map((c) => <CategoryCard key={c.slug} c={c} locale={locale} />)}
        </div>
      </Section>

      <StatsBand locale={locale} />

      {/* SERVICES */}
      <Section tone="cream">
        <SectionHeading eyebrow={t.home.servicesEyebrow} title={t.home.servicesTitle} center />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.id} data-reveal className="group overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow hover:shadow-xl hover:shadow-forest-900/5">
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Img src={s.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-7">
                <span className="-mt-14 mb-5 grid size-14 place-items-center rounded-2xl bg-saffron-500 text-forest-950 shadow-lg ring-4 ring-white relative"><Icon name={s.icon} className="size-6" /></span>
                <h3 className="font-display text-2xl text-forest-900">{tr(s.title, locale)}</h3>
                <p className="mt-3 leading-relaxed text-muted">{tr(s.body, locale)}</p>
                <ButtonLink href={href(locale, '/quote')} variant="outline" className="mt-6 px-5 py-2.5">{t.common.requestQuote}</ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section tone="white">
        <SectionHeading eyebrow={t.home.processEyebrow} title={t.home.processTitle} center className="mb-14" />
        <ProcessSteps locale={locale} />
        <div className="mt-12 text-center">
          <ButtonLink href={href(locale, '/export')} variant="outline">{t.nav.export} <ArrowRight className="flip-rtl size-4" aria-hidden /></ButtonLink>
        </div>
      </Section>

      {/* MARKETS */}
      <section className="relative overflow-hidden bg-forest-950 py-20 text-white sm:py-28">
        <div aria-hidden className="grain absolute inset-0" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <SectionHeading light eyebrow={t.home.marketsEyebrow} title={t.home.marketsTitle} body={t.home.marketsBody} />
              <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
                {markets.map((m) => (
                  <li key={m.id} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                    <span className="size-2 rounded-full bg-gold-300" aria-hidden />{tr(m.name, locale)}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal><WorldMap locale={locale} /></div>
          </div>
        </Container>
      </section>

      {/* PARTNERS */}
      <section className="bg-cream py-20">
        <Container>
          <SectionHeading eyebrow={t.home.partnersEyebrow} title={t.home.partnersTitle} center className="mb-12" />
        </Container>
        <PartnersMarquee />
      </section>

      {/* STORY */}
      <Section tone="sand">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t.home.storyEyebrow} title={t.home.storyTitle} body={t.home.storyBody} />
            <ButtonLink href={href(locale, '/about')} variant="outline" className="mt-8">{t.common.learnMore} <ArrowRight className="flip-rtl size-4" aria-hidden /></ButtonLink>
          </div>
          <ol className="relative space-y-8 border-s-2 border-saffron-400/50 ps-8">
            {timeline.map((s) => (
              <li key={s.year} data-reveal className="relative">
                <span aria-hidden className="absolute -start-[2.6rem] top-1 size-4 rounded-full border-4 border-sand bg-saffron-500" />
                <p className="font-display text-2xl text-saffron-600" dir="ltr">{s.year}</p>
                <h3 className="mt-1 font-semibold text-forest-900">{tr(s.title, locale)}</h3>
                <p className="mt-2 leading-relaxed text-muted">{tr(s.body, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* FAQ preview */}
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} body={t.faq.body} />
            <ButtonLink href={href(locale, '/faq')} variant="outline" className="mt-8">{t.nav.faq} <ArrowRight className="flip-rtl size-4" aria-hidden /></ButtonLink>
          </div>
          <FaqList locale={locale} limit={4} />
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  )
}
