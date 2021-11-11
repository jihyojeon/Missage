import Link from 'next/link';
import styles from './AddNote.module.css';
import React from 'react';
import { useState } from 'react';

export default () => {
  return (
    <div className={styles.options}>
      <div className={styles.drag}>Drag and Upload</div>
      <div className={styles.record}>Record</div>
    </div>
  );
};
