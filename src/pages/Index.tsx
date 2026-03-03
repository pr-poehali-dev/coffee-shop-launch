import { useState } from 'react';
import Icon from '@/components/ui/icon';

const GRINDER_IMG = "https://cdn.poehali.dev/projects/645395a1-c50d-41a2-b8f1-2022e185c443/files/d069ec47-5f7a-44ab-bb1a-a1cc0be0daa8.jpg";
const MACHINE_IMG = "https://cdn.poehali.dev/projects/645395a1-c50d-41a2-b8f1-2022e185c443/files/7088c29a-399e-4705-a81e-8674cf0bc4b1.jpg";

const products = [
  {
    id: 1,
    name: "Moka Pro X1",
    category: "Кофемолка",
    price: "12 900 ₽",
    oldPrice: "15 900 ₽",
    rating: 4.8,
    reviews: 34,
    image: GRINDER_IMG,
    tag: "Хит продаж",
    desc: "Конусные жернова из нержавеющей стали, 15 степеней помола, таймер дозирования.",
  },
  {
    id: 2,
    name: "Aero Slim",
    category: "Кофемолка",
    price: "8 400 ₽",
    oldPrice: null,
    rating: 4.6,
    reviews: 18,
    image: GRINDER_IMG,
    tag: null,
    desc: "Компактная электрическая кофемолка для дома. Плоские жернова 40 мм.",
  },
  {
    id: 3,
    name: "Espresso Casa",
    category: "Кофемашина",
    price: "34 900 ₽",
    oldPrice: "39 900 ₽",
    rating: 4.9,
    reviews: 57,
    image: MACHINE_IMG,
    tag: "Новинка",
    desc: "Полностью автоматическая машина с капучинатором, давление 19 бар.",
  },
  {
    id: 4,
    name: "Brew Station V2",
    category: "Кофемашина",
    price: "22 500 ₽",
    oldPrice: null,
    rating: 4.7,
    reviews: 42,
    image: MACHINE_IMG,
    tag: null,
    desc: "Рожковая кофемашина с паровым капучинатором. Нагрев 45 секунд.",
  },
  {
    id: 5,
    name: "Grind Master 500",
    category: "Кофемолка",
    price: "18 200 ₽",
    oldPrice: null,
    rating: 4.5,
    reviews: 22,
    image: GRINDER_IMG,
    tag: null,
    desc: "Профессиональная кофемолка с дозатором. 60 делений регулировки помола.",
  },
  {
    id: 6,
    name: "Lungo Home",
    category: "Кофемашина",
    price: "16 800 ₽",
    oldPrice: "19 900 ₽",
    rating: 4.4,
    reviews: 29,
    image: MACHINE_IMG,
    tag: "Скидка",
    desc: "Капсульная кофемашина с встроенным контейнером для молока.",
  },
];

const reviews = [
  {
    id: 1,
    name: "Алексей М.",
    rating: 5,
    date: "15 февраля 2026",
    product: "Espresso Casa",
    text: "Отличная машина! Варит просто восхитительный эспрессо. Сборка добротная, внешний вид элегантный. Рекомендую всем любителям кофе.",
    avatar: "А",
  },
  {
    id: 2,
    name: "Елена В.",
    rating: 5,
    date: "3 января 2026",
    product: "Moka Pro X1",
    text: "Пользуюсь три месяца — качество помола стабильное, тихая работа. Кофе получается намного вкуснее, чем с прежней кофемолкой.",
    avatar: "Е",
  },
  {
    id: 3,
    name: "Дмитрий К.",
    rating: 4,
    date: "21 декабря 2025",
    product: "Brew Station V2",
    text: "Красивый дизайн, быстро нагревается. Единственный минус — шумновата при прогреве. В остальном всё на уровне.",
    avatar: "Д",
  },
];

const faqs = [
  {
    q: "Какая гарантия на технику?",
    a: "На все кофемолки и кофемашины предоставляется гарантия 2 года от производителя. Мы также предлагаем расширенную гарантию на 3 года по запросу.",
  },
  {
    q: "Как выбрать кофемолку под свои нужды?",
    a: "Для эспрессо нужна кофемолка с конусными жерновами и тонкой регулировкой. Для фильтра и аэропресса подойдут модели с плоскими жерновами. Напишите нам — подберём оптимальный вариант.",
  },
  {
    q: "Осуществляете ли вы доставку?",
    a: "Да, доставляем по всей России. Москва и область — 1-2 дня, регионы — 3-7 рабочих дней. Доставка бесплатна при заказе от 10 000 ₽.",
  },
  {
    q: "Можно ли вернуть товар?",
    a: "Да, в течение 14 дней с момента получения вы можете вернуть товар в оригинальной упаковке без следов использования.",
  },
  {
    q: "Есть ли у вас сервисный центр?",
    a: "Да, мы имеем собственный сервисный центр в Москве. Принимаем технику на ремонт и обслуживание как в гарантийный, так и в послегарантийный период.",
  },
];

type Section = "home" | "catalog" | "about" | "faq" | "contacts";
type FilterType = "Все" | "Кофемолки" | "Кофемашины";

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [filter, setFilter] = useState<FilterType>("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: "", product: "", rating: 5, text: "" });
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О бренде" },
    { id: "faq", label: "FAQ" },
    { id: "contacts", label: "Контакты" },
  ];

  const filtered = products.filter(p => {
    if (filter === "Кофемолки") return p.category === "Кофемолка";
    if (filter === "Кофемашины") return p.category === "Кофемашина";
    return true;
  });

  const navigate = (id: Section) => {
    setActive(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("home")}
            className="font-display text-2xl font-light tracking-[0.2em] text-espresso hover:text-latte transition-colors"
          >
            BREW
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`text-sm tracking-widest uppercase underline-hover transition-colors ${
                  active === item.id ? "text-espresso font-medium" : "text-muted-foreground hover:text-espresso"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-espresso"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-cream border-t border-border px-6 py-4 flex flex-col gap-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`text-left text-sm tracking-widest uppercase py-1 transition-colors ${
                  active === item.id ? "text-espresso font-medium" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ============ HOME ============ */}
        {active === "home" && (
          <div>
            <section className="min-h-[92vh] flex items-center relative overflow-hidden bg-cream">
              <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center py-20">
                <div>
                  <p className="animate-fade-up text-xs tracking-[0.35em] uppercase text-muted-foreground mb-6">
                    Премиальное кофейное оборудование
                  </p>
                  <h1 className="animate-fade-up-delay font-display text-6xl md:text-8xl font-light leading-[1.0] text-espresso mb-8">
                    Каждая<br />
                    <em className="italic">чашка</em><br />
                    — шедевр
                  </h1>
                  <p className="animate-fade-up-delay2 text-muted-foreground text-base leading-relaxed max-w-sm mb-10 font-body font-light">
                    Кофемолки и кофемашины для тех, кто понимает разницу между просто кофе и настоящим кофе.
                  </p>
                  <div className="animate-fade-up-delay3 flex gap-4 flex-wrap">
                    <button
                      onClick={() => navigate("catalog")}
                      className="bg-espresso text-cream px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-latte hover:text-espresso transition-colors duration-300"
                    >
                      Каталог
                    </button>
                    <button
                      onClick={() => navigate("about")}
                      className="border border-espresso text-espresso px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-espresso hover:text-cream transition-colors duration-300"
                    >
                      О бренде
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full aspect-square overflow-hidden bg-fog">
                    <img
                      src={MACHINE_IMG}
                      alt="Кофемашина"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-espresso text-cream p-6 hidden md:block">
                    <div className="font-display text-4xl font-light">500+</div>
                    <div className="text-xs tracking-widest uppercase text-cream/70 mt-1">Довольных клиентов</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-espresso py-16">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { num: "6+", label: "Лет на рынке" },
                  { num: "500+", label: "Клиентов" },
                  { num: "24", label: "Модели техники" },
                  { num: "2", label: "Года гарантии" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-5xl font-light text-cream">{s.num}</div>
                    <div className="text-xs tracking-widest uppercase text-cream/50 mt-2">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-24 max-w-6xl mx-auto px-6">
              <div className="flex items-end justify-between mb-16">
                <div>
                  <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">Подборка</p>
                  <h2 className="font-display text-5xl font-light text-espresso">Популярное</h2>
                </div>
                <button
                  onClick={() => navigate("catalog")}
                  className="text-sm tracking-widest uppercase underline-hover text-muted-foreground hover:text-espresso transition-colors hidden md:block"
                >
                  Весь каталог →
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {products.slice(0, 3).map(p => (
                  <ProductCard key={p.id} product={p} onCatalog={() => navigate("catalog")} />
                ))}
              </div>
            </section>

            <section className="bg-fog py-24">
              <div className="max-w-6xl mx-auto px-6">
                <div className="mb-16">
                  <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">Мнения</p>
                  <h2 className="font-display text-5xl font-light text-espresso">Отзывы клиентов</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {reviews.map(r => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============ CATALOG ============ */}
        {active === "catalog" && (
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="mb-12">
              <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">Магазин</p>
              <h1 className="font-display text-5xl md:text-6xl font-light text-espresso mb-8">Каталог</h1>
              <div className="flex gap-2">
                {(["Все", "Кофемолки", "Кофемашины"] as FilterType[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2 text-xs tracking-widest uppercase transition-colors ${
                      filter === f
                        ? "bg-espresso text-cream"
                        : "border border-border text-muted-foreground hover:border-espresso hover:text-espresso"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onCatalog={() => {}} />
              ))}
            </div>

            <div className="mt-24 border-t border-border pt-16">
              <div className="mb-10">
                <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">Поделитесь мнением</p>
                <h2 className="font-display text-4xl font-light text-espresso">Оставить отзыв</h2>
              </div>
              <ReviewForm form={reviewForm} setForm={setReviewForm} productNames={products.map(p => p.name)} />
            </div>
          </div>
        )}

        {/* ============ ABOUT ============ */}
        {active === "about" && (
          <div>
            <div className="bg-espresso py-32 text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-cream/50 mb-4">Наша история</p>
              <h1 className="font-display text-6xl md:text-8xl font-light text-cream">О бренде</h1>
            </div>
            <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="font-display text-4xl font-light text-espresso mb-6">Мы любим кофе</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4 font-light">
                    BREW — это магазин для настоящих ценителей кофейной культуры. Мы начали в 2018 году с простой идеи: помочь людям пить хороший кофе дома, не жертвуя качеством ради удобства.
                  </p>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    Сегодня мы предлагаем тщательно отобранную коллекцию кофемолок и кофемашин — только то оборудование, которое прошло нашу личную проверку.
                  </p>
                </div>
                <div className="aspect-[4/3] overflow-hidden bg-fog">
                  <img src={GRINDER_IMG} alt="О бренде" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: "Award", title: "Качество", desc: "Каждая позиция проходит личный отбор команды BREW." },
                  { icon: "Headphones", title: "Поддержка", desc: "Помогаем выбрать, настроить и обслужить технику." },
                  { icon: "Truck", title: "Доставка", desc: "Быстрая доставка по всей России с гарантией сохранности." },
                ].map((v, i) => (
                  <div key={i} className="p-8 bg-fog">
                    <Icon name={v.icon as "Award" | "Headphones" | "Truck"} size={24} className="text-latte mb-4" />
                    <h3 className="font-display text-2xl font-light text-espresso mb-3">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">{v.desc}</p>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-latte pl-8">
                <blockquote className="font-display text-3xl font-light italic text-espresso leading-snug">
                  "Хороший кофе начинается с правильного оборудования. Мы здесь, чтобы помочь вам его найти."
                </blockquote>
                <p className="text-muted-foreground text-sm mt-4 tracking-wide">— Команда BREW</p>
              </div>
            </div>
          </div>
        )}

        {/* ============ FAQ ============ */}
        {active === "faq" && (
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="mb-16">
              <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">Вопросы и ответы</p>
              <h1 className="font-display text-5xl md:text-6xl font-light text-espresso">FAQ</h1>
            </div>
            <div className="space-y-0 divide-y divide-border">
              {faqs.map((item, i) => (
                <div key={i}>
                  <button
                    className="w-full text-left py-6 flex items-center justify-between gap-4 hover:text-latte transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-body font-light text-base text-espresso">{item.q}</span>
                    <Icon
                      name={openFaq === i ? "Minus" : "Plus"}
                      size={18}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="pb-6 text-muted-foreground leading-relaxed font-light text-sm">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 bg-espresso p-10 text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-cream/50 mb-3">Не нашли ответ?</p>
              <h2 className="font-display text-3xl font-light text-cream mb-6">Напишите нам</h2>
              <button
                onClick={() => navigate("contacts")}
                className="bg-cream text-espresso px-8 py-3 text-sm tracking-widest uppercase hover:bg-latte transition-colors"
              >
                Контакты
              </button>
            </div>
          </div>
        )}

        {/* ============ CONTACTS ============ */}
        {active === "contacts" && (
          <div>
            <div className="bg-espresso py-32 text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-cream/50 mb-4">Свяжитесь с нами</p>
              <h1 className="font-display text-6xl md:text-8xl font-light text-cream">Контакты</h1>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">
              <div className="space-y-10">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "hello@brew-store.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Кофейная, д. 1" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт 10:00–20:00\nСб–Вс 11:00–18:00" },
                ].map((c, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 flex items-center justify-center bg-fog flex-shrink-0">
                      <Icon name={c.icon as "Phone" | "Mail" | "MapPin" | "Clock"} size={18} className="text-latte" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">{c.label}</p>
                      <p className="text-espresso font-light whitespace-pre-line">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-fog p-8">
                <h2 className="font-display text-3xl font-light text-espresso mb-8">Написать нам</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Имя</label>
                    <input
                      className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
                    <input
                      className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Сообщение</label>
                    <textarea
                      rows={4}
                      className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors resize-none"
                      placeholder="Ваш вопрос или пожелание..."
                    />
                  </div>
                  <button className="w-full bg-espresso text-cream py-3.5 text-sm tracking-widest uppercase hover:bg-latte hover:text-espresso transition-colors duration-300">
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl font-light tracking-[0.2em] text-espresso">BREW</span>
          <p className="text-xs text-muted-foreground tracking-wide">© 2026 BREW. Все права защищены.</p>
          <div className="flex gap-6 flex-wrap justify-center">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-espresso transition-colors underline-hover"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= rating ? "#C4A882" : "none"}
          stroke="#C4A882"
          strokeWidth={1.5}
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product: p, onCatalog }: { product: typeof products[0]; onCatalog: () => void }) {
  return (
    <div className="group bg-cream">
      <div className="aspect-square overflow-hidden bg-fog relative">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {p.tag && (
          <span className="absolute top-4 left-4 bg-espresso text-cream text-[10px] tracking-widest uppercase px-3 py-1.5">
            {p.tag}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">{p.category}</p>
        <h3 className="font-display text-2xl font-light text-espresso mb-2">{p.name}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-4 font-light">{p.desc}</p>
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={Math.round(p.rating)} />
          <span className="text-xs text-muted-foreground">{p.rating} ({p.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-body text-lg text-espresso">{p.price}</span>
            {p.oldPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">{p.oldPrice}</span>
            )}
          </div>
          <button
            onClick={onCatalog}
            className="bg-espresso text-cream text-[10px] tracking-widest uppercase px-4 py-2 hover:bg-latte hover:text-espresso transition-colors"
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review: r }: { review: typeof reviews[0] }) {
  return (
    <div className="bg-cream p-7">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-espresso text-cream flex items-center justify-center font-display text-lg font-light">
          {r.avatar}
        </div>
        <div>
          <p className="text-sm font-medium text-espresso">{r.name}</p>
          <p className="text-[10px] tracking-wide text-muted-foreground">{r.date}</p>
        </div>
      </div>
      <StarRating rating={r.rating} />
      <p className="text-[10px] tracking-widest uppercase text-latte mt-3 mb-2">{r.product}</p>
      <p className="text-muted-foreground text-sm leading-relaxed font-light">{r.text}</p>
    </div>
  );
}

function ReviewForm({
  form,
  setForm,
  productNames,
}: {
  form: { name: string; product: string; rating: number; text: string };
  setForm: (f: { name: string; product: string; rating: number; text: string }) => void;
  productNames: string[];
}) {
  return (
    <div className="bg-fog p-8 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Ваше имя</label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors"
            placeholder="Имя"
          />
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Товар</label>
          <select
            value={form.product}
            onChange={e => setForm({ ...form, product: e.target.value })}
            className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors"
          >
            <option value="">Выберите товар</option>
            {productNames.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Оценка</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <button
              key={i}
              onClick={() => setForm({ ...form, rating: i })}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill={i <= form.rating ? "#C4A882" : "none"} stroke="#C4A882" strokeWidth={1.5}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Отзыв</label>
        <textarea
          value={form.text}
          onChange={e => setForm({ ...form, text: e.target.value })}
          rows={4}
          className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors resize-none"
          placeholder="Поделитесь впечатлениями о товаре..."
        />
      </div>
      <button className="bg-espresso text-cream px-8 py-3 text-sm tracking-widest uppercase hover:bg-latte hover:text-espresso transition-colors duration-300">
        Опубликовать отзыв
      </button>
    </div>
  );
}