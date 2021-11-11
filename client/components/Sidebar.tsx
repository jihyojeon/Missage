import Link from 'next/link';
import styles from './Sidebar.module.css';

function resize() {
  const sidebarDiv = document.getElementsByClassName(styles.side)[0];
  const orgWidth: number = sidebarDiv
    ? sidebarDiv.getBoundingClientRect().width
    : 0;
  console.log(orgWidth);
}

export default () => {
  return (
    <div className={styles.component}>
      <div className={styles.side}>
        <div className={styles.info}>User Info</div>
        <div className={styles.note}>notes</div>
        <button className={styles.new}>new note</button>
      </div>
      <div className={styles.border} onClick={resize}></div>
    </div>
  );
};
