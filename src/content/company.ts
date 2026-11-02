import type { L } from '@/i18n/config'

export type IconName =
  | 'sprout' | 'truck' | 'package' | 'award' | 'leaf' | 'users' | 'shield' | 'globe'
  | 'message' | 'flask' | 'file' | 'ship' | 'tag' | 'clock' | 'search' | 'handshake'

export const services: { id: string; icon: IconName; image: string; title: L; body: L; points: L[] }[] = [
  {
    id: 'production',
    icon: 'sprout',
    image: '/images/services/production.webp',
    title: { en: 'Production & Sourcing', ar: 'الإنتاج والتوريد' },
    body: {
      en: 'We work directly with growers across Kerala and South India, so we know where every lot comes from. Produce is cleaned, sorted and graded to your specification before it is packed.',
      ar: 'نعمل مباشرةً مع المزارعين في كيرالا وجنوب الهند، فنعرف مصدر كل دفعة. تُنظّف المنتجات وتُفرز وتُصنّف وفق مواصفاتك قبل تعبئتها.',
    },
    points: [
      { en: 'Farm-direct, traceable sourcing', ar: 'توريد مباشر من المزارع قابل للتتبّع' },
      { en: 'Cleaning, sorting and grading', ar: 'تنظيف وفرز وتصنيف' },
      { en: 'Lot selection to buyer specification', ar: 'اختيار الدفعات وفق مواصفات المشتري' },
    ],
  },
  {
    id: 'packaging',
    icon: 'package',
    image: '/images/services/packaging.webp',
    title: { en: 'Packaging & Private Label', ar: 'التغليف والعلامة الخاصة' },
    body: {
      en: 'From 25–50 kg export sacks to retail-ready pouches carrying your brand, we pack to protect aroma and freshness and to meet the labelling rules of your destination market.',
      ar: 'من أكياس تصدير بوزن 25–50 كغ إلى عبوات تجزئة جاهزة تحمل علامتك، نعبّئ للحفاظ على الرائحة والنضارة وللالتزام بقواعد الملصقات في سوقك.',
    },
    points: [
      { en: 'Bulk, food-service and retail packs', ar: 'عبوات بالجملة وللمطاعم وللتجزئة' },
      { en: 'Private label & custom artwork', ar: 'علامة خاصة وتصاميم مخصّصة' },
      { en: 'Export-grade cartons and palletising', ar: 'كراتين بمواصفات التصدير وتحميل على منصّات' },
    ],
  },
  {
    id: 'delivery',
    icon: 'truck',
    image: '/images/services/delivery.webp',
    title: { en: 'Logistics & Delivery', ar: 'الخدمات اللوجستية والتسليم' },
    body: {
      en: 'We coordinate inland transport, export documentation and booking with freight partners, and keep you updated from packing to departure — by sea or air.',
      ar: 'ننسّق النقل الداخلي ووثائق التصدير والحجز مع شركاء الشحن، ونطلعك على كل مرحلة من التعبئة حتى المغادرة — بحرًا أو جوًا.',
    },
    points: [
      { en: 'FOB and CIF quotations', ar: 'عروض أسعار FOB و CIF' },
      { en: 'Sea (FCL / LCL) and air freight', ar: 'شحن بحري (حاوية كاملة / جزئية) وجوي' },
      { en: 'Shipment updates on WhatsApp & email', ar: 'تحديثات الشحنة عبر واتساب والبريد الإلكتروني' },
    ],
  },
]

export const pillars: { icon: IconName; title: L; body: L }[] = [
  {
    icon: 'award',
    title: { en: 'Premium quality', ar: 'جودة فاخرة' },
    body: { en: 'Lots selected for aroma, colour and freshness — never mixed down.', ar: 'دفعات مختارة لرائحتها ولونها ونضارتها — دون خلطها بدرجات أدنى.' },
  },
  {
    icon: 'leaf',
    title: { en: 'Natural & responsibly farmed', ar: 'طبيعية ومزروعة بمسؤولية' },
    body: { en: 'Produce from growers who follow natural, ethical farming practices.', ar: 'منتجات من مزارعين يتّبعون ممارسات زراعية طبيعية وأخلاقية.' },
  },
  {
    icon: 'users',
    title: { en: 'Farm-direct sourcing', ar: 'توريد مباشر من المزارع' },
    body: { en: 'Close relationships with Kerala farmers mean traceability and fair prices.', ar: 'علاقات وثيقة مع مزارعي كيرالا تعني قابلية التتبّع وأسعارًا عادلة.' },
  },
  {
    icon: 'message',
    title: { en: 'Responsive service', ar: 'خدمة سريعة الاستجابة' },
    body: { en: 'One point of contact on WhatsApp and email, replying within 24 hours.', ar: 'جهة تواصل واحدة عبر واتساب والبريد الإلكتروني، مع رد خلال 24 ساعة.' },
  },
]

export const process: { icon: IconName; title: L; body: L }[] = [
  {
    icon: 'message',
    title: { en: 'Enquiry', ar: 'الاستفسار' },
    body: { en: 'Send your products, volumes and destination. We reply within 24 hours.', ar: 'أرسل المنتجات والكميات ووجهة الشحن. نردّ خلال 24 ساعة.' },
  },
  {
    icon: 'flask',
    title: { en: 'Quote & samples', ar: 'عرض السعر والعينات' },
    body: { en: 'You receive a quotation (FOB / CIF) and samples to approve quality.', ar: 'تتلقى عرض سعر (FOB / CIF) وعينات لاعتماد الجودة.' },
  },
  {
    icon: 'file',
    title: { en: 'Order & documents', ar: 'الطلب والوثائق' },
    body: { en: 'We confirm specs, packaging and terms, and prepare export paperwork.', ar: 'نؤكد المواصفات والتغليف والشروط، ونجهّز وثائق التصدير.' },
  },
  {
    icon: 'package',
    title: { en: 'Packing', ar: 'التعبئة' },
    body: { en: 'Goods are graded, packed and labelled for your market.', ar: 'تُصنّف البضائع وتُعبّأ وتُوسم وفق متطلبات سوقك.' },
  },
  {
    icon: 'ship',
    title: { en: 'Shipping', ar: 'الشحن' },
    body: { en: 'Dispatched by sea or air with tracking details shared with you.', ar: 'تُشحن بحرًا أو جوًا مع مشاركة تفاصيل التتبّع معك.' },
  },
]

export const timeline: { year: string; title: L; body: L }[] = [
  {
    year: '2010',
    title: { en: 'Rooted in Kerala', ar: 'الجذور في كيرالا' },
    body: {
      en: 'Our journey began in Perinthalmanna, in the heart of Malabar — a region whose spices have travelled the world for centuries — working closely with local farmers and traders.',
      ar: 'بدأت رحلتنا في بيرينتالمانا، في قلب منطقة مالابار — التي جابت توابلها العالم منذ قرون — بالعمل عن قرب مع المزارعين والتجّار المحليين.',
    },
  },
  {
    year: '2018',
    title: { en: 'Premium spices & organic produce', ar: 'توابل فاخرة ومنتجات عضوية' },
    body: {
      en: 'We embraced our passion for premium spices and naturally grown produce, building a range of spices, vegetables and fruits sourced from trusted farms and committed to ethical farming practices.',
      ar: 'احتضنّا شغفنا بالتوابل الفاخرة والمنتجات المزروعة طبيعيًا، فبنينا تشكيلة من التوابل والخضروات والفواكه من مزارع موثوقة ملتزمة بممارسات زراعية أخلاقية.',
    },
  },
  {
    year: '2026',
    title: { en: 'Your gateway to global markets', ar: 'بوابتك إلى الأسواق العالمية' },
    body: {
      en: 'SAACO Global now brings seven product categories to importers worldwide — expanding our offering, refining our production and packaging, and making premium Kerala produce accessible to every market.',
      ar: 'تقدّم ساكو جلوبال اليوم سبع فئات من المنتجات للمستوردين حول العالم — مع توسيع تشكيلتنا، وتطوير الإنتاج والتغليف، وإتاحة منتجات كيرالا الفاخرة لكل سوق.',
    },
  },
]

/** Logos shown in the "Companies we work with" section of the original site. */
export const partners: { name: string; logo: string; url?: string }[] = [
  { name: 'VIRA Coffee', logo: '/images/partners/vira-coffee.webp', url: 'https://www.viracoffee.com' },
  { name: 'VIRAZ', logo: '/images/partners/viraz.webp' },
  { name: 'REVA Perfume', logo: '/images/partners/reva-perfume.webp' },
  { name: 'SATS', logo: '/images/partners/sats.webp' },
  { name: 'Ghadeer', logo: '/images/partners/ghadeer.webp' },
  { name: 'Rami', logo: '/images/partners/rami.webp' },
  { name: 'Rita', logo: '/images/partners/rita.webp' },
  { name: 'SAACO IT & Security', logo: '/images/partners/saaco-it-security.webp' },
]

/** Regions shown on the markets map. Described as regions we ship to on request — not a client list. */
export const markets: { id: string; name: L; lon: number; lat: number }[] = [
  { id: 'gcc', name: { en: 'GCC & Middle East', ar: 'الخليج والشرق الأوسط' }, lon: 55.3, lat: 25.2 },
  { id: 'europe', name: { en: 'Europe & UK', ar: 'أوروبا والمملكة المتحدة' }, lon: 4.5, lat: 51.9 },
  { id: 'asia', name: { en: 'South-East & East Asia', ar: 'جنوب شرق وشرق آسيا' }, lon: 103.8, lat: 1.35 },
  { id: 'africa', name: { en: 'Africa', ar: 'أفريقيا' }, lon: 39.3, lat: -6.8 },
  { id: 'americas', name: { en: 'North America', ar: 'أمريكا الشمالية' }, lon: -74, lat: 40.7 },
  { id: 'oceania', name: { en: 'Australia & NZ', ar: 'أستراليا ونيوزيلندا' }, lon: 151.2, lat: -33.9 },
]
export const originPoint = { lon: 76.23, lat: 10.98 }
