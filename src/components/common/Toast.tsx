import { useCallback, useEffect, useRef, useState } from 'react';
import ToastControl, { ToastItem } from '~/utils/ToastControl';

import styles from './Toast.module.scss';

type ToastBarProps = {
  toastItem: ToastItem;
  onRemoveToastItem: (id: string) => void;
  height: number;
  delay: number;
};

const ToastBar = ({ toastItem, onRemoveToastItem, height, delay }: ToastBarProps) => {
  const toastBarElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setOpacity = async (opacity: number, duration: number) => {
      if (toastBarElement.current && toastBarElement.current.style) {
        toastBarElement.current.style.transition = `all ${duration}ms`;

        if (opacity === 0) {
          toastBarElement.current.style.transform = `translate(0%, ${height}px)`;
        } else {
          toastBarElement.current.style.transform = `translate(0%, -${height}px)`;
        }
        toastBarElement.current.style.opacity = `${opacity}`;
      }
    };
    window.requestAnimationFrame(() => setOpacity(1, 500));

    const timeoutForRemove = setTimeout(() => {
      onRemoveToastItem(toastItem.id);
    }, delay);

    const timeoutForOpacity = setTimeout(() => {
      setOpacity(0, 500);
    }, delay - 500);

    return () => {
      clearTimeout(timeoutForRemove);
      clearTimeout(timeoutForOpacity);
    };
  }, [toastItem, onRemoveToastItem, height, delay]);

  return (
    <div ref={toastBarElement} role={toastItem.role} className={styles.toast_bar}>
      {toastItem.message}
    </div>
  );
};

// eslint-disable-next-line import/no-mutable-exports
export let toast: ToastControl = new ToastControl(null);

export type Props = {
  height?: number;
  delay?: number;
};

const Toast = ({ height = 50, delay = 4000 }: Props) => {
  const [toastItems, setToastItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    toast = new ToastControl(setToastItems);
  }, []);

  const removeToastItem = useCallback((toastId: ToastItem['id']) => {
    toast.removeToastItem(toastId);
  }, []);

  return (
    <div className={styles.toast}>
      {toastItems.map(toastItem => (
        <ToastBar
          toastItem={toastItem}
          onRemoveToastItem={removeToastItem}
          key={toastItem.id}
          height={height}
          delay={delay}
        />
      ))}
    </div>
  );
};

export default Toast;
