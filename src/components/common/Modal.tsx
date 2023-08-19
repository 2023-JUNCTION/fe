/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from './Portal';

import styles from './Modal.module.scss';

type Props = {
  children: ReactNode;
  handleCloseModal: () => void;
  closeOnClickOverlay?: boolean;
  closeOnEsc?: boolean;
  isOpen: boolean;
};

const Modal = ({ children, handleCloseModal, closeOnClickOverlay = true, closeOnEsc = true, isOpen }: Props) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const handleModalCloseWithEscHandler = ({ key }: KeyboardEvent) => {
      let scheduledAnimationFrame = false;

      if (scheduledAnimationFrame) {
        return;
      }

      scheduledAnimationFrame = true;

      if (key === 'Escape') {
        handleCloseModal();
        scheduledAnimationFrame = false;
      }
    };

    if (closeOnEsc) {
      window.addEventListener('keyup', handleModalCloseWithEscHandler);
      return () => window.removeEventListener('keyup', handleModalCloseWithEscHandler);
    }
  }, [handleCloseModal]);

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enter_active,
          exit: styles.exit,
          exitActive: styles.exit_active,
        }}
        unmountOnExit
      >
        <div
          className={styles.modal}
          onClick={e => {
            if (e.target === e.currentTarget && closeOnClickOverlay) {
              handleCloseModal();
            }
          }}
        >
          <div className={styles.dialog}>{children}</div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;
