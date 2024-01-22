import styles from './Checkbox.module.scss';

const Checkbox = ({ label, isChecked, onChange }) => {
  return (
    <label className={styles.checkbox}>
      <input checked={isChecked} type="checkbox" onChange={() => onChange(!isChecked)} />
      <span className={styles.custom}></span>
      {label}
    </label>
  );
};

export default Checkbox;
