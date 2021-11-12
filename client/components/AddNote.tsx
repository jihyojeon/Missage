import Link from 'next/link';
import styles from './AddNote.module.css';
import React from 'react';
import { useState } from 'react';
import {
  faFileUpload,
  faMicrophoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      console.log(userAudio);
      const body = new FormData();
      body.append('file', userAudio);
      postNote(body);
      console.log(body);
    }
  };

  const trigger = () => {
    document.getElementsByClassName(styles.file)[0].click();
  };

  return (
    <div className={styles.options}>
      <div className={styles.drag}>
        <p>Drag and Drop | Upload</p>
        <input type="file" className={styles.file} onChange={upload} />
        <FontAwesomeIcon
          onClick={trigger}
          icon={faFileUpload}
          className={styles.icon}
        ></FontAwesomeIcon>
      </div>
      <div className={styles.record}>
        <p>Record</p>
        <FontAwesomeIcon
          icon={faMicrophoneAlt}
          className={styles.icon}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};
