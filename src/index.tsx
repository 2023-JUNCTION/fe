import React, { RefObject, createRef } from 'react';
import ReactDOM from 'react-dom/client';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { RouterProvider, createBrowserRouter, useLocation, useOutlet } from 'react-router-dom';
import { Toast } from './components';
import Demo from './pages/Demo';

import styles from './index.module.scss';
import '~/scss/_reset.scss';

export const routes = [{ path: '/', name: 'Demo', element: <Demo />, nodeRef: createRef() }];

const Root = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } = routes.find(route => route.path === location.pathname) as { nodeRef: RefObject<HTMLDivElement> };

  if (!nodeRef) return null;

  return (
    <main className={styles.page}>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames={{
            enter: styles.page_enter,
            enterActive: styles.page_enter_active,
            exit: styles.page_exit,
            exitActive: styles.page_exit_active,
          }}
          unmountOnExit
        >
          {() => (
            <div ref={nodeRef} className={styles.content}>
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
      <Toast />
    </main>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: routes.map(route => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
