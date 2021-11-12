import styles from './content.module.css';
import React, { useState } from 'react';

let Picker;
if (typeof window !== 'undefined') {
  import('emoji-picker-react').then((_module) => {
    Picker = _module.default;
  });
}

export default ({ notes, pid, putNote, editTitle, editText }) => {
  const note = notes.find((note: {}) => note._id === pid);

  const [show, setShow] = useState(false);

  const [title, setTitle] = useState('');
  const [editableTitle, setEditableTitle] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [editableText, setEditableText] = useState(false);

  const editOn = () => {
    setTitle(note.title);
    setEditableTitle(true);
  };
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleKeyDown = (event) => {
    if ((event.key === 'Escape') | (event.key === 'Enter')) {
      editTitle(title, pid);
      setEditableTitle(!editableTitle);
    }
  };

  const editOnText = () => {
    setNoteText(note.text);
    setEditableText(true);
  };
  const handleChangeText = (event) => {
    setNoteText(event.target.value);
  };
  const handleKeyDownText = (event) => {
    if (event.key === 'Escape') {
      editText(noteText, pid);
      setEditableText(!editableText);
    }
  };

  return (
    <div className={styles.component}>
      <p
        className={styles.noteIcon}
        onClick={() => {
          !show ? setShow(true) : setShow(false);
        }}
      >
        {note?.icon}
      </p>
      {show ? (
        <Picker
          className={styles.picker}
          onEmojiClick={(event, emojiObject) => {
            putNote(emojiObject.emoji, pid);
            setShow(false);
          }}
        />
      ) : null}
      <p className={styles.noteName}>
        {editableTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div onClick={() => editOn()}>{note?.title}</div>
        )}
      </p>
      <p className={styles.noteText}>
        {editableText ? (
          <input
            type="text"
            value={noteText}
            onChange={(e) => handleChangeText(e)}
            onKeyDown={handleKeyDownText}
          />
        ) : (
          <div onClick={() => editOnText()}>{note?.text}</div>
        )}
      </p>
    </div>
  );
};
