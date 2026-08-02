'use client';

import { useEffect, type MutableRefObject } from 'react';

/**
 * Wires up standard fullscreen-modal behavior for any `isOpen` boolean:
 * - locks body scroll while open
 * - focuses the given close-button ref on open
 * - closes on Escape
 * - returns focus to whatever triggered the modal, on close
 *
 * Usage: const closeButtonRef = useRef<HTMLButtonElement>(null);
 *        useModalBehavior(!!activeItem, onClose, closeButtonRef, returnFocusRef);
 */
export function useModalBehavior(
  isOpen: boolean,
  onClose: () => void,
  closeButtonRef: MutableRefObject<HTMLButtonElement | null>,
  returnFocusRef: MutableRefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      returnFocusRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
}
