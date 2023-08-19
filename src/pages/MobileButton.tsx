import React, { useCallback, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Button } from '~/components';

import { API } from '~/api';
import styles from './MobileButton.module.scss';

const MobileButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickButton = useCallback(() => {
    setIsClicked(true);
  }, []);

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => setIsClicked(false), 1000);
      API.Kiosk.postCompleteOrders();
    }
  }, [isClicked]);

  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={handleClickButton}>
        <CSSTransition
          in={isClicked}
          timeout={300}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enter_active,
            exit: styles.exit,
            exitActive: styles.exit_active,
          }}
          unmountOnExit
        >
          <div className={styles.title}>SUCCESS!</div>
        </CSSTransition>
        <img src="/button.png" alt="button" width="168px" height="168px" />
      </Button>
    </div>
  );
};

export default MobileButton;
