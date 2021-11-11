import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import AddNote from '../components/AddNote';
import styles from './note.module.css';

export default () => {
  return (
    <div className={styles.note}>
      <Sidebar></Sidebar>
      {/* <Content></Content> */}
      <AddNote></AddNote>
    </div>
  );
};
