import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { products, siteReviews, faqs, Section, FilterType, CartItem, Product, MACHINE_IMG, GRINDER_IMG } from '@/components/shared/types';
import { CartDrawer, CheckoutModal } from '@/components/shared/CartDrawer';
import { ProductCard, ReviewCard, ReviewForm } from '@/components/shared/ProductCard';

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [filter, setFilter] = useState<FilterType>("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: "", product: "", rating: 5, text: "" });
  const [mobileOpen, setMobileOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

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
    setCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.product.id !== id));

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev
      .map(i => i.product.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    );
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price_int * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="font-display text-2xl font-light tracking-[0.2em] text-espresso hover:text-latte transition-colors">
            MyBarista
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button key={item.id} onClick={() => navigate(item.id)}
                className={`text-sm tracking-widest uppercase underline-hover transition-colors ${active === item.id ? "text-espresso font-medium" : "text-muted-foreground hover:text-espresso"}`}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setCartOpen(true)} className="relative text-espresso hover:text-latte transition-colors">
              <Icon name="ShoppingBag" size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-espresso text-cream text-[10px] rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-espresso" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-cream border-t border-border px-6 py-4 flex flex-col gap-4">
            {navItems.map(item => (
              <button key={item.id} onClick={() => navigate(item.id)}
                className={`text-left text-sm tracking-widest uppercase py-1 transition-colors ${active === item.id ? "text-espresso font-medium" : "text-muted-foreground"}`}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          cartTotal={cartTotal}
          formatPrice={formatPrice}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
      )}

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          cartTotal={cartTotal}
          formatPrice={formatPrice}
          onClose={() => setCheckoutOpen(false)}
          onSuccess={() => {
            setCart([]);
            setCheckoutOpen(false);
          }}
        />
      )}

      <main className="pt-16">
        {/* ============ HOME ============ */}
        {active === "home" && (
          <div>
            <section className="min-h-[92vh] flex items-center relative overflow-hidden bg-cream">
              <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center py-20">
                <div>
                  <p className="animate-fade-up text-xs tracking-[0.35em] uppercase text-muted-foreground mb-6">Премиальное кофейное оборудование</p>
                  <h1 className="animate-fade-up-delay font-display text-6xl md:text-8xl font-light leading-[1.0] text-espresso mb-8">
                    Каждая<br /><em className="italic">чашка</em><br />— шедевр
                  </h1>
                  <p className="animate-fade-up-delay2 text-muted-foreground text-base leading-relaxed max-w-sm mb-10 font-body font-light">
                    Кофемолки и кофемашины для тех, кто понимает разницу между просто кофе и настоящим кофе.
                  </p>
                  <div className="animate-fade-up-delay3 flex gap-4 flex-wrap">
                    <button onClick={() => navigate("catalog")} className="bg-espresso text-cream px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-latte hover:text-espresso transition-colors duration-300">Каталог</button>
                    <button onClick={() => navigate("about")} className="border border-espresso text-espresso px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-espresso hover:text-cream transition-colors duration-300">О бренде</button>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full aspect-square overflow-hidden bg-fog">
                    <img src={MACHINE_IMG} alt="Кофемашина" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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
                {[{ num: "6+", label: "Лет на рынке" }, { num: "500+", label: "Клиентов" }, { num: "24", label: "Модели техники" }, { num: "2", label: "Года гарантии" }].map((s, i) => (
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
                <button onClick={() => navigate("catalog")} className="text-sm tracking-widest uppercase underline-hover text-muted-foreground hover:text-espresso transition-colors hidden md:block">Весь каталог →</button>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {products.slice(0, 3).map(p => <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />)}
              </div>
            </section>

            <section className="bg-fog py-24">
              <div className="max-w-6xl mx-auto px-6">
                <div className="mb-16">
                  <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">Мнения</p>
                  <h2 className="font-display text-5xl font-light text-espresso">Отзывы клиентов</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {siteReviews.map(r => <ReviewCard key={r.id} review={r} />)}
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
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-5 py-2 text-xs tracking-widest uppercase transition-colors ${filter === f ? "bg-espresso text-cream" : "border border-border text-muted-foreground hover:border-espresso hover:text-espresso"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {filtered.map(p => <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />)}
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
                  <p className="text-muted-foreground leading-relaxed mb-4 font-light">BREW — это магазин для настоящих ценителей кофейной культуры. Мы начали в 2018 году с простой идеи: помочь людям пить хороший кофе дома, не жертвуя качеством ради удобства.</p>
                  <p className="text-muted-foreground leading-relaxed font-light">Сегодня мы предлагаем тщательно отобранную коллекцию кофемолок и кофемашин — только то оборудование, которое прошло нашу личную проверку.</p>
                </div>
                <div className="aspect-[4/3] overflow-hidden bg-fog">
                  <img src={GRINDER_IMG} alt="О бренде" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[{ icon: "Award", title: "Качество", desc: "Каждая позиция проходит личный отбор команды BREW." }, { icon: "Headphones", title: "Поддержка", desc: "Помогаем выбрать, настроить и обслужить технику." }, { icon: "Truck", title: "Доставка", desc: "Быстрая доставка по всей России с гарантией сохранности." }].map((v, i) => (
                  <div key={i} className="p-8 bg-fog">
                    <Icon name={v.icon as "Award" | "Headphones" | "Truck"} size={24} className="text-latte mb-4" />
                    <h3 className="font-display text-2xl font-light text-espresso mb-3">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">{v.desc}</p>
                  </div>
                ))}
              </div>
              <div className="border-l-2 border-latte pl-8">
                <blockquote className="font-display text-3xl font-light italic text-espresso leading-snug">"Хороший кофе начинается с правильного оборудования. Мы здесь, чтобы помочь вам его найти."</blockquote>
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
            <div className="divide-y divide-border">
              {faqs.map((item, i) => (
                <div key={i}>
                  <button className="w-full text-left py-6 flex items-center justify-between gap-4 hover:text-latte transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-body font-light text-base text-espresso">{item.q}</span>
                    <Icon name={openFaq === i ? "Minus" : "Plus"} size={18} className="text-muted-foreground flex-shrink-0" />
                  </button>
                  {openFaq === i && <div className="pb-6 text-muted-foreground leading-relaxed font-light text-sm">{item.a}</div>}
                </div>
              ))}
            </div>
            <div className="mt-16 bg-espresso p-10 text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-cream/50 mb-3">Не нашли ответ?</p>
              <h2 className="font-display text-3xl font-light text-cream mb-6">Напишите нам</h2>
              <button onClick={() => navigate("contacts")} className="bg-cream text-espresso px-8 py-3 text-sm tracking-widest uppercase hover:bg-latte transition-colors">Контакты</button>
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
                {[{ icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" }, { icon: "Mail", label: "Email", value: "hello@brew-store.ru" }, { icon: "MapPin", label: "Адрес", value: "Москва, ул. Кофейная, д. 1" }, { icon: "Clock", label: "Режим работы", value: "Пн–Пт 10:00–20:00\nСб–Вс 11:00–18:00" }].map((c, i) => (
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
                    <input className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
                    <input className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Сообщение</label>
                    <textarea rows={4} className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors resize-none" placeholder="Ваш вопрос или пожелание..." />
                  </div>
                  <button className="w-full bg-espresso text-cream py-3.5 text-sm tracking-widest uppercase hover:bg-latte hover:text-espresso transition-colors duration-300">Отправить</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl font-light tracking-[0.2em] text-espresso">MyBarista</span>
          <p className="text-xs text-muted-foreground tracking-wide">© 2026 MyBarista. Все права защищены.</p>
          <div className="flex gap-6 flex-wrap justify-center">
            {navItems.map(item => (
              <button key={item.id} onClick={() => navigate(item.id)} className="text-xs tracking-widest uppercase text-muted-foreground hover:text-espresso transition-colors underline-hover">{item.label}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
