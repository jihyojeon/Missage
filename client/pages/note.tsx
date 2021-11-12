import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import AddNote from '../components/AddNote';
import styles from './note.module.css';
import { useState, useEffect } from 'react';
import ApiService from './api/ApiService';
import { redirect } from 'next/dist/server/api-utils';
import { NextResponse, NextRequest } from 'next/server';

export default () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    ApiService.getAll().then((notes) => {
      setNotes(notes);
      console.log(notes);
    });
  }, []);

  const postNote = (body) => {
    ApiService.postNote(body).then((note) => {
      setNotes([...notes, note]);
      // NextResponse.redirect(`/note/${note._id}`);
    });
  };

  const putNote = (icon: string, id: string) => {
    ApiService.putNote({ icon }, id).then((updatedNote) => {
      setNotes((noteList) => {
        const noteToUpdate = noteList.find((note) => note._id === id);
        noteToUpdate.icon = updatedNote.icon;
        console.log(updatedNote);
        return [...noteList];
      });
    });
  };

  return (
    <div className={styles.note}>
      <Sidebar notes={notes} putNote={putNote}></Sidebar>
      <AddNote postNote={postNote}></AddNote>
    </div>
  );
};
