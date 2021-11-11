import Link from 'next/link';
import styles from './Sidebar.module.css';

export default ({ notes }) => {
  const resize = () => {
    const sidebarDiv = document.getElementsByClassName(styles.side)[0];
    const orgWidth: number = sidebarDiv
      ? sidebarDiv.getBoundingClientRect().width
      : 0;
    console.log(orgWidth);
  };

  const noteList = (notes: []) => {
    if (notes) {
      return notes.map((note) => <p key={note._id}>{note.title}</p>);
    }
  };

  return (
    <div className={styles.component}>
      <div className={styles.side}>
        <div className={styles.info}>User Info</div>
        <div className={styles.note}>{noteList(notes)}</div>
        <button className={styles.new}>new note</button>
        {/* https://www.npmjs.com/package/react-beautiful-dnd-next */}
      </div>
      <div className={styles.border} onClick={resize}></div>
    </div>
  );
};
