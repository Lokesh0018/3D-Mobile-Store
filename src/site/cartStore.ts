import { useSyncExternalStore } from 'react';

type CartItem = { id: string; imageSrc: string; name: string; price: string; quantity: number };
let items: CartItem[] = [];
let isCartOpen = false;
const listeners = new Set<() => void>();
let onAddListeners = new Set<(imageSrc: string, rect: DOMRect) => void>();

export const cartStore = {
  add: (imageSrc: string, rect: DOMRect, name: string = "Product", price: string = "₹XX,XXX") => {
    const existing = items.find(i => i.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ id: Math.random().toString(36).substring(7), imageSrc, name, price, quantity: 1 });
    }
    listeners.forEach(l => l());
    onAddListeners.forEach(l => l(imageSrc, rect));
  },
  decrement: (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        items = items.filter(i => i.id !== id);
      }
      listeners.forEach(l => l());
    }
  },
  increment: (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity += 1;
      listeners.forEach(l => l());
    }
  },
  remove: (id: string) => {
    items = items.filter(i => i.id !== id);
    listeners.forEach(l => l());
  },
  toggleOpen: () => {
    isCartOpen = !isCartOpen;
    listeners.forEach(l => l());
  },
  clear: () => {
    items = [];
    listeners.forEach(l => l());
  },
  getItems: () => items,
  getIsOpen: () => isCartOpen,
  getCount: () => items.reduce((sum, item) => sum + item.quantity, 0),
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  onAdd: (l: (imageSrc: string, rect: DOMRect) => void) => {
    onAddListeners.add(l);
    return () => onAddListeners.delete(l);
  }
};

export function useCartCount() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getCount);
}

export function useCartItems() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getItems);
}

export function useCartOpen() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getIsOpen);
}
