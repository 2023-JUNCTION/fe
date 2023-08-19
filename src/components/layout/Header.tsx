import { useState } from 'react';
import cn from 'classnames';
import { Button } from '../common';

import styles from './Header.module.scss';

const Header = () => {
  const [currentPage, setCurrentPage] = useState('Order Status');

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="logo" width="220px" />
      </div>
      <div className={cn(styles.title, styles.title_small)}>TITLE</div>
      <nav className={cn(styles.navigation, styles.navigation_small)}>
        <ul>
          {['Order Status', 'Analysis', 'Manage'].map(item => (
            <Button className={styles.button} onClick={() => setCurrentPage(item)}>
              <span className={cn(item === currentPage && styles.active)}>{item}</span>
            </Button>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
