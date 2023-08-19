import React, { ButtonHTMLAttributes, forwardRef, useImperativeHandle, useRef } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

type Props = {
  fullWidth?: boolean;
  labelText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ParentRef = {
  focus: () => void;
};

const Button = (
  { children, type = 'button', fullWidth = false, labelText = '', className, ...restProps }: Props,
  parentRef: React.Ref<ParentRef>,
) => {
  const childRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(parentRef, () => ({
    focus: () => {
      childRef.current?.focus();
    },
  }));

  return (
    <button
      {...restProps}
      // eslint-disable-next-line react/button-has-type
      type={type}
      ref={childRef}
      className={cn(className, styles.button, fullWidth && styles.full_width)}
    >
      <span>{labelText ? <>{labelText}</> : children}</span>
    </button>
  );
};

export default forwardRef<ParentRef, Props>(Button);
