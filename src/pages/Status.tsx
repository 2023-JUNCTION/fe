import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperType } from 'swiper';
import Header from '~/components/layout/Header';
import { API } from '~/api';
import { OrderResponse } from '~/api/transports/Status';
import { Button, toast } from '~/components';
import { ArrowFirst, ArrowSecond, ArrowThird } from '~/assets';

import 'swiper/css';

import styles from './Status.module.scss';

type OrderType = {
  done: OrderResponse[];
  status: OrderResponse[];
  backOrder: OrderResponse[];
};

type SwiperObjectType = {
  enabled: boolean;
} & SwiperType;

const DEFAULT_DATA = {
  done: [],
  status: [],
  backOrder: [],
};

const MOCK_DATA = {
  done: [
    {
      id: 1,
      orderMenu: [
        {
          id: 0,
          menuId: 0,
          menuName: 'Burger',
          menuCount: 1,
        },
        {
          id: 0,
          menuId: 0,
          menuName: 'Fried',
          menuCount: 1,
        },
        {
          id: 0,
          menuId: 0,
          menuName: 'Coke',
          menuCount: 1,
        },
      ],
      done: true,
      remainTime: 15,
    },
  ],
  status: [
    {
      id: 2,
      orderMenu: [
        {
          id: 0,
          menuId: 0,
          menuName: 'Burger',
          menuCount: 2,
        },
        {
          id: 0,
          menuId: 0,
          menuName: 'Coke',
          menuCount: 1,
        },
      ],
      done: true,
      remainTime: 13,
    },
    {
      id: 3,
      orderMenu: [
        {
          id: 0,
          menuId: 0,
          menuName: 'Coke',
          menuCount: 5,
          remainTime: 12,
        },
      ],
      done: true,
      remainTime: 20,
    },
    {
      id: 4,
      orderMenu: [
        {
          id: 0,
          menuId: 0,
          menuName: 'Burger',
          menuCount: 1,
        },
        {
          id: 0,
          menuId: 0,
          menuName: 'Fried',
          menuCount: 1,
        },
        {
          id: 0,
          menuId: 0,
          menuName: 'Coke',
          menuCount: 3,
        },
      ],
      done: true,
      remainTime: 13,
    },
    {
      id: 5,
      orderMenu: [
        {
          id: 0,
          menuId: 0,
          menuName: 'Burger',
          menuCount: 1,
        },
        {
          id: 0,
          menuId: 0,
          menuName: 'Fried',
          menuCount: 5,
        },
        {
          id: 0,
          menuId: 0,
          menuName: 'Coke',
          menuCount: 1,
        },
      ],
      done: true,
      remainTime: 16,
    },
  ],
  backOrder: [
    {
      id: 4,
      orderMenu: [
        {
          id: 0,
          menuId: 0,
          menuName: 'Fried',
          menuCount: 1,
        },
      ],
      done: true,
      remainTime: 4,
    },
    {
      id: 5,
      orderMenu: [
        {
          id: 0,
          menuId: 0,
          menuName: 'Fried',
          menuCount: 1,
        },
        {
          id: 0,
          menuId: 0,
          menuName: 'Burger',
          menuCount: 1,
        },
      ],
      done: true,
      remainTime: 14,
    },
  ],
};

const DoneCard = ({ id, orderMenu, onClick }: OrderResponse & { onClick: () => void }) => {
  return (
    <div className={styles.done_receipt}>
      <div className={styles.done_receipt_title}>#{String(id).padStart(3, '0')}</div>
      <div className={styles.title_line} />
      <div className={styles.content}>
        {orderMenu.map(item => (
          <div className={styles.line}>
            <div>{item.menuName}</div>
            <div className={styles.count}>{item.menuCount}</div>
          </div>
        ))}
      </div>
      <Button className={styles.button} onClick={onClick}>
        bring back to current work
      </Button>
    </div>
  );
};

const BackOrderCard = ({ id, orderMenu }: OrderResponse) => {
  return (
    <div className={styles.back_order_receipt}>
      <div className={styles.back_order_receipt_title}>#{String(id).padStart(3, '0')}</div>
      <div className={styles.title_line} />
      <div className={styles.content}>
        {orderMenu.map(item => (
          <div className={styles.line}>
            <div>{item.menuName}</div>
            <div className={styles.count}>{item.menuCount}</div>
          </div>
        ))}
      </div>
      {/* <Button className={styles.button}>Done</Button> */}
    </div>
  );
};

const StatusCard = ({ id, orderMenu, remainTime, onClick }: OrderResponse & { onClick: () => void }) => {
  return (
    <div className={styles.status_receipt}>
      <div className={styles.time}>+ {remainTime} mins</div>
      <div className={styles.status_receipt_title}>#{String(id).padStart(3, '0')}</div>
      <div className={styles.title_line} />
      <div className={styles.content}>
        {orderMenu.map(item => (
          <div className={styles.line}>
            <div>{item.menuName}</div>
            <div className={styles.count}>{item.menuCount}</div>
          </div>
        ))}
      </div>
      <Button className={styles.button} onClick={onClick}>
        Done
      </Button>
    </div>
  );
};

const Status = () => {
  const [searchParams] = useSearchParams();
  const isMock = searchParams.get('isMock'); // test
  const navigate = useNavigate();

  const [orders, setOrders] = useState<OrderType>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isMock) {
      setTimeout(() => {
        setOrders(MOCK_DATA);
        setIsLoading(false);
      }, 2000);
    }
  }, [isMock]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await API.Status.readOrders();
        setIsLoading(false);
        // eslint-disable-next-line no-unused-expressions
        response.orders &&
          setOrders(
            response.orders.reduce<OrderType>((acc, cur) => {
              if (cur.done) {
                return {
                  ...acc,
                  done: [cur, ...acc.done],
                };
              }

              if (acc.status.length >= 4) {
                return {
                  ...acc,
                  backOrder: [...acc.backOrder, cur],
                };
              }

              return {
                ...acc,
                status: [...acc.status, cur],
              };
            }, DEFAULT_DATA),
          );
      } catch (e) {
        navigate('/status?isMock=true');
        console.error(e);
      }
    };
    // eslint-disable-next-line no-unused-expressions

    if (!isMock) {
      setInterval(() => load(), 5000);
    }
  }, []);
  const swiperRef = useRef<SwiperObjectType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleComplete = useCallback(async (id: number) => {
    if (isMock) {
      setOrders(prev => {
        const currentOrder = prev.status.filter(item => item.id === id)[0];
        const newStatus = [...prev.status.filter(item => item.id !== id), ...prev.backOrder];
        const newOrders = {
          done: [currentOrder, ...prev.done],
          status: newStatus.slice(0, 4) ?? [],
          backOrder: newStatus.slice(4, newStatus.length) ?? [],
        };
        return newOrders;
      });
      return;
    }

    // const response = await API.Status.postOrderComplete(id);
    toast.error('API 연동 중 입니다.');
  }, []);

  const handleUndo = useCallback((id: number) => {
    if (isMock) {
      setOrders(prev => {
        const currentOrder = prev.done.filter(item => item.id === id)[0];
        const newStatus = [currentOrder, ...prev.status, ...prev.backOrder];
        const newOrders = {
          done: prev.done.filter(item => item.id !== id),
          status: newStatus.slice(0, 4) ?? [],
          backOrder: newStatus.slice(4, newStatus.length) ?? [],
        };
        return newOrders;
      });
      return;
    }
    toast.error('API 연동 중 입니다.');
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <Swiper
        onInit={swiper => swiper.changeLanguageDirection('rtl')}
        onSwiper={swiper => {
          swiperRef.current = swiper as SwiperObjectType;
        }}
        onRealIndexChange={swiper => setCurrentIndex(swiper.activeIndex)}
      >
        <SwiperSlide>
          <div className={styles.box}>
            {orders.done.length && (
              <Button className={styles.arrow} onClick={() => swiperRef.current?.slideNext()}>
                <div className={cn(styles.icon, currentIndex === 1 && styles.flip)}>
                  <ArrowFirst />
                  <ArrowSecond />
                  <ArrowThird />
                </div>
                <div className={styles.text}>{currentIndex === 0 ? 'Done' : 'Back'}</div>
              </Button>
            )}
            <div className={styles.box_container}>
              <div className={styles.title}>Real-time ESL Status</div>
              {orders.status.map(item => (
                <StatusCard {...item} onClick={() => handleComplete(item.id)} key={item.id} />
              ))}
              {orders.status.length === 4 ? (
                <div className={styles.status_receipt_full}>+ {orders.backOrder.length}</div>
              ) : (
                new Array(5 - orders.status.length).fill(1).map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={item + index} className={cn(styles.status_receipt_none, isLoading && styles.active)} />
                ))
              )}
            </div>
            {orders.backOrder.length > 0 && (
              <div className={styles.back_order}>
                <div className={styles.title}>Back Orders</div>
                {orders.backOrder.map(item => (
                  <BackOrderCard {...item} />
                ))}
              </div>
            )}
          </div>
        </SwiperSlide>
        {orders.done.length > 0 && (
          <SwiperSlide>
            <div className={styles.box}>
              <div className={styles.done_order}>
                <div className={styles.title}>Done</div>
                {orders.done.map(item => (
                  <DoneCard {...item} onClick={() => handleUndo(item.id)} />
                ))}
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Status;
