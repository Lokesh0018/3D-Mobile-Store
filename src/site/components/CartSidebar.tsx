import { useEffect, useState } from 'react';
import { cartStore, useCartItems, useCartOpen } from '../cartStore';

function parsePrice(priceStr: string) {
  const numeric = Number(priceStr.replace(/[^0-9.-]+/g, ""));
  return isNaN(numeric) ? 0 : numeric;
}

function getCurrencySymbol(priceStr: string) {
  const match = priceStr.match(/^[^0-9]+/);
  return match ? match[0].trim() : '₹';
}

function formatPrice(amount: number, symbol: string) {
  return `${symbol}${amount.toLocaleString('en-IN')}`;
}

export default function CartSidebar() {
  const isOpen = useCartOpen();
  const items = useCartItems();
  const [checkoutState, setCheckoutState] = useState<'idle' | 'loading' | 'success'>('idle');

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCheckoutState('idle'); // Reset on open
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const currencySymbol = items.length > 0 ? getCurrencySymbol(items[0].price) : '₹';

  const handleCheckout = () => {
    setCheckoutState('loading');
    setTimeout(() => {
      setCheckoutState('success');
      setTimeout(() => {
        cartStore.clear();
        cartStore.toggleOpen();
      }, 1500);
    }, 1500);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => cartStore.toggleOpen()}
        aria-hidden="true"
      />
      
      {/* Sidebar Panel */}
      <div className="fixed right-0 top-0 z-[110] flex h-screen w-[400px] max-w-[100vw] flex-col bg-surface border-l border-line shadow-2xl transition-transform duration-300 ease-in-out transform translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line p-6">
          <h2 className="font-display text-2xl">Your Cart</h2>
          <button 
            onClick={() => cartStore.toggleOpen()}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-fg/5 transition-colors"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted">
              <svg className="mb-4 h-12 w-12 opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-line bg-bg p-2">
                    <img src={item.imageSrc} alt={item.name} className="h-full w-full object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                    <p className="mt-1 text-sm font-medium text-accent">{item.price}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button 
                        onClick={() => cartStore.decrement(item.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-line hover:border-fg hover:bg-fg/5 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => cartStore.increment(item.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-line hover:border-fg hover:bg-fg/5 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => cartStore.remove(item.id)}
                    className="p-2 text-muted hover:text-red-500 transition-colors self-start"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="border-t border-line bg-surface p-6">
            <div className="mb-4 flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(totalAmount, currencySymbol)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={checkoutState !== 'idle'}
              className="group relative flex w-full items-center justify-center rounded-full bg-fg px-6 py-3.5 text-[15px] font-semibold text-bg transition-colors hover:bg-fg/90 disabled:opacity-90 disabled:cursor-wait overflow-hidden"
            >
              <span className={`transition-all duration-300 ${checkoutState !== 'idle' ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
                Checkout
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${checkoutState === 'loading' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <svg className="animate-spin h-5 w-5 text-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${checkoutState === 'success' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <svg className="h-5 w-5 text-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
