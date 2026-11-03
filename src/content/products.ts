import type { L } from '@/i18n/config'

export type ProductItem = {
  id: string
  name: L
  /** Indicative HS code to help importers with customs classification. */
  hs: string
  forms: L
  /** Botanical name. */
  latin?: string
  /** Primary product photo. */
  image: string
}

export type SpecRow = { label: L; value: L }

export type Category = {
  slug: string
  name: L
  short: L
  intro: L
  cover: string
  gallery: { src: string; alt: L }[]
  items: ProductItem[]
  specs: SpecRow[]
  featured?: boolean
}

/* Shared spec values. Statements are deliberately conservative: anything
   that depends on a specific order is "on request". TODO(verify) all. */
const onRequest: L = { en: 'Discussed per order', ar: 'يُحدَّد حسب الطلب' }
const origin: L = { en: 'Kerala, India', ar: 'كيرالا، الهند' }
const originIndia: L = { en: 'India', ar: 'الهند' }
const sampleYes: L = {
  en: 'Available for serious buyers — ask with your enquiry',
  ar: 'متوفرة للمشترين الجادّين — اطلبها مع استفسارك',
}

const spec = (en: string, ar: string): L => ({ en, ar })

export const categories: Category[] = [
  {
    slug: 'spices',
    featured: true,
    name: { en: 'Spices', ar: 'التوابل' },
    short: {
      en: 'Cardamom, black pepper, cinnamon, clove and blends from the Malabar coast.',
      ar: 'الهيل والفلفل الأسود والقرفة والقرنفل والخلطات من ساحل مالابار.',
    },
    intro: {
      en: 'Kerala’s Malabar coast has traded spices with the world for centuries. We source cardamom, black pepper, cinnamon, clove and turmeric directly from growers in the region, clean and grade them, and pack them to your specification — whole, crushed or ground. Every lot is selected for aroma, colour and freshness, so the flavour your customers expect arrives intact.',
      ar: 'تاجر ساحل مالابار في كيرالا بالتوابل مع العالم منذ قرون. نوفّر الهيل والفلفل الأسود والقرفة والقرنفل والكركم مباشرةً من مزارعي المنطقة، وننظّفها ونفرزها ونعبّئها وفق مواصفاتك — كاملة أو مجروشة أو مطحونة. نختار كل دفعة لرائحتها ولونها ونضارتها، لتصل النكهة التي يتوقعها عملاؤك كما هي.',
    },
    cover: '/images/plates/mixed.webp',
    gallery: [
      { src: '/images/plates/cardamom.webp', alt: { en: 'Green cardamom pods', ar: 'قرون الهيل الأخضر' } },
      { src: '/images/plates/black-pepper.webp', alt: { en: 'Black pepper', ar: 'الفلفل الأسود' } },
      { src: '/images/plates/cinnamon.webp', alt: { en: 'Cinnamon sticks', ar: 'أعواد القرفة' } },
      { src: '/images/plates/clove.webp', alt: { en: 'Whole cloves', ar: 'القرنفل الكامل' } },
      { src: '/images/plates/cardamom-pepper.webp', alt: { en: 'Cardamom and black pepper', ar: 'الهيل والفلفل الأسود' } },
    ],
    items: [
      { id: 'green-cardamom', image: '/images/plates/cardamom.webp', latin: 'Elettaria cardamomum', name: { en: 'Green Cardamom', ar: 'الهيل الأخضر' }, hs: '0908.31', forms: spec('Whole pods, size-graded', 'قرون كاملة مفرزة حسب الحجم') },
      { id: 'black-pepper', image: '/images/plates/black-pepper.webp', latin: 'Piper nigrum', name: { en: 'Black Pepper', ar: 'الفلفل الأسود' }, hs: '0904.11', forms: spec('Whole, crushed, ground', 'كامل، مجروش، مطحون') },
      { id: 'cinnamon', image: '/images/plates/cinnamon.webp', latin: 'Cinnamomum verum', name: { en: 'Cinnamon', ar: 'القرفة' }, hs: '0906.19', forms: spec('Sticks, quills, ground', 'أعواد، لفائف، مطحونة') },
      { id: 'clove', image: '/images/plates/clove.webp', latin: 'Syzygium aromaticum', name: { en: 'Clove', ar: 'القرنفل' }, hs: '0907.10', forms: spec('Whole, ground', 'كامل، مطحون') },
      { id: 'turmeric', image: '/images/products/turmeric.webp', latin: 'Curcuma longa', name: { en: 'Turmeric', ar: 'الكركم' }, hs: '0910.30', forms: spec('Fingers, powder', 'أصابع، مسحوق') },
      { id: 'spice-blends', image: '/images/plates/mixed.webp', name: { en: 'Spice Powders & Blends', ar: 'مساحيق وخلطات التوابل' }, hs: '0910.91', forms: spec('Custom blends, private label', 'خلطات مخصّصة، علامة خاصة') },
    ],
    specs: [
      { label: spec('Origin', 'المنشأ'), value: origin },
      { label: spec('Forms', 'الأشكال'), value: spec('Whole, crushed, ground, blends', 'كاملة، مجروشة، مطحونة، خلطات') },
      { label: spec('Grades', 'الدرجات'), value: spec('Size- and quality-graded to buyer specification', 'مفرزة حسب الحجم والجودة وفق مواصفات المشتري') },
      { label: spec('Packaging', 'التغليف'), value: spec('Jute / PP bags, cartons, retail pouches, private label', 'أكياس جوت / بولي بروبلين، كراتين، عبوات تجزئة، علامة خاصة') },
      { label: spec('Minimum order', 'الحد الأدنى للطلب'), value: onRequest },
      { label: spec('Samples', 'العينات'), value: sampleYes },
    ],
  },
  {
    slug: 'tea-coffee',
    featured: true,
    name: { en: 'Tea & Coffee', ar: 'الشاي والقهوة' },
    short: {
      en: 'High-grown South Indian tea and coffee — beans, ground and blends.',
      ar: 'شاي وقهوة من مرتفعات جنوب الهند — حبوب ومطحونة وخلطات.',
    },
    intro: {
      en: 'From the misty estates of the Western Ghats come teas with a bright, full-bodied cup and coffees with deep, rounded character. We supply loose-leaf tea and coffee as green or roasted beans and ground blends — including the VIRA Coffee Classic Blend — for distributors, cafés and retail brands.',
      ar: 'من مزارع الغاتس الغربية الضبابية يأتي شاي ذو مذاق ساطع وقوام غني، وقهوة ذات طابع عميق ومتوازن. نورّد الشاي السائب والقهوة حبوبًا خضراء أو محمّصة وخلطات مطحونة — ومنها خلطة VIRA Coffee الكلاسيكية — للموزعين والمقاهي وعلامات التجزئة.',
    },
    cover: '/images/tea-coffee/cover.webp',
    gallery: [
      { src: '/images/tea-coffee/tea-leaves.webp', alt: { en: 'Fresh tea leaves', ar: 'أوراق شاي طازجة' } },
      { src: '/images/tea-coffee/coffee.webp', alt: { en: 'Coffee harvest', ar: 'حصاد القهوة' } },
      { src: '/images/tea-coffee/tea-and-coffee.webp', alt: { en: 'Tea and coffee', ar: 'الشاي والقهوة' } },
      { src: '/images/tea-coffee/vira-classic-blend.webp', alt: { en: 'VIRA Coffee Classic Blend', ar: 'خلطة VIRA Coffee الكلاسيكية' } },
    ],
    items: [
      { id: 'black-tea', image: '/images/tea-coffee/tea-leaves.webp', latin: 'Camellia sinensis', name: { en: 'Black Tea', ar: 'الشاي الأسود' }, hs: '0902.40', forms: spec('Loose leaf, CTC, dust', 'أوراق سائبة، CTC، ناعم') },
      { id: 'coffee-beans', image: '/images/tea-coffee/coffee.webp', latin: 'Coffea arabica · C. canephora', name: { en: 'Coffee Beans', ar: 'حبوب القهوة' }, hs: '0901.11', forms: spec('Green or roasted, Arabica & Robusta', 'خضراء أو محمّصة، أرابيكا وروبوستا') },
      { id: 'ground-coffee', image: '/images/tea-coffee/vira-classic-blend.webp', latin: 'Coffea spp.', name: { en: 'Ground Coffee & Blends', ar: 'القهوة المطحونة والخلطات' }, hs: '0901.21', forms: spec('Ground, retail packs', 'مطحونة، عبوات تجزئة') },
    ],
    specs: [
      { label: spec('Origin', 'المنشأ'), value: spec('South India (Kerala & Western Ghats)', 'جنوب الهند (كيرالا والغاتس الغربية)') },
      { label: spec('Forms', 'الأشكال'), value: spec('Loose leaf tea; green, roasted or ground coffee', 'شاي سائب؛ قهوة خضراء أو محمّصة أو مطحونة') },
      { label: spec('Packaging', 'التغليف'), value: spec('Bulk sacks, foil bags, retail packs', 'أكياس كبيرة، أكياس مبطّنة بالألمنيوم، عبوات تجزئة') },
      { label: spec('Minimum order', 'الحد الأدنى للطلب'), value: onRequest },
      { label: spec('Samples', 'العينات'), value: sampleYes },
    ],
  },
  {
    slug: 'honey-coconut-oil',
    featured: true,
    name: { en: 'Honey & Coconut Oil', ar: 'العسل وزيت جوز الهند' },
    short: {
      en: 'Natural honey and pure coconut oil from Kerala’s countryside.',
      ar: 'عسل طبيعي وزيت جوز هند نقي من ريف كيرالا.',
    },
    intro: {
      en: 'Kerala means “land of coconuts”. Our coconut oil is pressed from mature kernels for a clean aroma and long shelf life, and our honey is collected from forest and farm hives — packed in glass or bulk containers for food service, retail and wellness brands.',
      ar: 'تعني كلمة كيرالا «أرض جوز الهند». يُعصر زيت جوز الهند لدينا من لبّ ناضج ليمنح رائحة نقية وعمرًا تخزينيًا طويلًا، ويُجمع عسلنا من خلايا الغابات والمزارع — ويُعبّأ في عبوات زجاجية أو بالجملة لقطاع الأغذية والتجزئة والعافية.',
    },
    cover: '/images/honey-coconut-oil/honey.webp',
    gallery: [
      { src: '/images/plates/honey-banner.webp', alt: { en: 'Golden honey', ar: 'عسل ذهبي' } },
      { src: '/images/plates/coconut-oil.webp', alt: { en: 'Coconut oil', ar: 'زيت جوز الهند' } },
      { src: '/images/honey-coconut-oil/duo.webp', alt: { en: 'Honey and coconut oil', ar: 'العسل وزيت جوز الهند' } },
    ],
    items: [
      { id: 'natural-honey', image: '/images/honey-coconut-oil/honey.webp', latin: 'Mel — Apis spp.', name: { en: 'Natural Honey', ar: 'العسل الطبيعي' }, hs: '0409.00', forms: spec('Raw / filtered, glass jars or bulk', 'خام / مُصفّى، برطمانات زجاجية أو بالجملة') },
      { id: 'coconut-oil', image: '/images/plates/coconut-oil.webp', latin: 'Cocos nucifera', name: { en: 'Coconut Oil', ar: 'زيت جوز الهند' }, hs: '1513.19', forms: spec('Cold-pressed / virgin, bottles or bulk', 'معصور على البارد / بكر، زجاجات أو بالجملة') },
    ],
    specs: [
      { label: spec('Origin', 'المنشأ'), value: origin },
      { label: spec('Packaging', 'التغليف'), value: spec('Glass & PET bottles, jars, drums, private label', 'زجاجات زجاجية وبلاستيكية، برطمانات، براميل، علامة خاصة') },
      { label: spec('Minimum order', 'الحد الأدنى للطلب'), value: onRequest },
      { label: spec('Samples', 'العينات'), value: sampleYes },
    ],
  },
  {
    slug: 'vegetables-fruits',
    name: { en: 'Vegetables & Fruits', ar: 'الخضروات والفواكه' },
    short: {
      en: 'Fresh vegetables, tropical fruit and coconuts from trusted farms.',
      ar: 'خضروات طازجة وفواكه استوائية وجوز هند من مزارع موثوقة.',
    },
    intro: {
      en: 'Fresh, carefully handled produce harvested from trusted farms — mixed vegetables, tropical fruit and mature coconuts. We coordinate harvest, grading and packing so produce is shipped at peak freshness, with packing designed for the journey.',
      ar: 'منتجات طازجة تُعامل بعناية وتُحصد من مزارع موثوقة — خضروات مشكّلة وفواكه استوائية وجوز هند ناضج. ننسّق الحصاد والفرز والتعبئة لتُشحن المنتجات في ذروة نضارتها، بتغليف مصمّم لرحلة الشحن.',
    },
    cover: '/images/vegetables-fruits/basket.webp',
    gallery: [
      { src: '/images/vegetables-fruits/vegetables.webp', alt: { en: 'Fresh vegetables', ar: 'خضروات طازجة' } },
      { src: '/images/vegetables-fruits/coconut.webp', alt: { en: 'Fresh coconuts', ar: 'جوز هند طازج' } },
      { src: '/images/vegetables-fruits/carrots.webp', alt: { en: 'Carrots', ar: 'جزر' } },
      { src: '/images/vegetables-fruits/tomatoes.webp', alt: { en: 'Tomatoes', ar: 'طماطم' } },
      { src: '/images/vegetables-fruits/market-boxes.webp', alt: { en: 'Produce in crates', ar: 'منتجات في صناديق' } },
    ],
    items: [
      { id: 'mixed-vegetables', image: '/images/vegetables-fruits/vegetables.webp', name: { en: 'Fresh Vegetables', ar: 'الخضروات الطازجة' }, hs: '07', forms: spec('Seasonal assortment, graded', 'تشكيلة موسمية، مفرزة') },
      { id: 'coconuts', image: '/images/vegetables-fruits/coconut.webp', latin: 'Cocos nucifera', name: { en: 'Coconuts', ar: 'جوز الهند' }, hs: '0801.19', forms: spec('Mature / semi-husked', 'ناضج / نصف مقشّر') },
      { id: 'tropical-fruit', image: '/images/vegetables-fruits/basket.webp', name: { en: 'Tropical Fruit', ar: 'الفواكه الاستوائية' }, hs: '08', forms: spec('Seasonal availability', 'حسب توفّر الموسم') },
    ],
    specs: [
      { label: spec('Origin', 'المنشأ'), value: origin },
      { label: spec('Availability', 'التوفر'), value: spec('Seasonal — ask for the current calendar', 'موسمي — اسأل عن التقويم الحالي') },
      { label: spec('Packaging', 'التغليف'), value: spec('Ventilated cartons and crates', 'كراتين وصناديق مهوّاة') },
      { label: spec('Minimum order', 'الحد الأدنى للطلب'), value: onRequest },
    ],
  },
  {
    slug: 'berries',
    name: { en: 'Berries', ar: 'التوت' },
    short: {
      en: 'Raspberries, blueberries and mixed berries for food and retail.',
      ar: 'توت العليق والتوت الأزرق والتوت المشكّل للأغذية والتجزئة.',
    },
    intro: {
      en: 'Vibrant raspberries, blueberries and mixed berries for food manufacturers, bakeries and retailers. Tell us the variety, format and volume you need and we will source and pack to your requirements, with cold-chain handling where the format requires it.',
      ar: 'توت العليق والتوت الأزرق والتوت المشكّل بألوانه الزاهية لمصنّعي الأغذية والمخابز وتجّار التجزئة. أخبرنا بالصنف والشكل والكمية التي تحتاجها وسنوفّرها ونعبّئها وفق متطلباتك، مع سلسلة تبريد عندما يتطلب الشكل ذلك.',
    },
    cover: '/images/berries/mixed.webp',
    gallery: [
      { src: '/images/berries/raspberries.webp', alt: { en: 'Raspberries', ar: 'توت العليق' } },
      { src: '/images/berries/blueberries.webp', alt: { en: 'Blueberries', ar: 'التوت الأزرق' } },
      { src: '/images/berries/blueberry-cluster.webp', alt: { en: 'Blueberries on the branch', ar: 'التوت الأزرق على الغصن' } },
      { src: '/images/berries/forest-berries.webp', alt: { en: 'Mixed forest berries', ar: 'توت الغابات المشكّل' } },
    ],
    items: [
      { id: 'mixed-berries', image: '/images/berries/mixed.webp', latin: 'Rubus · Vaccinium spp.', name: { en: 'Mixed Berries', ar: 'التوت المشكّل' }, hs: '0810', forms: spec('Fresh or frozen', 'طازج أو مجمّد') },
      { id: 'blueberries', image: '/images/berries/blueberries.webp', latin: 'Vaccinium corymbosum', name: { en: 'Blueberries', ar: 'التوت الأزرق' }, hs: '0810.40', forms: spec('Fresh or frozen', 'طازج أو مجمّد') },
      { id: 'raspberries', image: '/images/berries/raspberries.webp', latin: 'Rubus idaeus', name: { en: 'Raspberries', ar: 'توت العليق' }, hs: '0810.20', forms: spec('Fresh or frozen', 'طازج أو مجمّد') },
    ],
    specs: [
      { label: spec('Formats', 'الأشكال'), value: spec('Fresh, frozen — per enquiry', 'طازج، مجمّد — حسب الاستفسار') },
      { label: spec('Packaging', 'التغليف'), value: spec('Punnets, cartons, bulk frozen', 'علب صغيرة، كراتين، مجمّد بالجملة') },
      { label: spec('Minimum order', 'الحد الأدنى للطلب'), value: onRequest },
    ],
  },
  {
    slug: 'wheat-rice',
    name: { en: 'Wheat & Rice', ar: 'القمح والأرز' },
    short: {
      en: 'Indian wheat and rice — including aromatic and everyday varieties.',
      ar: 'قمح وأرز هندي — بأصناف عطرية ويومية.',
    },
    intro: {
      en: 'India is one of the world’s great grain baskets. We supply wheat and rice varieties for wholesalers, food service and retail, cleaned and packed in the bag sizes your market prefers.',
      ar: 'تُعدّ الهند من أكبر سلال الحبوب في العالم. نورّد أصناف القمح والأرز لتجّار الجملة وقطاع الخدمات الغذائية والتجزئة، منظّفة ومعبّأة بأحجام الأكياس التي يفضّلها سوقك.',
    },
    cover: '/images/wheat-rice/harvest.webp',
    gallery: [
      { src: '/images/wheat-rice/wheat-field.webp', alt: { en: 'Wheat field', ar: 'حقل قمح' } },
      { src: '/images/wheat-rice/wheat-sky.webp', alt: { en: 'Wheat under blue sky', ar: 'قمح تحت سماء زرقاء' } },
      { src: '/images/wheat-rice/grains.webp', alt: { en: 'Wheat grains', ar: 'حبوب القمح' } },
      { src: '/images/wheat-rice/ears.webp', alt: { en: 'Ears of wheat', ar: 'سنابل القمح' } },
    ],
    items: [
      { id: 'rice', image: '/images/products/rice.webp', latin: 'Oryza sativa', name: { en: 'Rice', ar: 'الأرز' }, hs: '1006.30', forms: spec('Basmati & non-basmati, raw / parboiled', 'بسمتي وغير بسمتي، أبيض / مسلوق جزئيًا') },
      { id: 'wheat', image: '/images/products/wheat.webp', latin: 'Triticum aestivum', name: { en: 'Wheat', ar: 'القمح' }, hs: '1001.99', forms: spec('Milling-quality grain', 'حبوب صالحة للطحن') },
    ],
    specs: [
      { label: spec('Origin', 'المنشأ'), value: originIndia },
      { label: spec('Packaging', 'التغليف'), value: spec('PP / jute bags in buyer-preferred sizes', 'أكياس بولي بروبلين / جوت بالأحجام المفضّلة للمشتري') },
      { label: spec('Minimum order', 'الحد الأدنى للطلب'), value: onRequest },
      { label: spec('Samples', 'العينات'), value: sampleYes },
    ],
  },
  {
    slug: 'cosmetics-perfumes',
    name: { en: 'Cosmetics & Perfumes', ar: 'مستحضرات التجميل والعطور' },
    short: {
      en: 'Handmade natural soaps, herbal hair oil, fragrance oils and perfumes.',
      ar: 'صابون طبيعي مصنوع يدويًا وزيت شعر عشبي وزيوت عطرية وعطور.',
    },
    intro: {
      en: 'Rooted in Kerala’s botanical traditions: handmade soaps with natural oils, herbal hair oil with coconut and hibiscus, and fine fragrance oils and eau de parfum — including VIRAZ “Golden Flora”. Available under our partners’ brands or as private label for your market.',
      ar: 'مستوحاة من تقاليد كيرالا النباتية: صابون مصنوع يدويًا بزيوت طبيعية، وزيت شعر عشبي بجوز الهند والكركديه، وزيوت عطرية فاخرة وعطور — ومنها عطر VIRAZ «Golden Flora». متوفرة بعلامات شركائنا أو بعلامتك الخاصة لسوقك.',
    },
    cover: '/images/plates/collection.webp',
    gallery: [
      { src: '/images/plates/soap.webp', alt: { en: 'Handmade natural soap', ar: 'صابون طبيعي مصنوع يدويًا' } },
      { src: '/images/cosmetics-perfumes/hair-oil.webp', alt: { en: 'Herbal hair oil', ar: 'زيت شعر عشبي' } },
      { src: '/images/cosmetics-perfumes/fragrance-oil.webp', alt: { en: 'Fragrance oil', ar: 'زيت عطري' } },
      { src: '/images/cosmetics-perfumes/viraz-golden-flora.webp', alt: { en: 'VIRAZ Golden Flora eau de parfum', ar: 'عطر VIRAZ Golden Flora' } },
    ],
    items: [
      { id: 'natural-soap', image: '/images/plates/soap-viraz.webp', name: { en: 'Handmade Natural Soap', ar: 'صابون طبيعي مصنوع يدويًا' }, hs: '3401.11', forms: spec('Bars, gift packs, private label', 'قوالب، علب هدايا، علامة خاصة') },
      { id: 'hair-oil', image: '/images/cosmetics-perfumes/hair-oil.webp', name: { en: 'Herbal Hair Oil', ar: 'زيت الشعر العشبي' }, hs: '3305.90', forms: spec('Bottles, private label', 'زجاجات، علامة خاصة') },
      { id: 'perfumes', image: '/images/cosmetics-perfumes/fragrance-oil.webp', name: { en: 'Perfumes & Fragrance Oils', ar: 'العطور والزيوت العطرية' }, hs: '3303.00', forms: spec('Eau de parfum, attar / fragrance oils', 'ماء عطر، عطور زيتية') },
    ],
    specs: [
      { label: spec('Origin', 'المنشأ'), value: originIndia },
      { label: spec('Branding', 'العلامة التجارية'), value: spec('Partner brands or private label', 'علامات الشركاء أو علامة خاصة') },
      { label: spec('Minimum order', 'الحد الأدنى للطلب'), value: onRequest },
      { label: spec('Samples', 'العينات'), value: sampleYes },
    ],
  },
]

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)

export const allItems = categories.flatMap((c) => c.items.map((i) => ({ ...i, category: c })))
export const findItem = (id: string) => allItems.find((i) => i.id === id)
