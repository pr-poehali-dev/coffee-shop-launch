import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { CartItem, ORDER_API } from './types';

type CartDrawerProps = {
  cart: CartItem[];
  cartTotal: number;
  formatPrice: (n: number) => string;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
  onCheckout: () => void;
};

export function CartDrawer({ cart, cartTotal, formatPrice, onClose, onRemove, onUpdateQty, onCheckout }: CartDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-full max-w-md bg-cream flex flex-col h-full shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-display text-2xl font-light text-espresso">Корзина</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-espresso">
            <Icon name="X" size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <Icon name="ShoppingBag" size={48} />
            <p className="text-sm tracking-widest uppercase">Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.map(({ product: p, qty }) => (
                <div key={p.id} className="flex gap-4 items-start">
                  <div className="w-20 h-20 bg-fog flex-shrink-0 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-espresso truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">{p.price}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQty(p.id, -1)} className="w-7 h-7 border border-border flex items-center justify-center text-espresso hover:bg-fog transition-colors">
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="text-sm w-4 text-center">{qty}</span>
                      <button onClick={() => onUpdateQty(p.id, 1)} className="w-7 h-7 border border-border flex items-center justify-center text-espresso hover:bg-fog transition-colors">
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-espresso font-medium">{formatPrice(p.price_int * qty)}</p>
                    <button onClick={() => onRemove(p.id)} className="text-muted-foreground hover:text-espresso mt-1">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-border">
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">Итого</span>
                <span className="font-display text-2xl font-light text-espresso">{formatPrice(cartTotal)}</span>
              </div>
              <button onClick={onCheckout}
                className="w-full bg-espresso text-cream py-4 text-sm tracking-widest uppercase hover:bg-latte hover:text-espresso transition-colors duration-300">
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

type CheckoutModalProps = {
  cart: CartItem[];
  cartTotal: number;
  formatPrice: (n: number) => string;
  onClose: () => void;
  onSuccess: () => void;
};

export function CheckoutModal({ cart, cartTotal, formatPrice, onClose, onSuccess }: CheckoutModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", comment: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ order_id: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const items = cart.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, price_int: i.product.price_int, qty: i.qty }));
      const res = await fetch(ORDER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, total_price: cartTotal }),
      });
      const data = await res.json();
      const parsed = typeof data === 'string' ? JSON.parse(data) : data;
      if (parsed.success) {
        setSuccess({ order_id: parsed.order_id });
        onSuccess();
      } else {
        setError(parsed.error || "Ошибка при оформлении заказа");
      }
    } catch {
      setError("Не удалось соединиться с сервером. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-cream w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {success ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-espresso flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={28} className="text-cream" />
            </div>
            <h2 className="font-display text-4xl font-light text-espresso mb-3">Заказ оформлен!</h2>
            <p className="text-muted-foreground mb-2">Номер заказа: <span className="text-espresso font-medium">#{success.order_id}</span></p>
            <p className="text-muted-foreground text-sm mb-8">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
            <button onClick={onClose} className="bg-espresso text-cream px-8 py-3 text-sm tracking-widest uppercase hover:bg-latte hover:text-espresso transition-colors">Закрыть</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between px-8 pt-8 pb-5 border-b border-border">
              <h2 className="font-display text-3xl font-light text-espresso">Оформление заказа</h2>
              <button type="button" onClick={onClose} className="text-muted-foreground hover:text-espresso"><Icon name="X" size={20} /></button>
            </div>

            <div className="px-8 py-5 bg-fog border-b border-border">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Ваш заказ</p>
              {cart.map(({ product: p, qty }) => (
                <div key={p.id} className="flex justify-between text-sm py-1">
                  <span className="text-espresso">{p.name} × {qty}</span>
                  <span className="text-muted-foreground">{formatPrice(p.price_int * qty)}</span>
                </div>
              ))}
              <div className="flex justify-between mt-3 pt-3 border-t border-border">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">Итого</span>
                <span className="font-display text-xl text-espresso">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="px-8 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Имя *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Телефон *</label>
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="+7 (999) 000-00-00" />
                </div>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Адрес доставки</label>
                <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                  className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="Город, улица, дом, квартира" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Комментарий</label>
                <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
                  rows={2} className="w-full border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors resize-none" placeholder="Пожелания к заказу..." />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full bg-espresso text-cream py-4 text-sm tracking-widest uppercase hover:bg-latte hover:text-espresso transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Оформляем..." : "Подтвердить заказ"}
              </button>
              <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
