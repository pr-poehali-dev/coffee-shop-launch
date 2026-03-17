export const GRINDER_IMG = "https://cdn.poehali.dev/projects/645395a1-c50d-41a2-b8f1-2022e185c443/files/d069ec47-5f7a-44ab-bb1a-a1cc0be0daa8.jpg";
export const MACHINE_IMG = "https://cdn.poehali.dev/projects/645395a1-c50d-41a2-b8f1-2022e185c443/files/7088c29a-399e-4705-a81e-8674cf0bc4b1.jpg";
export const ORDER_API = "https://functions.poehali.dev/3736f9a3-dd5e-42db-921f-8139b6dc46c6";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  price_int: number;
  oldPrice: string | null;
  rating: number;
  reviews: number;
  image: string;
  tag: string | null;
  desc: string;
};

export type CartItem = { product: Product; qty: number };

export type Section = "home" | "catalog" | "about" | "faq" | "contacts";
export type FilterType = "Все" | "Кофемолки" | "Кофемашины";

export const products: Product[] = [
  { id: 1, name: "Moka Pro X1", category: "Кофемолка", price: "12 900 ₽", price_int: 12900, oldPrice: "15 900 ₽", rating: 4.8, reviews: 34, image: GRINDER_IMG, tag: "Хит продаж", desc: "Конусные жернова из нержавеющей стали, 15 степеней помола, таймер дозирования." },
  { id: 2, name: "Aero Slim", category: "Кофемолка", price: "8 400 ₽", price_int: 8400, oldPrice: null, rating: 4.6, reviews: 18, image: GRINDER_IMG, tag: null, desc: "Компактная электрическая кофемолка для дома. Плоские жернова 40 мм." },
  { id: 3, name: "Espresso Casa", category: "Кофемашина", price: "34 900 ₽", price_int: 34900, oldPrice: "39 900 ₽", rating: 4.9, reviews: 57, image: MACHINE_IMG, tag: "Новинка", desc: "Полностью автоматическая машина с капучинатором, давление 19 бар." },
  { id: 4, name: "Brew Station V2", category: "Кофемашина", price: "22 500 ₽", price_int: 22500, oldPrice: null, rating: 4.7, reviews: 42, image: MACHINE_IMG, tag: null, desc: "Рожковая кофемашина с паровым капучинатором. Нагрев 45 секунд." },
  { id: 5, name: "Grind Master 500", category: "Кофемолка", price: "18 200 ₽", price_int: 18200, oldPrice: null, rating: 4.5, reviews: 22, image: GRINDER_IMG, tag: null, desc: "Профессиональная кофемолка с дозатором. 60 делений регулировки помола." },
  { id: 6, name: "Lungo Home", category: "Кофемашина", price: "16 800 ₽", price_int: 16800, oldPrice: "19 900 ₽", rating: 4.4, reviews: 29, image: MACHINE_IMG, tag: "Скидка", desc: "Капсульная кофемашина с встроенным контейнером для молока." },
];

export const siteReviews = [
  { id: 1, name: "Алексей М.", rating: 5, date: "15 февраля 2026", product: "Espresso Casa", text: "Отличная машина! Варит просто восхитительный эспрессо. Рекомендую всем любителям кофе.", avatar: "А" },
  { id: 2, name: "Елена В.", rating: 5, date: "3 января 2026", product: "Moka Pro X1", text: "Пользуюсь три месяца — качество помола стабильное, тихая работа. Кофе намного вкуснее.", avatar: "Е" },
  { id: 3, name: "Дмитрий К.", rating: 4, date: "21 декабря 2025", product: "Brew Station V2", text: "Красивый дизайн, быстро нагревается. Единственный минус — шумновата при прогреве.", avatar: "Д" },
];

export const faqs = [
  { q: "Какая гарантия на технику?", a: "На все кофемолки и кофемашины предоставляется гарантия 2 года от производителя. Мы также предлагаем расширенную гарантию на 3 года по запросу." },
  { q: "Как выбрать кофемолку под свои нужды?", a: "Для эспрессо нужна кофемолка с конусными жерновами и тонкой регулировкой. Для фильтра и аэропресса подойдут модели с плоскими жерновами. Напишите нам — подберём оптимальный вариант." },
  { q: "Осуществляете ли вы доставку?", a: "Да, доставляем по всей России. Москва и область — 1-2 дня, регионы — 3-7 рабочих дней. Доставка бесплатна при заказе от 10 000 ₽." },
  { q: "Можно ли вернуть товар?", a: "Да, в течение 14 дней с момента получения вы можете вернуть товар в оригинальной упаковке без следов использования." },
  { q: "Есть ли у вас сервисный центр?", a: "Да, мы имеем собственный сервисный центр в Москве. Принимаем технику на ремонт и обслуживание как в гарантийный, так и в послегарантийный период." },
];
