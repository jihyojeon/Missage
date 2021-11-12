import Link from 'next/link';
import styles from './Sidebar.module.css';
import React, { useState } from 'react';
let Picker;
if (typeof window !== 'undefined') {
  import('emoji-picker-react').then((_module) => {
    Picker = _module.default;
  });
}

export default ({ notes, putNote }) => {
  const [showID, setShowID] = useState('');
  const resize = () => {
    const sidebarDiv = document.getElementsByClassName(styles.side)[0];
    const orgWidth: number = sidebarDiv
      ? sidebarDiv.getBoundingClientRect().width
      : 0;
    console.log(orgWidth);
  };

  const noteList = (notes: []) => {
    if (notes) {
      return notes.map((note) => (
        <div key={note._id}>
          <div className={styles.noteItem}>
            <div
              className={styles.icon}
              onClick={() => {
                setShowID(note._id);
              }}
            >
              {note.icon}
            </div>
            <p className={styles.title}>
              <Link href={`/note/${note._id}`}>
                <a>{note.title}</a>
              </Link>
            </p>
          </div>
          {showID === note._id ? (
            <Picker
              className={styles.picker}
              onEmojiClick={(event, emojiObject) => {
                putNote(emojiObject.emoji, note._id);
                setShowID('');
              }}
            />
          ) : null}
        </div>
      ));
    }
  };

  return (
    <div className={styles.component}>
      <div className={styles.side}>
        <div className={styles.info}>User Info</div>
        <div className={styles.note}>
          My Notes
          {noteList(notes)}
        </div>
        <button className={styles.new}>new note</button>
        {/* https://www.npmjs.com/package/react-beautiful-dnd-next */}
      </div>
      <div className={styles.border}></div>
    </div>
  );
};
