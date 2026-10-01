import { cartStore, useCartCount } from '../cartStore';

export default function CartIcon() {
  const count = useCartCount();
  return (
    <button 
      id="cart-icon" 
      onClick={() => cartStore.toggleOpen()}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-line text-fg transition-colors hover:bg-accent hover:text-accent-fg cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-fg">
          {count}
        </span>
      )}
    </button>
  );
}
