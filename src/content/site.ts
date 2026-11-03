import type { L } from '@/i18n/config'

/**
 * Company facts. Everything a buyer may rely on lives here so it can be
 * corrected in one place. Items marked TODO(verify) are sensible defaults
 * that the business owner must confirm before launch (see README).
 */
export const site = {
  name: 'SAACO Global',
  legalName: 'SAACO Global', // TODO(verify): registered legal entity name
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://saacoglobal.com').replace(/\/$/, ''),
  foundedYear: 2010,
  tagline: {
    en: 'Premium spices & natural produce from Kerala, India — exported worldwide.',
    ar: 'توابل فاخرة ومنتجات طبيعية من كيرالا، الهند — نصدّرها إلى العالم.',
  } satisfies L,
  description: {
    en: 'SAACO Global is a Kerala-based exporter of premium spices — cardamom, black pepper, cinnamon and clove — plus tea & coffee, honey, coconut oil, fresh produce, grains and natural cosmetics. Farm-direct sourcing, export-ready packaging and responsive service for importers worldwide.',
    ar: 'ساكو جلوبال شركة تصدير مقرّها كيرالا، الهند، متخصصة في التوابل الفاخرة — الهيل والفلفل الأسود والقرفة والقرنفل — إضافةً إلى الشاي والقهوة والعسل وزيت جوز الهند والخضروات الطازجة والحبوب ومستحضرات التجميل الطبيعية. توريد مباشر من المزارع، وتغليف جاهز للتصدير، وخدمة سريعة للمستوردين حول العالم.',
  } satisfies L,
  contact: {
    phone: '+91 75920 30338',
    phoneE164: '+917592030338',
    whatsapp: '917592030338',
    email: 'sales@saacoglobal.com',
    hours: { en: 'Mon–Sat, 9:00–18:00 IST', ar: 'الاثنين–السبت، 9:00–18:00 بتوقيت الهند' } satisfies L,
    responseTime: { en: 'We reply to every enquiry within 24 hours.', ar: 'نردّ على كل استفسار خلال 24 ساعة.' } satisfies L,
    timeZone: 'Asia/Kolkata',
  },
  /** Registered head office. */
  headOffice: {
    locality: 'Calicut',
    district: 'Kozhikode',
    region: 'Kerala',
    postalCode: '673008',
    street: 'Velliparamba',
    country: 'India',
    countryCode: 'IN',
    lines: {
      en: 'Velliparamba, Calicut, Kerala 673008, India',
      ar: 'فيليبارامبا، كاليكوت، كيرالا 673008، الهند',
    } satisfies L,
  },
  /** Branch office (Perinthalmanna). Geo point is used for the map embeds. */
  address: {
    locality: 'Perinthalmanna',
    district: 'Malappuram',
    region: 'Kerala',
    postalCode: '679325',
    country: 'India',
    countryCode: 'IN',
    lines: {
      en: 'Perinthalmanna, Malappuram, Kerala 679325, India',
      ar: 'بيرينتالمانا، مالابورام، كيرالا 679325، الهند',
    } satisfies L,
    geo: { lat: 10.9760357, lng: 76.2254431 },
  },
  // TODO(verify): nearest export gateways used for FOB/CIF quotes
  port: { en: 'Cochin (Kochi) Port, India', ar: 'ميناء كوتشين (كوتشي)، الهند' } satisfies L,
  airport: { en: 'Cochin International Airport (COK)', ar: 'مطار كوتشين الدولي (COK)' } satisfies L,
  /** Add real profile URLs to show social icons in the footer. Empty = hidden. */
  social: {
    linkedin: '',
    instagram: '',
    facebook: '',
  },
  /**
   * Certifications / registrations (e.g. IEC, FSSAI, APEDA, Spices Board CRES).
   * Left empty on purpose: never display a credential the company does not hold.
   * Each entry renders as a badge in the trust section once filled in.
   */
  certifications: [] as { name: string; number?: string }[],
}

/** Countries shown in the centre of the footer bar. Order as given by the business. */
export const countries: { code: string; name: L; region: L }[] = [
  { code: 'IN', name: { en: 'India', ar: 'الهند' }, region: { en: 'Kerala · Head office', ar: 'كيرالا · المقر الرئيسي' } },
  { code: 'BH', name: { en: 'Bahrain', ar: 'البحرين' }, region: { en: 'GCC', ar: 'دول الخليج' } },
  { code: 'LK', name: { en: 'Sri Lanka', ar: 'سريلانكا' }, region: { en: 'South Asia', ar: 'جنوب آسيا' } },
  { code: 'SA', name: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' }, region: { en: 'GCC', ar: 'دول الخليج' } },
  { code: 'AE', name: { en: 'UAE', ar: 'الإمارات' }, region: { en: 'GCC', ar: 'دول الخليج' } },
]

export const stats: { value: string; label: L }[] = [
  { value: '7', label: { en: 'Product categories', ar: 'فئات منتجات' } },
  { value: String(site.foundedYear), label: { en: 'Roots in Kerala since', ar: 'جذورنا في كيرالا منذ' } },
  { value: '100%', label: { en: 'Kerala-sourced spices', ar: 'توابل من مصادر كيرالا' } },
  { value: '24h', label: { en: 'Enquiry response time', ar: 'زمن الرد على الاستفسارات' } },
]

export const waLink = (text?: string) =>
  `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
