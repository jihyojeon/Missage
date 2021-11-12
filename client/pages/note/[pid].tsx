import { useRouter } from 'next/router';
import Sidebar from '../../components/Sidebar';
import { useState } from 'react';
import { useEffect } from 'react';
import ApiService from '../api/ApiService';
import Content from '../../components/Content';
import styles from './pid.module.css';

const Note = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    ApiService.getAll().then((notes) => {
      setNotes(notes);
    });
  }, []);

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

  const editTitle = (title: string, id: string) => {
    ApiService.putNote({ title }, id).then((updatedNote) => {
      setNotes((noteList) => {
        const noteToUpdate = noteList.find((note) => note._id === id);
        noteToUpdate.title = updatedNote.title;
        console.log({ updatedNote });
        return [...noteList];
      });
    });
  };

  const editText = (text: string, id: string) => {
    ApiService.putNote({ text }, id).then((updatedNote) => {
      setNotes((noteList) => {
        const noteToUpdate = noteList.find((note) => note._id === id);
        noteToUpdate.text = updatedNote.text;
        console.log(updatedNote);
        return [...noteList];
      });
    });
  };

  return (
    <div className={styles.note}>
      <Sidebar notes={notes} putNote={putNote}></Sidebar>
      <Content
        notes={notes}
        pid={pid}
        putNote={putNote}
        editTitle={editTitle}
        editText={editText}
      ></Content>
    </div>
  );
};

export default Note;
