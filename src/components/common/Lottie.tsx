import React, { CSSProperties, ReactElement, useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export type Props = {
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  source: string;
  style?: CSSProperties;
  speed?: number;
  children?: ReactElement;
  onComplete?: () => void;
};

const Lottie = ({
  className,
  loop = false,
  autoplay = true,
  source,
  style,
  speed = 1,
  children,
  onComplete,
}: Props) => {
  const lottieRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (lottieRef.current) {
      const instance = lottie.loadAnimation({
        animationData: source,
        container: lottieRef.current,
        loop,
        autoplay,
      });

      if (onComplete) {
        instance.addEventListener('complete', onComplete);
      }

      instance.setSpeed(speed);

      return () => {
        instance.destroy();
      };
    }
  }, [autoplay, loop, onComplete, source, speed]);

  return (
    <div className={className} ref={lottieRef} style={style}>
      {children}
    </div>
  );
};

export default Lottie;
