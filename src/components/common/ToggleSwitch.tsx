import React, { LabelHTMLAttributes } from 'react';

import styles from './ToggleSwitch.module.scss';

type Props = {
  checked: boolean;
  onChange: () => void;
} & LabelHTMLAttributes<HTMLLabelElement>;

const ToggleSwitch = ({ checked, onChange, ...restProps }: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label {...restProps} className={styles.toggle_switch}>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span className={styles.switch} />
    </label>
  );
};

export default ToggleSwitch;
