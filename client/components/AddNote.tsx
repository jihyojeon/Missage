import styles from './AddNote.module.css';
import React from 'react';
import { useState, useCallback } from 'react';
import {
  faFileUpload,
  faMicrophoneAlt,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from 'react-media-recorder';

export default ({ postNote, userid }) => {
  const send = async (userAudio: File) => {
    if (userAudio) {
      const formData = new FormData();
      formData.append('audio', userAudio, userAudio.name);
      formData.append('userID', userid);
      await postNote(formData);
    }
  };

  // Upload by Drag and Drop
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    send(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Upload by Record
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      ...{ audio: true },
      askPermissionOnMount: true,
      onStop: (blobUrl, blob) => {
        console.info(blobUrl, blob);
        const userAudio = new File([blob], 'User_Recorded.wav');
        send(userAudio);
      },
    });

  // ------------------------------------------------------------------------------
  return (
    <div className={styles.options}>
      {isDragActive ? (
        <div {...getRootProps()} className={styles.dragActive}>
          <p className={styles.title}>Drag and Drop</p>
          <input {...getInputProps()} type="file" className={styles.file} />
          <FontAwesomeIcon
            icon={faFileUpload}
            className={styles.icon}
          ></FontAwesomeIcon>
        </div>
      ) : (
        <div {...getRootProps()} className={styles.drag}>
          <p className={styles.title}>Drag and Drop</p>
          <input {...getInputProps()} type="file" className={styles.file} />
          <FontAwesomeIcon
            icon={faFileUpload}
            className={styles.icon}
          ></FontAwesomeIcon>
        </div>
      )}
      <div className={styles.record}>
        <p className={styles.title}>Record</p>
        {status === 'recording' ? (
          <FontAwesomeIcon
            onClick={stopRecording}
            icon={faStopCircle}
            className={styles.icon}
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            onClick={startRecording}
            icon={faMicrophoneAlt}
            className={styles.icon}
          ></FontAwesomeIcon>
        )}
      </div>
    </div>
  );
};
