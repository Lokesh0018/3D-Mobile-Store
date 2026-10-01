import { useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { cartStore } from '../cartStore';

export default function CartAnimation() {
  const [animations, setAnimations] = useState<{id: number; src: string; rect: DOMRect}[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const unsubscribe = cartStore.onAdd((imageSrc, rect) => {
      const id = idCounter++;
      setAnimations(prev => [...prev, { id, src: imageSrc, rect }]);
      
      // Animate after small delay to let it render
      setTimeout(() => {
        const el = document.getElementById(`cart-anim-${id}`);
        const cartEl = document.getElementById('cart-icon');
        if (el && cartEl) {
          const cartRect = cartEl.getBoundingClientRect();
          const cartCenterX = cartRect.left + cartRect.width / 2;
          const cartCenterY = cartRect.top + cartRect.height / 2;
          
          const rectCenterX = rect.left + rect.width / 2;
          const rectCenterY = rect.top + rect.height / 2;

          gsap.to(el, {
            x: cartCenterX - rectCenterX,
            y: cartCenterY - rectCenterY,
            scale: 0.1,
            opacity: 0.3,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              setAnimations(prev => prev.filter(a => a.id !== id));
            }
          });
        }
      }, 50);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {animations.map(a => (
        <img
          key={a.id}
          id={`cart-anim-${a.id}`}
          src={a.src}
          style={{
            position: 'fixed',
            top: a.rect.top,
            left: a.rect.left,
            width: a.rect.width,
            height: a.rect.height,
            objectFit: 'contain',
            zIndex: 9999,
            pointerEvents: 'none'
          }}
          alt=""
        />
      ))}
    </>
  );
}
