import Link from 'next/link';
import styles from './Sidebar.module.css';
import React, { useState } from 'react';
import { useFetchUser } from '../utils/user';

let Picker;
if (typeof window !== 'undefined') {
  import('emoji-picker-react').then((_module) => {
    Picker = _module.default;
  });
}

export default ({ notes, putNote, pid }) => {
  const { user, loading } = useFetchUser();

  const [showID, setShowID] = useState('');

  const noteList = (notes: []) => {
    if (notes) {
      return notes.map((note) => (
        <div key={note['_id']}>
          <div className={styles.noteItem}>
            <div
              className={styles.icon}
              onClick={() => {
                !showID ? setShowID(note['_id']) : setShowID('');
              }}
            >
              {note['icon']}
            </div>
            {note['_id'] === pid ? (
              <p className={styles.selected}>
                <Link href={`/note/${note['_id']}`}>
                  <a className={styles.title}>{note['title']}</a>
                </Link>
              </p>
            ) : (
              <p className={styles.titleBox}>
                <Link href={`/note/${note['_id']}`}>
                  <a className={styles.title}>{note['title']}</a>
                </Link>
              </p>
            )}
          </div>
          {showID === note['_id'] ? (
            <Picker
              pickerStyle={{ position: 'absolute' }}
              className={styles.picker}
              onEmojiClick={(event, emojiObject) => {
                putNote(emojiObject.emoji, note['_id']);
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
        {user ? (
          <>
            <div className={styles.info}>
              <img className={styles.pic} src={user.picture} alt="" />
              {`${user.given_name}'s notes`}
            </div>
            <div className={styles.note}>
              <p className={styles.listTitle}>My Notes</p>
              {noteList(notes)}
            </div>
          </>
        ) : null}
        <Link href="/note">
          <a>
            <div className={styles.new}>New Note</div>
          </a>
        </Link>
      </div>
      <div className={styles.border}></div>
    </div>
  );
};
