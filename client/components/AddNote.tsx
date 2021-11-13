import Link from 'next/link';
import styles from './AddNote.module.css';
import React from 'react';
import { useState } from 'react';
import {
  faFileUpload,
  faMicrophoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';

export default ({ postNote }) => {
  const [audio, setAudio] = useState(null);
  const [note, setNote] = useState({});

  const upload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const userAudio = event.target.files[0];
      setAudio(userAudio);
      send(userAudio);
    }
  };

  const send = async (userAudio: File) => {
    if (userAudio) {
      const formData = new FormData();
      formData.append('audio', userAudio, userAudio.name);
      console.log(formData);
      const newNote = await postNote(formData);
    }
  };

  const trigger = () => {
    document.getElementsByClassName(styles.file)[0].click();
  };

  return (
    <div className={styles.options}>
      <div className={styles.drag}>
        <p className={styles.title}>Drag and Drop | Upload</p>
        <input type="file" className={styles.file} onChange={upload} />
        <FontAwesomeIcon
          onClick={trigger}
          icon={faFileUpload}
          className={styles.icon}
        ></FontAwesomeIcon>
      </div>
      <div className={styles.record}>
        <p className={styles.title}>Record</p>
        <FontAwesomeIcon
          icon={faMicrophoneAlt}
          className={styles.icon}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};
