import React, { useCallback, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { API } from '~/api';
import { Button } from '~/components';
import { capitalize } from '~/utils';
import { Line, Minus, Plus } from '~/assets';

import styles from './Kiosk.module.scss';

const MENUS = ['burger', 'fries', 'coke'];

type MenuType = {
  id: number;
  count: number;
};

const DEFAULT_MENUS = [
  {
    id: 0,
    count: 0,
  },
  {
    id: 1,
    count: 0,
  },
  {
    id: 2,
    count: 0,
  },
];

const Kiosk = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const convertOrderToBase64 = async () => {
    pageRef.current!.style.transform = 'rotate(90deg)';
    const canvas = await html2canvas(pageRef.current!, {
      width: 250,
      height: 122,
      scale: 1,
    });
    pageRef.current!.style.transform = 'rotate(0deg)';
    const imageFile = canvas.toDataURL('image/png', 0.5);
    return imageFile;
  };
  const [menus, setMenus] = useState<MenuType[]>(DEFAULT_MENUS);

  const handleCount = useCallback((id: number, isPlus: boolean) => {
    setMenus(prev => {
      return prev.reduce<MenuType[]>((acc, cur, index) => {
        if (id === index) {
          return [
            ...acc,
            {
              ...cur,
              count: isPlus ? Math.min(cur.count + 1, 5) : Math.max(cur.count - 1, 0),
            },
          ];
        }
        return [...acc, cur];
      }, []);
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    const png = await convertOrderToBase64();
    API.Kiosk.postOrders({
      menus: [
        {
          id: 1,
          count: 2,
        },
      ],
      eslImage: png.replace('data:image/png;base64,', ''),
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu_area}>
          {MENUS.map((item, index) => (
            <div className={styles.menu_item}>
              <div className={styles.title}>{capitalize(item)}</div>
              <Button
                className={styles.box}
                onClick={() => handleCount(index, true)}
                disabled={menus[index].count >= 5}
              >
                <img src={`/${item}.png`} alt={item} width="122px" height="122px" />
              </Button>
              <div className={styles.count}>
                <Button onClick={() => handleCount(index, false)} disabled={menus[index].count < 0}>
                  <Minus />
                </Button>
                <div className={styles.count_text}>{menus[index].count}</div>
                <Button onClick={() => handleCount(index, true)}>
                  <Plus />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          className={styles.order_button}
          // onClick={() => setIsOpen(true)}
          onClick={handleSubmit}
          disabled={menus.every(item => item.count === 0)}
        >
          Order
        </Button>
      </div>
      <div className={styles.receipt} ref={pageRef}>
        <div className={styles.receipt_title}>Receipt #1</div>
        <div className={styles.receipt_sub_title}>JunctionFastfood</div>
        <Line />
        <div className={styles.space} />
        <Line />
        <div className={styles.row}>
          <div>ITEM</div>
          <div>QTY</div>
        </div>
        <div className={styles.content}>
          {!!menus[1].count && (
            <div className={styles.line}>
              <div>Fries</div>
              <div className={styles.count}>{menus[1].count}</div>
            </div>
          )}
          {!!menus[0].count && (
            <div className={styles.line}>
              <div>Burger</div>
              <div className={styles.count}>{menus[0].count}</div>
            </div>
          )}
          {!!menus[2].count && (
            <div className={styles.line}>
              <div>Coke</div>
              <div className={styles.count}>{menus[2].count}</div>
            </div>
          )}
        </div>
        <Line className={styles.last_line} />
      </div>
    </>
  );
};

export default Kiosk;
