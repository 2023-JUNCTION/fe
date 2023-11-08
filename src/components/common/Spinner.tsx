import React from 'react';
import styles from './Spinner.module.scss';

type Props = {
  isActive?: boolean;
};
const Spinner = ({ isActive = true }: Props, parentRef?: React.LegacyRef<HTMLDivElement> | undefined) => {
  if (!isActive) return null;

  return (
    <div className={styles.loading} ref={parentRef}>
      <div className={styles.spinner}>
        <div className={styles.double_bounce1} />
        <div className={styles.double_bounce2} />
      </div>
    </div>
  );
};

export default React.forwardRef(Spinner);
