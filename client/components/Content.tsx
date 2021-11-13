import styles from './Content.module.css';
import React, { useState, useEffect, useRef } from 'react';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';

let Picker;
if (typeof window !== 'undefined') {
  import('emoji-picker-react').then((_module) => {
    Picker = _module.default;
  });
}

export default ({ notes, pid, putNote, editTitle, editText, deleteNote }) => {
  const note = notes.find((note: {}) => note['_id'] === pid);

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
    if (titleref && editableTitle && !titleref.current.contains(e.target))
      setEditableTitle(false);
    if (textref && editableText && !textref.current.contains(e.target))
      setEditableText(false);
    if (iconref && show && !iconref.current.contains(e.target)) {
      console.log('test');
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
    if (event.key === 'Escape' || event.key === 'Enter') {
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
      <div className={styles.iconBar}>
        <p ref={iconref} className={styles.noteIcon}>
          <div
            onClick={() => {
              !show ? setShow(true) : setShow(false);
            }}
          >
            {note?.icon}
          </div>
          {show ? (
            <Picker
              className={styles.picker}
              onEmojiClick={(event, emojiObject) => {
                putNote(emojiObject.emoji, pid);
                setShow(false);
              }}
            />
          ) : null}
        </p>
        <FontAwesomeIcon
          onClick={() => {
            const after = deleteNote(pid);
            console.log(after);
            Router.push(`/note`);
          }}
          icon={faTrashAlt}
          className={styles.trashcan}
        ></FontAwesomeIcon>
      </div>
      <p ref={titleref}>
        {editableTitle ? (
          <input
            className={styles.titleInput}
            type="text"
            value={title}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className={styles.noteTitle} onClick={() => editOn()}>
            {note?.title}
          </div>
        )}
      </p>
      <p ref={textref}>
        {editableText ? (
          <textarea
            className={styles.textInput}
            value={noteText}
            onChange={(e) => handleChangeText(e)}
            onKeyDown={handleKeyDownText}
          />
        ) : (
          <div className={styles.noteText} onClick={() => editOnText()}>
            {note?.text}
          </div>
        )}
      </p>
    </div>
  );
};
