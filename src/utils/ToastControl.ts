import React, { AriaRole, SetStateAction } from 'react';

const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export type ToastType = 'success' | 'error';

export type ToastRole = Extract<AriaRole, 'alert' | 'status'>;

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
  role: ToastRole;
};

type SetToastItems = React.Dispatch<SetStateAction<ToastItem[]>>;

export type ToastPosition = 'top' | 'bottom';

class ToastControl {
  // eslint-disable-next-line class-methods-use-this
  setToastItems: SetToastItems = () => null;

  constructor(setState: SetToastItems | null) {
    if (setState) this.setToastItems = setState;
  }

  addToastItem({ type, message, role }: Omit<ToastItem, 'id'>): void {
    this.setToastItems((state: ToastItem[]) => [
      {
        id: uuid(),
        type,
        message,
        role,
      },
      ...state,
    ]);
  }

  removeToastItem(toastId: ToastItem['id']): void {
    this.setToastItems((state: ToastItem[]) => state.filter(({ id }) => id !== toastId));
  }

  removeToastItemAll() {
    this.setToastItems([]);
  }

  success(message: ToastItem['message'], role: ToastRole = 'status'): void {
    this.addToastItem({ type: 'success', message, role });
  }

  error(message: ToastItem['message'], role: ToastRole = 'status'): void {
    this.addToastItem({ type: 'error', message, role });
  }
}

export default ToastControl;
