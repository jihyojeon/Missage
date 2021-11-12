import styles from './content.module.css';
import React, { useState, useEffect, useRef } from 'react';

let Picker;
if (typeof window !== 'undefined') {
  import('emoji-picker-react').then((_module) => {
    Picker = _module.default;
  });
}

export default ({ notes, pid, putNote, editTitle, editText }) => {
  const note = notes.find((note: {}) => note._id === pid);

  const [show, setShow] = useState(false);

  const titleref = useRef(null);
  const textref = useRef(null);
  const iconref = useRef(null);
  const [title, setTitle] = useState('');
  const [editableTitle, setEditableTitle] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [editableText, setEditableText] = useState(false);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside, true);
  });

  const handleClickOutside = (e) => {
    let ref;
    editableTitle
      ? (ref = titleref)
      : editableText
      ? (ref = textref)
      : iconref
      ? (ref = iconref)
      : null;
    if (editableTitle && !ref.current.contains(e.target))
      setEditableTitle(false);
    if (editableText && !ref.current.contains(e.target)) setEditableText(false);
    if (show && !ref.current.contains(e.target)) {
      setShow(false);
    }
  };

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
    <div className={styles.component} ref={iconref}>
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
      <p className={styles.noteName} ref={titleref}>
        {editableTitle ? (
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div onClick={() => editOn()}>{note?.title}</div>
        )}
      </p>
      <p className={styles.noteText} ref={textref}>
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
