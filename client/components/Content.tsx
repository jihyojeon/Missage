import styles from './content.module.css';
import React, { useState } from 'react';
let Picker;
if (typeof window !== 'undefined') {
  import('emoji-picker-react').then((_module) => {
    Picker = _module.default;
  });
}

export default ({ notes, pid, putNote }) => {
  const [showID, setShowID] = useState('');

  const note = notes.find((note: {}) => note._id === pid);

  return (
    <div className={styles.component}>
      <p
        className={styles.noteName}
        onClick={() => {
          setShowID(note._id);
        }}
      >
        {note?.icon}
      </p>
      {showID === pid ? (
        <Picker
          className={styles.picker}
          onEmojiClick={(event, emojiObject) => {
            putNote(emojiObject.emoji, pid);
            setShowID('');
          }}
        />
      ) : null}
      <p className={styles.noteName}>{note?.title}</p>
      <p className={styles.content}>{note?.text}</p>
    </div>
  );
};
