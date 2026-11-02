import type { L } from '@/i18n/config'

/**
 * Rich copy for each product page, keyed by product id (see products.ts).
 * Claims are deliberately conservative: no prices, MOQs, certifications or
 * grade guarantees — those are confirmed per quotation. TODO(verify) with the business.
 */
export type ProductDetail = { desc: L; features: L[]; uses: L[] }

const f = (en: string, ar: string): L => ({ en, ar })

export const details: Record<string, ProductDetail> = {
  'green-cardamom': {
    desc: f(
      'Green cardamom is the “queen of spices” and Kerala’s most celebrated crop. Our pods are hand-picked in the Western Ghats, dried to preserve their deep green colour and sorted by size, giving a bold, sweet-floral aroma prized by coffee houses, bakeries and spice blenders across the Gulf.',
      'الهيل الأخضر «ملكة التوابل» وأشهر محاصيل كيرالا. تُقطف قرون الهيل يدويًا في الغاتس الغربية، وتُجفّف للحفاظ على لونها الأخضر العميق وتُفرز حسب الحجم، لتمنح رائحة قوية حلوة وزهرية يقدّرها أصحاب المقاهي والمخابز وخلطات التوابل في الخليج.',
    ),
    features: [
      f('Size-graded whole pods', 'قرون كاملة مفرزة حسب الحجم'),
      f('Rich green colour and strong aroma', 'لون أخضر غني ورائحة قوية'),
      f('Cleaned and sorted before packing', 'منظّف ومفرز قبل التعبئة'),
      f('Sourced from Western Ghats growers', 'من مزارعي الغاتس الغربية'),
    ],
    uses: [
      f('Arabic coffee (gahwa) and tea', 'القهوة العربية والشاي'),
      f('Sweets, bakery and desserts', 'الحلويات والمخبوزات'),
      f('Biryani, rice dishes and spice blends', 'البرياني وأطباق الأرز وخلطات التوابل'),
    ],
  },
  'black-pepper': {
    desc: f(
      'Malabar black pepper is the spice that first drew traders to Kerala. Our berries are sun-dried for a bold, pungent heat with a warm, woody aroma, and supplied whole, crushed or ground to suit table use, food manufacturing and seasoning blends.',
      'الفلفل الأسود المالاباري هو التابل الذي جذب التجّار إلى كيرالا أولًا. تُجفّف حبوبه تحت الشمس لتمنح حرارة لاذعة قوية ورائحة دافئة خشبية، ونورّده كاملًا أو مجروشًا أو مطحونًا للاستخدام المنزلي والتصنيع الغذائي وخلطات التتبيل.',
    ),
    features: [
      f('Whole, crushed or ground', 'كامل أو مجروش أو مطحون'),
      f('Bold, pungent Malabar character', 'طابع مالاباري لاذع وقوي'),
      f('Cleaned and graded by size and density', 'منظّف ومصنّف حسب الحجم والكثافة'),
      f('Bulk sacks or retail packs', 'أكياس كبيرة أو عبوات تجزئة'),
    ],
    uses: [
      f('Table pepper and seasoning', 'فلفل المائدة والتتبيل'),
      f('Meat processing, sauces and snacks', 'تصنيع اللحوم والصلصات والوجبات الخفيفة'),
      f('Spice blends and marinades', 'خلطات التوابل والتتبيلات'),
    ],
  },
  cinnamon: {
    desc: f(
      'Fragrant cinnamon with a sweet, warm taste — supplied as sticks, quills or finely ground powder. Ideal for kitchens, bakeries and beverage makers who want consistent aroma from batch to batch.',
      'قرفة عطرية بمذاق دافئ حلو — نورّدها أعوادًا أو لفائف أو مسحوقًا ناعمًا. مثالية للمطابخ والمخابز ومصنّعي المشروبات الذين يريدون رائحة ثابتة من دفعة لأخرى.',
    ),
    features: [
      f('Sticks, quills or powder', 'أعواد أو لفائف أو مسحوق'),
      f('Sweet, warm aroma', 'رائحة دافئة حلوة'),
      f('Cut lengths on request', 'أطوال مقطّعة عند الطلب'),
      f('Packed to protect volatile oils', 'معبّأة للحفاظ على الزيوت العطرية'),
    ],
    uses: [
      f('Bakery, desserts and sweets', 'المخبوزات والحلويات'),
      f('Tea, coffee and beverages', 'الشاي والقهوة والمشروبات'),
      f('Meat dishes and spice mixes', 'أطباق اللحوم وخلطات التوابل'),
    ],
  },
  clove: {
    desc: f(
      'Whole cloves with a strong, sweet-spicy aroma and high oil content, carefully dried and sorted to remove stems and debris. Supplied whole or ground for culinary, food-processing and traditional uses.',
      'قرنفل كامل برائحة حلوة حارّة قوية ومحتوى زيتي مرتفع، يُجفّف ويُفرز بعناية لإزالة السيقان والشوائب. نورّده كاملًا أو مطحونًا للطهي والتصنيع الغذائي والاستخدامات التقليدية.',
    ),
    features: [
      f('Whole heads, stems removed', 'رؤوس كاملة دون سيقان'),
      f('Strong aroma, high oil content', 'رائحة قوية ومحتوى زيتي مرتفع'),
      f('Whole or ground', 'كامل أو مطحون'),
      f('Hand-sorted lots', 'دفعات مفرزة يدويًا'),
    ],
    uses: [
      f('Rice dishes, biryani and curries', 'أطباق الأرز والبرياني والكاري'),
      f('Spice blends and pickles', 'خلطات التوابل والمخللات'),
      f('Tea, baking and confectionery', 'الشاي والمخبوزات والحلويات'),
    ],
  },
  turmeric: {
    desc: f(
      'Bright golden turmeric from South India, supplied as dried fingers or finely milled powder. Valued for its colour and earthy warmth in cooking, food manufacturing and wellness products.',
      'كركم ذهبي زاهٍ من جنوب الهند، نورّده أصابع مجففة أو مسحوقًا ناعم الطحن. يُقدَّر للونه ودفئه الترابي في الطهي والتصنيع الغذائي ومنتجات العافية.',
    ),
    features: [
      f('Fingers or fine powder', 'أصابع أو مسحوق ناعم'),
      f('Deep golden colour', 'لون ذهبي عميق'),
      f('Cleaned and polished fingers', 'أصابع منظّفة ومصقولة'),
      f('Bulk or retail packing', 'تعبئة بالجملة أو للتجزئة'),
    ],
    uses: [
      f('Curries, rice and everyday cooking', 'الكاري والأرز والطهي اليومي'),
      f('Food colouring and seasoning', 'تلوين الأغذية والتتبيل'),
      f('Wellness drinks and blends', 'مشروبات وخلطات العافية'),
    ],
  },
  'spice-blends': {
    desc: f(
      'Ground spices and ready blends — from single spice powders to custom masalas — milled from our own sourced spices and packed under your brand or ours. Tell us your recipe or target market and we will match it.',
      'مساحيق توابل وخلطات جاهزة — من مساحيق التابل الواحد إلى خلطات الماسالا المخصّصة — مطحونة من توابلنا ومعبّأة بعلامتك أو بعلامتنا. أخبرنا بوصفتك أو سوقك المستهدف وسنطابقها.',
    ),
    features: [
      f('Single powders and blends', 'مساحيق مفردة وخلطات'),
      f('Custom recipes on request', 'وصفات مخصّصة عند الطلب'),
      f('Private label packing', 'تعبئة بعلامة خاصة'),
      f('Made from SAACO-sourced spices', 'من توابل توفّرها ساكو'),
    ],
    uses: [
      f('Retail spice ranges', 'تشكيلات توابل للتجزئة'),
      f('Restaurants and catering', 'المطاعم وخدمات الضيافة'),
      f('Food manufacturers', 'مصنّعو الأغذية'),
    ],
  },
  'black-tea': {
    desc: f(
      'South Indian black tea from high-elevation estates, with a bright, brisk cup and full body. Available as loose leaf, CTC or dust grades for packers, distributors and hospitality.',
      'شاي أسود من مزارع جنوب الهند المرتفعة، بمذاق ساطع منعش وقوام غني. متوفر أوراقًا سائبة أو CTC أو ناعمًا للمعبّئين والموزعين وقطاع الضيافة.',
    ),
    features: [
      f('Loose leaf, CTC and dust', 'أوراق سائبة و CTC وناعم'),
      f('Bright, brisk liquor', 'نقيع ساطع ومنعش'),
      f('Bulk sacks or foil packs', 'أكياس كبيرة أو عبوات مبطّنة'),
      f('Blends on request', 'خلطات عند الطلب'),
    ],
    uses: [
      f('Karak and milk tea', 'شاي الكرك والشاي بالحليب'),
      f('Tea packers and brands', 'معبّئو الشاي والعلامات التجارية'),
      f('Hotels, cafés and catering', 'الفنادق والمقاهي والضيافة'),
    ],
  },
  'coffee-beans': {
    desc: f(
      'Arabica and Robusta coffee from the hills of South India, supplied green for roasters or roasted to your profile. Shade-grown beans with a smooth, rounded character.',
      'قهوة أرابيكا وروبوستا من تلال جنوب الهند، نورّدها خضراء للمحمّصين أو محمّصة حسب رغبتك. حبوب مزروعة في الظل بطابع ناعم ومتوازن.',
    ),
    features: [
      f('Arabica and Robusta', 'أرابيكا وروبوستا'),
      f('Green or roasted', 'خضراء أو محمّصة'),
      f('Shade-grown South Indian origin', 'منشأ جنوب هندي مزروع في الظل'),
      f('Jute or valve bags', 'أكياس جوت أو أكياس بصمّام'),
    ],
    uses: [
      f('Roasters and cafés', 'المحامص والمقاهي'),
      f('Espresso and filter blends', 'خلطات الإسبريسو والفلتر'),
      f('Private label coffee', 'قهوة بعلامة خاصة'),
    ],
  },
  'ground-coffee': {
    desc: f(
      'Ready-to-brew ground coffee and blends for retail and food service — including the VIRA Coffee Classic Blend. Packed fresh to hold aroma on the shelf.',
      'قهوة مطحونة وخلطات جاهزة للتحضير للتجزئة وقطاع الأغذية — ومنها خلطة VIRA Coffee الكلاسيكية. تُعبّأ طازجة للحفاظ على الرائحة على الرف.',
    ),
    features: [
      f('Ground to your brew method', 'مطحونة حسب طريقة التحضير'),
      f('Retail and bulk packs', 'عبوات تجزئة وجملة'),
      f('Includes VIRA Classic Blend', 'تشمل خلطة VIRA الكلاسيكية'),
      f('Private label available', 'متوفرة بعلامة خاصة'),
    ],
    uses: [
      f('Supermarkets and retail', 'المتاجر والتجزئة'),
      f('Offices and hospitality', 'المكاتب والضيافة'),
      f('Cafés and vending', 'المقاهي وآلات البيع'),
    ],
  },
  'natural-honey': {
    desc: f(
      'Natural honey collected from farm and forest hives in Kerala, filtered and packed in glass or bulk containers. A golden, aromatic honey for retail shelves, food service and wellness brands.',
      'عسل طبيعي يُجمع من خلايا المزارع والغابات في كيرالا، مُصفّى ومعبّأ في عبوات زجاجية أو بالجملة. عسل ذهبي عطري لرفوف التجزئة وقطاع الأغذية وعلامات العافية.',
    ),
    features: [
      f('Raw or filtered', 'خام أو مُصفّى'),
      f('Glass jars or bulk drums', 'برطمانات زجاجية أو براميل'),
      f('Private label jars', 'برطمانات بعلامة خاصة'),
      f('Lab analysis on request', 'تحليل مخبري عند الطلب'),
    ],
    uses: [
      f('Retail and gifting', 'التجزئة والهدايا'),
      f('Bakery and confectionery', 'المخبوزات والحلويات'),
      f('Wellness and beverages', 'العافية والمشروبات'),
    ],
  },
  'coconut-oil': {
    desc: f(
      'Kerala means “land of coconuts”. Our coconut oil is pressed from mature kernels for a clean aroma and long shelf life — available cold-pressed / virgin or refined, in bottles, jars or bulk.',
      'تعني كيرالا «أرض جوز الهند». يُعصر زيت جوز الهند لدينا من لبّ ناضج ليمنح رائحة نقية وعمرًا تخزينيًا طويلًا — متوفر معصورًا على البارد / بكرًا أو مكرّرًا، في زجاجات أو برطمانات أو بالجملة.',
    ),
    features: [
      f('Cold-pressed / virgin or refined', 'معصور على البارد / بكر أو مكرّر'),
      f('Bottles, jars or drums', 'زجاجات أو برطمانات أو براميل'),
      f('Edible and cosmetic grades', 'درجات غذائية وتجميلية'),
      f('Private label available', 'متوفر بعلامة خاصة'),
    ],
    uses: [
      f('Cooking and frying', 'الطهي والقلي'),
      f('Hair and skin care', 'العناية بالشعر والبشرة'),
      f('Food and cosmetic manufacturing', 'تصنيع الأغذية ومستحضرات التجميل'),
    ],
  },
  'mixed-vegetables': {
    desc: f(
      'Seasonal fresh vegetables from trusted farms, harvested, graded and packed to travel well. Ask for the current crop calendar and we will plan shipments around peak freshness.',
      'خضروات طازجة موسمية من مزارع موثوقة، تُحصد وتُصنّف وتُعبّأ لتتحمّل الشحن. اسأل عن تقويم المحاصيل الحالي وسنخطط الشحنات حول ذروة النضارة.',
    ),
    features: [
      f('Seasonal assortment', 'تشكيلة موسمية'),
      f('Graded and packed for travel', 'مصنّفة ومعبّأة للشحن'),
      f('Ventilated cartons and crates', 'كراتين وصناديق مهوّاة'),
      f('Air or reefer shipments', 'شحن جوي أو مبرّد'),
    ],
    uses: [
      f('Wholesale markets', 'أسواق الجملة'),
      f('Supermarkets', 'المتاجر الكبرى'),
      f('Restaurants and catering', 'المطاعم والضيافة'),
    ],
  },
  coconuts: {
    desc: f(
      'Mature and semi-husked coconuts from Kerala’s coconut belt, selected for weight and freshness — for retail, food processing and the Gulf’s strong demand for fresh coconut.',
      'جوز هند ناضج ونصف مقشّر من حزام جوز الهند في كيرالا، مختار حسب الوزن والنضارة — للتجزئة والتصنيع الغذائي والطلب القوي في الخليج على جوز الهند الطازج.',
    ),
    features: [
      f('Mature or semi-husked', 'ناضج أو نصف مقشّر'),
      f('Selected by weight', 'مختار حسب الوزن'),
      f('Mesh bags or cartons', 'أكياس شبكية أو كراتين'),
      f('Year-round supply', 'توريد على مدار العام'),
    ],
    uses: [
      f('Retail and supermarkets', 'التجزئة والمتاجر'),
      f('Food processing', 'التصنيع الغذائي'),
      f('Restaurants and sweets', 'المطاعم والحلويات'),
    ],
  },
  'tropical-fruit': {
    desc: f(
      'Seasonal tropical fruit from South India — sourced when it is at its best and packed for export. Share your list and we will confirm what is in season.',
      'فواكه استوائية موسمية من جنوب الهند — نوفّرها في أفضل حالاتها ونعبّئها للتصدير. أرسل قائمتك وسنؤكد ما هو متوفر في الموسم.',
    ),
    features: [
      f('Seasonal availability', 'حسب توفّر الموسم'),
      f('Export-grade packing', 'تعبئة بمواصفات التصدير'),
      f('Mixed loads with vegetables', 'شحنات مختلطة مع الخضروات'),
      f('Air freight for freshness', 'شحن جوي للحفاظ على النضارة'),
    ],
    uses: [
      f('Fruit importers and wholesalers', 'مستوردو وتجّار الفاكهة'),
      f('Supermarkets', 'المتاجر الكبرى'),
      f('Juice and hospitality', 'العصائر والضيافة'),
    ],
  },
  'mixed-berries': {
    desc: f(
      'A vibrant mix of berries for bakeries, dessert makers and retail — supplied fresh or frozen depending on your market and volumes.',
      'تشكيلة زاهية من التوت للمخابز وصانعي الحلويات والتجزئة — طازجة أو مجمّدة حسب سوقك وكمياتك.',
    ),
    features: [
      f('Fresh or frozen', 'طازج أو مجمّد'),
      f('Mixes to your ratio', 'خلطات حسب النسبة المطلوبة'),
      f('Cold-chain handling', 'نقل بسلسلة تبريد'),
      f('Retail or bulk packs', 'عبوات تجزئة أو جملة'),
    ],
    uses: [
      f('Bakery and desserts', 'المخبوزات والحلويات'),
      f('Smoothies and juices', 'العصائر والسموذي'),
      f('Retail frozen fruit', 'فاكهة مجمّدة للتجزئة'),
    ],
  },
  blueberries: {
    desc: f('Plump blueberries, fresh or frozen, for retail and food manufacturing.', 'توت أزرق ممتلئ، طازج أو مجمّد، للتجزئة والتصنيع الغذائي.'),
    features: [
      f('Fresh or frozen', 'طازج أو مجمّد'),
      f('Punnets or bulk', 'علب صغيرة أو بالجملة'),
      f('Cold-chain handling', 'نقل بسلسلة تبريد'),
    ],
    uses: [f('Retail', 'التجزئة'), f('Bakery and dairy', 'المخبوزات ومنتجات الألبان'), f('Smoothies', 'السموذي')],
  },
  raspberries: {
    desc: f('Bright, aromatic raspberries, fresh or frozen, for dessert makers and retail.', 'توت عليق زاهٍ وعطري، طازج أو مجمّد، لصانعي الحلويات والتجزئة.'),
    features: [
      f('Fresh or frozen', 'طازج أو مجمّد'),
      f('Whole or crumble', 'كامل أو مفتّت'),
      f('Cold-chain handling', 'نقل بسلسلة تبريد'),
    ],
    uses: [f('Desserts and pastry', 'الحلويات والمعجنات'), f('Jams and fillings', 'المربّيات والحشوات'), f('Retail', 'التجزئة')],
  },
  rice: {
    desc: f(
      'Indian rice for every kitchen — aromatic basmati for biryani and everyday non-basmati varieties, raw or parboiled, cleaned and packed in the bag sizes your market prefers.',
      'أرز هندي لكل مطبخ — بسمتي عطري للبرياني وأصناف يومية غير بسمتي، أبيض أو مسلوق جزئيًا، منظّف ومعبّأ بأحجام الأكياس التي يفضّلها سوقك.',
    ),
    features: [
      f('Basmati and non-basmati', 'بسمتي وغير بسمتي'),
      f('Raw or parboiled', 'أبيض أو مسلوق جزئيًا'),
      f('Colour-sorted on request', 'فرز ضوئي عند الطلب'),
      f('1–50 kg bags, private label', 'أكياس 1–50 كغ، علامة خاصة'),
    ],
    uses: [f('Biryani and mandi', 'البرياني والمندي'), f('Restaurants and catering', 'المطاعم والضيافة'), f('Retail and wholesale', 'التجزئة والجملة')],
  },
  wheat: {
    desc: f('Clean, milling-quality Indian wheat for flour mills and food manufacturers, supplied in bulk bags.', 'قمح هندي نظيف صالح للطحن للمطاحن ومصنّعي الأغذية، يُورَّد في أكياس كبيرة.'),
    features: [
      f('Milling-quality grain', 'حبوب صالحة للطحن'),
      f('Cleaned and graded', 'منظّف ومصنّف'),
      f('Bulk PP bags', 'أكياس بولي بروبلين كبيرة'),
    ],
    uses: [f('Flour mills', 'المطاحن'), f('Bakery and food manufacturing', 'المخابز والتصنيع الغذائي'), f('Wholesale', 'الجملة')],
  },
  'natural-soap': {
    desc: f(
      'Handmade soaps with natural oils and botanicals from Kerala’s traditions — gentle, fragrant and beautifully presented for retail, hotels and gifting.',
      'صابون مصنوع يدويًا بزيوت ونباتات طبيعية من تقاليد كيرالا — لطيف وعطري وبتقديم جميل للتجزئة والفنادق والهدايا.',
    ),
    features: [
      f('Natural oils and botanicals', 'زيوت ونباتات طبيعية'),
      f('Range of scents', 'تشكيلة من الروائح'),
      f('Gift boxes available', 'علب هدايا متوفرة'),
      f('Private label', 'علامة خاصة'),
    ],
    uses: [f('Retail and pharmacies', 'التجزئة والصيدليات'), f('Hotels and spas', 'الفنادق والمنتجعات'), f('Corporate gifting', 'هدايا الشركات')],
  },
  'hair-oil': {
    desc: f(
      'Herbal hair oil made with coconut oil and traditional botanicals such as hibiscus — a Kerala classic for nourished, healthy-looking hair.',
      'زيت شعر عشبي مصنوع من زيت جوز الهند ونباتات تقليدية مثل الكركديه — من كلاسيكيات كيرالا لشعر مغذّى وصحي المظهر.',
    ),
    features: [
      f('Coconut oil base', 'أساس من زيت جوز الهند'),
      f('Traditional herbal blend', 'خلطة عشبية تقليدية'),
      f('Bottles in several sizes', 'زجاجات بأحجام متعددة'),
      f('Private label', 'علامة خاصة'),
    ],
    uses: [f('Retail and pharmacies', 'التجزئة والصيدليات'), f('Salons and spas', 'الصالونات والمنتجعات'), f('Online stores', 'المتاجر الإلكترونية')],
  },
  perfumes: {
    desc: f(
      'Fine fragrance oils (attar) and eau de parfum — including VIRAZ “Golden Flora” — rich, long-lasting scents loved across the Gulf.',
      'زيوت عطرية فاخرة (عطور زيتية) وماء عطر — ومنها VIRAZ «Golden Flora» — روائح غنية تدوم طويلًا ومحبوبة في الخليج.',
    ),
    features: [
      f('Attar and eau de parfum', 'عطور زيتية وماء عطر'),
      f('Long-lasting scents', 'روائح تدوم طويلًا'),
      f('Partner brands or private label', 'علامات الشركاء أو علامة خاصة'),
      f('Gift packaging', 'تغليف هدايا'),
    ],
    uses: [f('Perfume retailers', 'متاجر العطور'), f('Gifting', 'الهدايا'), f('Hospitality', 'الضيافة')],
  },
}

export const whySaaco: L[] = [
  { en: 'Farm-direct, traceable sourcing from Kerala and South India', ar: 'توريد مباشر قابل للتتبّع من كيرالا وجنوب الهند' },
  { en: 'Samples before you commit to an order', ar: 'عينات قبل الالتزام بالطلب' },
  { en: 'Mixed containers across categories', ar: 'حاويات مختلطة من عدة فئات' },
  { en: 'Export documents handled for your market', ar: 'وثائق التصدير جاهزة لسوقك' },
  { en: 'A reply within 24 hours, in English or Arabic', ar: 'رد خلال 24 ساعة بالعربية أو الإنجليزية' },
]
