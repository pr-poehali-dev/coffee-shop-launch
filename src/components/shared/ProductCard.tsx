import { useState } from 'react';
import { Product, siteReviews } from './types';

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? "#C4A882" : "none"} stroke="#C4A882" strokeWidth={1.5}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export function ProductCard({ product: p, onAdd }: { product: Product; onAdd: () => void }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-cream">
      <div className="aspect-square overflow-hidden bg-fog relative">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {p.tag && <span className="absolute top-4 left-4 bg-espresso text-cream text-[10px] tracking-widest uppercase px-3 py-1.5">{p.tag}</span>}
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
            {p.oldPrice && <span className="text-xs text-muted-foreground line-through ml-2">{p.oldPrice}</span>}
          </div>
          <button onClick={handleAdd}
            className={`text-[10px] tracking-widest uppercase px-4 py-2 transition-colors ${added ? "bg-latte text-espresso" : "bg-espresso text-cream hover:bg-latte hover:text-espresso"}`}>
            {added ? "Добавлено ✓" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReviewCard({ review: r }: { review: typeof siteReviews[0] }) {
  return (
    <div className="bg-cream p-7">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-espresso text-cream flex items-center justify-center font-display text-lg font-light">{r.avatar}</div>
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

export function ReviewForm({ form, setForm, productNames }: {
  form: { name: string; product: string; rating: number; text: string };
  setForm: (f: { name: string; product: string; rating: number; text: string }) => void;
  productNames: string[];
}) {
  return (
    <div className="bg-fog p-8 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Ваше имя</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="Имя" />
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Товар</label>
          <select value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}
            className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors">
            <option value="">Выберите товар</option>
            {productNames.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Оценка</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <button key={i} type="button" onClick={() => setForm({ ...form, rating: i })}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill={i <= form.rating ? "#C4A882" : "none"} stroke="#C4A882" strokeWidth={1.5}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Отзыв</label>
        <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })}
          rows={4} className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors resize-none" placeholder="Поделитесь впечатлениями о товаре..." />
      </div>
      <button className="bg-espresso text-cream px-8 py-3 text-sm tracking-widest uppercase hover:bg-latte hover:text-espresso transition-colors duration-300">
        Опубликовать отзыв
      </button>
    </div>
  );
}
