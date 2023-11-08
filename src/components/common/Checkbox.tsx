import { LabelHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Checkbox.module.scss';

type Props = {
  id?: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

const Checkbox = ({ id, checked, onChange, label, disabled = false, ...restProps }: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label {...restProps} htmlFor={id} className={cn(styles.checkbox, disabled && styles.disabled)}>
      <input id={id} type="checkbox" onChange={onChange} checked={checked} />
      <span className={styles.box_area}> </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;
