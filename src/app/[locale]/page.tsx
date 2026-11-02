import { ArrowRight, Download, MapPin } from 'lucide-react'
import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories, findItem } from '@/content/products'
import { markets } from '@/content/company'
import { documents, qualitySteps } from '@/content/export'
import { countries, site, waLink } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { Img } from '@/components/Img'
import { Icon, WhatsAppIcon } from '@/components/Icon'
import { HeroSlider } from '@/components/HeroSlider'
import { WorldMap } from '@/components/WorldMap'
import { CategoryTile, Checklist, CtaBand, FaqList, PartnersStrip, ProcessSteps, ProductCard } from '@/components/sections'
import { ButtonLink, Container, Kicker, Section, SectionTitle } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  const locale = await getLocale(params)
  return {
    ...pageMeta(locale, '/', '', site.description),
    title: { absolute: `${site.name} — ${locale === 'ar' ? 'مصدّر توابل فاخرة من كيرالا، الهند' : 'Premium Spice Exporter from Kerala, India'}` },
  }
}

const FEATURED = ['green-cardamom', 'black-pepper', 'cinnamon', 'clove', 'turmeric', 'black-tea', 'natural-honey', 'coconut-oil']
const SLIDE_IMAGES = ['/images/plates/mixed.webp', '/images/tea-coffee/cover.webp', '/images/honey-coconut-oil/duo.webp']
const TRUST_ICONS = ['sprout', 'package', 'ship', 'clock'] as const
const WHY_ICONS = ['award', 'package', 'search', 'truck'] as const

export default async function Home({ params }: PageProps<'/[locale]'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const v = t.v3
  const ar = locale === 'ar'
  const featured = FEATURED.map((id) => findItem(id)!).filter(Boolean)

  return (
    <>
      {/* 1 · HERO */}
      <HeroSlider
        slides={v.slides.map((s, k) => ({ ...s, image: SLIDE_IMAGES[k] }))}
        labels={{ prev: ar ? 'السابق' : 'Previous slide', next: ar ? 'التالي' : 'Next slide', goto: ar ? 'الشريحة' : 'Go to slide' }}
        actions={
          <>
            <ButtonLink href={href(locale, '/quote')}>{t.common.requestQuote} <ArrowRight className="flip-rtl size-4" /></ButtonLink>
            <ButtonLink href={href(locale, '/products')} variant="light">{v.viewAll}</ButtonLink>
          </>
        }
      />
      <div className="relative z-10 -mt-20 pb-4">
        <Container>
          <ul className="grid grid-cols-2 overflow-hidden rounded-lg bg-white shadow-lift lg:grid-cols-4">
            {v.trust.map((x, k) => (
              <li key={k} className="flex items-center gap-3 border-line p-4 sm:p-6 [&:not(:last-child)]:border-e max-lg:[&:nth-child(2)]:border-e-0 max-lg:[&:nth-child(-n+2)]:border-b">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-navy-800 text-gold-400"><Icon name={TRUST_ICONS[k]} className="size-5" /></span>
                <span>
                  <span className="block font-heading text-sm font-extrabold uppercase leading-tight text-navy-900">{x.t}</span>
                  <span className="mt-0.5 block text-xs text-muted sm:text-sm">{x.b}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* 2 · WELCOME */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal className="relative grid grid-cols-6 grid-rows-6 gap-3" style={{ aspectRatio: '1 / 0.9' }}>
            <div className="relative col-span-4 row-span-4 overflow-hidden rounded-lg">
              <Img src="/images/hero/spice-harvest.webp" alt={ar ? 'حصاد التوابل في كيرالا' : 'Spice harvest in Kerala'} fill sizes="(min-width:1024px) 33vw, 66vw" className="photo object-cover" />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-lg">
              <Img src="/images/plates/cardamom.webp" alt={ar ? 'الهيل الأخضر' : 'Green cardamom'} fill sizes="(min-width:1024px) 16vw, 33vw" className="photo object-cover" />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-lg">
              <Img src="/images/plates/delivery.webp" alt={ar ? 'توابل جاهزة للشحن' : 'Spices ready for dispatch'} fill sizes="(min-width:1024px) 16vw, 33vw" className="photo object-cover" />
            </div>
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg">
              <Img src="/images/tea-coffee/tea-leaves.webp" alt={ar ? 'أوراق الشاي' : 'Tea leaves'} fill sizes="(min-width:1024px) 16vw, 33vw" className="photo object-cover" />
            </div>
            <div className="col-span-2 row-span-2 flex flex-col justify-center rounded-lg bg-navy-900 p-4 text-white">
              <span className="font-heading text-3xl font-black text-gold-400 sm:text-4xl" dir="ltr">{site.foundedYear}</span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/75 sm:text-sm">{ar ? 'جذورنا في كيرالا' : 'Rooted in Kerala'}</span>
            </div>
          </div>
          <div>
            <SectionTitle kicker={v.welcomeKicker} title={v.welcomeTitle} className="!mb-6" />
            <p data-reveal className="text-[1.05rem] leading-relaxed text-ink-2">{v.welcomeBody}</p>
            <ul className="mt-8 space-y-5">
              {v.proof.map((p, k) => (
                <li key={k} data-reveal className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-md bg-gold-100 text-gold-600"><Icon name={k === 0 ? 'award' : 'globe'} className="size-6" /></span>
                  <span>
                    <span className="block font-heading font-extrabold uppercase text-navy-900">{p.t}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{p.b}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={href(locale, '/about')} variant="navy">{t.common.learnMore} <ArrowRight className="flip-rtl size-4" /></ButtonLink>
              <a href="/catalogue/saaco-global-catalogue.pdf" download className="inline-flex items-center gap-2 rounded-md border-2 border-navy-800 px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy-800 hover:bg-navy-800 hover:text-white">
                <Download className="size-4" aria-hidden /> {t.common.downloadCatalogue}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* 3 · CATEGORIES */}
      <Section tone="mist">
        <SectionTitle kicker={v.catKicker} title={v.catTitle} lead={v.catLead} center />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-5">
          {categories.map((c) => <CategoryTile key={c.slug} c={c} locale={locale} />)}
          <a href={href(locale, '/quote')} className="flex flex-col justify-between rounded-lg bg-navy-900 p-5 text-white shadow-card hover:bg-navy-800">
            <span className="font-heading text-lg font-black uppercase leading-tight">{ar ? 'لم تجد ما تبحث عنه؟' : 'Need something else?'}</span>
            <span className="mt-3 text-sm text-white/75">{ar ? 'أخبرنا بالمنتج والكمية وسنوفّره لك.' : 'Tell us the product and volume — we will source it.'}</span>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase text-gold-400">{t.common.requestQuote} <ArrowRight className="flip-rtl size-4" /></span>
          </a>
        </div>
      </Section>

      {/* 4 · FEATURED PRODUCTS */}
      <Section>
        <SectionTitle
          kicker={v.featKicker}
          title={v.featTitle}
          lead={v.featLead}
          action={<ButtonLink href={href(locale, '/products')} variant="outline">{v.viewAll} <ArrowRight className="flip-rtl size-4" /></ButtonLink>}
        />
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} c={p.category} i={p} locale={locale} className="w-[78%] shrink-0 snap-start sm:w-auto" />
          ))}
        </div>
      </Section>

      {/* 5 · PRIVATE LABEL */}
      <Section tone="cream">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle kicker={v.brandKicker} title={v.brandTitle} lead={v.brandLead} />
            <div className="grid gap-4 sm:grid-cols-2">
              {v.brandCards.map((b, k) => (
                <div key={k} data-reveal className="rounded-lg border border-line bg-white p-6 shadow-card">
                  <span className="grid size-12 place-items-center rounded-md bg-navy-800 text-gold-400"><Icon name={k === 0 ? 'tag' : 'package'} className="size-6" /></span>
                  <h3 className="mt-4 font-heading text-base font-extrabold uppercase text-navy-900">{b.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{b.b}</p>
                </div>
              ))}
            </div>
            <ButtonLink href={href(locale, '/services')} variant="navy" className="mt-8">{t.nav.services} <ArrowRight className="flip-rtl size-4" /></ButtonLink>
          </div>
          <div data-reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lift">
              <Img src="/images/honey-coconut-oil/duo.webp" alt={ar ? 'منتجات معبّأة' : 'Packed products'} fill sizes="(min-width:1024px) 45vw, 100vw" className="photo object-cover" />
            </div>
            <div className="absolute -bottom-6 start-6 hidden rounded-lg bg-gold-500 p-5 text-navy-950 shadow-lift sm:block">
              <p className="font-heading text-2xl font-black uppercase leading-none">{ar ? 'عبوات مخصّصة' : 'Custom packs'}</p>
              <p className="mt-1 text-sm font-semibold">{ar ? 'جملة · تجزئة · علامة خاصة' : 'Bulk · Retail · Private label'}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 6 · WHY SAACO */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
        <Img src="/images/plates/global-banner.webp" alt="" fill sizes="100vw" className="photo -z-20 object-cover opacity-15" />
        <Container>
          <SectionTitle kicker={v.whyKicker} title={v.whyTitle} center light />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {v.why.map((w, k) => (
              <div key={k} data-reveal className="rounded-lg bg-gradient-to-b from-gold-600 to-[#8a6312] p-6 shadow-lift">
                <span className="grid size-12 place-items-center rounded-md bg-navy-950/30 text-white"><Icon name={WHY_ICONS[k]} className="size-6" /></span>
                <h3 className="mt-5 font-heading text-lg font-extrabold uppercase leading-tight">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{w.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7 · WORKFLOW */}
      <Section>
        <SectionTitle
          kicker={v.deliverKicker}
          title={v.deliverTitle}
          lead={v.deliverLead}
          action={<ButtonLink href={href(locale, '/export')} variant="outline">{t.nav.export} <ArrowRight className="flip-rtl size-4" /></ButtonLink>}
        />
        <ProcessSteps locale={locale} />
      </Section>

      {/* 8 · GLOBAL PRESENCE */}
      <Section tone="mist">
        <SectionTitle kicker={v.presenceKicker} title={v.presenceTitle} lead={v.presenceLead} center />
        <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr]">
          <div data-reveal className="rounded-lg border border-line bg-white p-4 shadow-card sm:p-6"><WorldMap locale={locale} /></div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {countries.map((c, k) => (
              <li key={c.code} data-reveal className={`flex items-center gap-4 rounded-lg border p-4 shadow-card ${k === 0 ? 'border-navy-800 bg-navy-900 text-white' : 'border-line bg-white'}`}>
                <span className={`grid size-11 shrink-0 place-items-center rounded-md font-heading text-sm font-black ${k === 0 ? 'bg-gold-500 text-navy-950' : 'bg-navy-100 text-navy-800'}`} dir="ltr">{c.code}</span>
                <span className="flex-1">
                  <span className={`block font-heading font-extrabold uppercase ${k === 0 ? 'text-white' : 'text-navy-900'}`}>{tr(c.name, locale)}</span>
                  <span className={`block text-sm ${k === 0 ? 'text-white/70' : 'text-muted'}`}>{k === 0 ? `${v.hq} · ${site.address.locality}, ${ar ? 'كيرالا' : 'Kerala'}` : `${v.market} · ${tr(c.region, locale)}`}</span>
                </span>
                {k === 0 && <MapPin className="size-5 text-gold-400" aria-hidden />}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          {ar ? 'نقدّم عروض أسعار أيضًا لـ: ' : 'We also quote for: '}
          {markets.map((m) => tr(m.name, locale)).join(' · ')}
        </p>
      </Section>

      {/* 9 · QUALITY */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionTitle kicker={v.qualityKicker} title={v.qualityTitle} lead={v.qualityLead} />
            <div className="flex items-start gap-4 rounded-lg border border-dashed border-gold-500 bg-gold-50 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-gold-500 text-navy-950"><Icon name="shield" className="size-6" /></span>
              <div>
                {site.certifications.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {site.certifications.map((c) => <li key={c.name} className="rounded bg-white px-3 py-1.5 text-sm font-bold text-navy-900">{c.name}{c.number ? ` · ${c.number}` : ''}</li>)}
                  </ul>
                ) : (
                  <p className="font-semibold text-navy-900">{v.certNote}</p>
                )}
                <a href={waLink(ar ? 'مرحبًا، أودّ الاطلاع على تسجيلات وشهادات الشركة.' : 'Hello, I would like to see your registrations and certificates.')} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-gold-600 hover:underline">
                  {ar ? 'اطلبها عبر واتساب' : 'Request via WhatsApp'} <ArrowRight className="flip-rtl size-3.5" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div data-reveal className="rounded-lg border border-line bg-white p-6 shadow-card">
              <h3 className="mb-4 font-heading text-base font-extrabold uppercase text-navy-900">{v.qualitySteps}</h3>
              <Checklist items={qualitySteps.map((q) => tr(q, locale))} />
            </div>
            <div data-reveal className="rounded-lg bg-navy-900 p-6 text-white shadow-card">
              <h3 className="mb-4 font-heading text-base font-extrabold uppercase">{v.qualityDocs}</h3>
              <Checklist light items={documents.map((d) => tr(d.name, locale))} />
            </div>
          </div>
        </div>
      </Section>

      {/* 10 · PARTNERS */}
      <section className="border-y border-line bg-cream py-14">
        <Container><SectionTitle kicker={v.partnersKicker} title={v.partnersTitle} center className="!mb-8" /></Container>
        <PartnersStrip />
      </section>

      {/* 11 · FAQ + ASK */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionTitle kicker={v.faqKicker} title={t.faq.title} />
            <FaqList locale={locale} limit={4} />
            <ButtonLink href={href(locale, '/faq')} variant="outline" className="mt-6">{t.nav.faq} <ArrowRight className="flip-rtl size-4" /></ButtonLink>
          </div>
          <aside data-reveal className="relative isolate self-start overflow-hidden rounded-lg bg-navy-900 p-8 text-white shadow-lift">
            <Img src="/images/plates/cardamom-pepper.webp" alt="" fill sizes="(min-width:1024px) 30vw, 100vw" className="photo -z-20 object-cover opacity-25" />
            <Kicker light>{v.faqKicker}</Kicker>
            <h3 className="font-heading text-2xl font-black uppercase leading-tight">{v.askTitle}</h3>
            <p className="mt-3 text-white/80">{v.askBody}</p>
            <div className="mt-7 flex flex-col gap-3">
              <ButtonLink href={waLink()} external variant="whatsapp"><WhatsAppIcon className="size-4" /> {t.common.whatsappUs}</ButtonLink>
              <ButtonLink href={href(locale, '/quote')}>{t.common.requestQuote}</ButtonLink>
              <a href={`mailto:${site.contact.email}`} className="text-center text-sm font-semibold text-white/80 hover:text-gold-400">{site.contact.email}</a>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  )
}
