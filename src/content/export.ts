import type { L } from '@/i18n/config'
import type { IconName } from './company'

/* Buyer's guide content. Wording is intentionally general and conditional
   ("on request", "typically") — confirm details per order. TODO(verify). */

export const incoterms: { code: string; name: L; body: L }[] = [
  {
    code: 'FOB',
    name: { en: 'Free On Board', ar: 'التسليم على ظهر السفينة' },
    body: {
      en: 'We deliver the goods, export-cleared, on board the vessel at the Indian port. You arrange the main freight and insurance.',
      ar: 'نسلّم البضائع مخلّصة للتصدير على متن السفينة في الميناء الهندي، وتتولى أنت الشحن الرئيسي والتأمين.',
    },
  },
  {
    code: 'CIF',
    name: { en: 'Cost, Insurance & Freight', ar: 'التكلفة والتأمين والشحن' },
    body: {
      en: 'We arrange and pay sea freight and insurance to your destination port. Ideal if you prefer a single landed-at-port price.',
      ar: 'نرتّب الشحن البحري والتأمين وندفع تكلفتهما حتى ميناء الوصول. مناسب إذا كنت تفضّل سعرًا واحدًا حتى الميناء.',
    },
  },
  {
    code: 'CFR',
    name: { en: 'Cost & Freight', ar: 'التكلفة والشحن' },
    body: {
      en: 'As CIF, but you arrange cargo insurance yourself.',
      ar: 'مثل CIF، لكنك تتولى تأمين البضائع بنفسك.',
    },
  },
]

export const documents: { icon: IconName; name: L }[] = [
  { icon: 'file', name: { en: 'Commercial invoice', ar: 'الفاتورة التجارية' } },
  { icon: 'package', name: { en: 'Packing list', ar: 'قائمة التعبئة' } },
  { icon: 'ship', name: { en: 'Bill of lading / airway bill', ar: 'بوليصة الشحن / بوليصة الشحن الجوي' } },
  { icon: 'globe', name: { en: 'Certificate of origin', ar: 'شهادة المنشأ' } },
  { icon: 'leaf', name: { en: 'Phytosanitary certificate (where applicable)', ar: 'شهادة الصحة النباتية (عند الاقتضاء)' } },
  { icon: 'search', name: { en: 'Quality / lab analysis report (on request)', ar: 'تقرير الجودة / التحليل المخبري (عند الطلب)' } },
]

export const paymentTerms: L[] = [
  { en: 'Advance payment by bank transfer (T/T)', ar: 'دفعة مقدّمة بالتحويل البنكي (T/T)' },
  { en: 'Part advance, balance against shipping documents', ar: 'دفعة مقدّمة جزئية، والباقي مقابل وثائق الشحن' },
  { en: 'Irrevocable Letter of Credit (L/C) at sight for larger orders', ar: 'اعتماد مستندي غير قابل للإلغاء (L/C) عند الاطلاع للطلبات الكبيرة' },
]

export const shippingModes: { icon: IconName; title: L; body: L }[] = [
  {
    icon: 'ship',
    title: { en: 'Sea freight — FCL & LCL', ar: 'شحن بحري — حاوية كاملة وجزئية' },
    body: {
      en: 'Full 20′/40′ containers or consolidated part-loads from Cochin, the most economical option for regular volumes.',
      ar: 'حاويات كاملة 20 أو 40 قدمًا أو شحنات مجمّعة جزئية من كوتشين — الخيار الأكثر اقتصادًا للكميات المنتظمة.',
    },
  },
  {
    icon: 'globe',
    title: { en: 'Air freight', ar: 'شحن جوي' },
    body: {
      en: 'For samples, trial orders and time-sensitive or perishable goods via Cochin International Airport.',
      ar: 'للعينات والطلبات التجريبية والبضائع العاجلة أو سريعة التلف عبر مطار كوتشين الدولي.',
    },
  },
  {
    icon: 'tag',
    title: { en: 'Mixed containers', ar: 'حاويات مختلطة' },
    body: {
      en: 'Combine several products — for example spices, tea and coconut oil — in one shipment to reduce cost per item.',
      ar: 'اجمع عدة منتجات — مثل التوابل والشاي وزيت جوز الهند — في شحنة واحدة لتقليل التكلفة لكل منتج.',
    },
  },
]

export const qualitySteps: L[] = [
  { en: 'Lot selection at source for aroma, colour and moisture', ar: 'اختيار الدفعات من المصدر حسب الرائحة واللون والرطوبة' },
  { en: 'Cleaning, sorting and grading before packing', ar: 'التنظيف والفرز والتصنيف قبل التعبئة' },
  { en: 'Pre-shipment samples so you approve what you receive', ar: 'عينات قبل الشحن لتعتمد ما ستستلمه' },
  { en: 'Third-party inspection welcomed at your request', ar: 'نرحّب بالفحص من طرف ثالث بناءً على طلبك' },
]
