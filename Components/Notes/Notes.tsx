"use client";
import styles from "./Notes.module.css";
import Image from "next/image";
import React from "react";
// import ColorPalette from "./ColorPalaette";

export default function Notes(props) {
  const [notePalette, setNotePalette] = React.useState(false);

  const handleComplete = (id) => {
    const copyNotes = [...props.notes];
    const editNote = copyNotes.find(function (note) {
      return note.key === id;
    });
    if (editNote["complete"] === "Done") {
      editNote["complete"] = "To-Do";
    } else if (editNote["complete"] === "To-Do") {
      editNote["complete"] = "Done";
    }
    props.setNotes(copyNotes);
    localStorage.setItem("noteList", JSON.stringify(copyNotes));
  };

  const handlePin = (e, id) => {
    e.preventDefault();
    const copyNotes = [...props.notes];
    const editNote = copyNotes.find(function (note) {
      return note.key === id;
    });
    const newNotes = copyNotes.filter(function (note) {
      return note.key !== id;
    });
    editNote["pin"] = !editNote["pin"];
    // newNotes.push(editNote);
    props.setNotes([editNote, ...newNotes]);
    localStorage.setItem("noteList", JSON.stringify([editNote, ...newNotes]));
  };

  const handleNote = (id) => {
    const copyNotes = [...props.notes];
    props.setModalNote(
      copyNotes.find(function (note) {
        return note.key === id;
      })
    );
    props.setModal(!props.modal);
  };

  const handleDelete = (id) => {
    const copyNotes = [...props.notes];
    const newNotes = copyNotes.filter(function (note) {
      return note.key !== id;
    });
    props.setNotes(newNotes);
    localStorage.setItem("noteList", JSON.stringify(newNotes));
  };

  const handleCopy = (id) => {
    const copyNotes = [...props.notes];
    const editNote = copyNotes.find(function (note) {
      return note.key === id;
    });
    const newNote = {
      title: editNote["title"],
      description: editNote["description"],
      key: Date.now(),
      pin: false,
      complete: "To-Do",
      background: editNote["background"],
    };
    props.setNotes([newNote, ...copyNotes]);
    localStorage.setItem("noteList", JSON.stringify([newNote, ...copyNotes]));
  };

  const handlePalette = (key) => {
    console.log("inside note palette");
    setNotePalette(true);
  };

  return (
    <div className={styles.note_container}>
      {props.filterednotes.length > 0 ? (
        <div className={styles.notes_heading}>{props.label}</div>
      ) : null}
      <div className={props.layout ? styles.notes_grid : styles.notes_list}>
        {props.filterednotes.map((note) => {
          return (
            <div
              className={[
                props.layout ? styles.note_width_grid : styles.note_width_list,
                note.complete === "Done" ? styles.completed : styles.incomplete,
                styles.note,
              ].join(" ")}
              style={{ background: note.background }}
              key={note.key}
            >
              <Image
                alt=""
                width={20}
                height={20}
                src={"/uncheck.svg"}
                id={styles.complete_button}
                className={styles.note_buttons}
                onClick={() => handleComplete(note.key)}
              />
              <Image
                alt=""
                height={24}
                width={24}
                src={note.pin ? "/pin.svg" : "/unpin.svg"}
                className={styles.note_pin}
                onClick={(e) => handlePin(e, note.key)}
              />
              {note.title.length > 0 ? (
                <div className={styles.note_title}>
                  <span onClick={() => handleNote(note.key)}>{note.title}</span>
                </div>
              ) : null}
              {note.description.length > 0 ? (
                <pre
                  onClick={() => handleNote(note.key)}
                  className={styles.note_description}
                >
                  {note.description}
                </pre>
              ) : null}
              <div className={styles.note_buttons}>
                <Image
                  alt=""
                  height={36}
                  width={34}
                  src={"/copy.svg"}
                  onClick={() => handleCopy(note.key)}
                  className={styles.note_button}
                />
                <Image
                  alt=""
                  height={36}
                  width={34}
                  src={"/trash.svg"}
                  onClick={() => handleDelete(note.key)}
                  className={styles.note_button}
                />
                <Image
                  alt=""
                  height={36}
                  width={34}
                  src={"/color-palette.svg"}
                  onClick={() => handlePalette(note.key)}
                  className={styles.note_button}
                />
                <Image
                  alt=""
                  height={36}
                  width={34}
                  src={"/image.svg"}
                  onClick={() => handlePalette(note.key)}
                  className={styles.note_button}
                />
                <Image
                  alt=""
                  height={36}
                  width={34}
                  src={"/archive.svg"}
                  onClick={() => handlePalette(note.key)}
                  className={styles.note_button}
                />
                <Image
                  alt=""
                  height={36}
                  width={34}
                  src={"/more.svg"}
                  onClick={() => handlePalette(note.key)}
                  className={styles.note_button}
                />
              </div>
              {/* {notePalette ? (
                <ColorPalette setBackground={note.background} />
              ) : null} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
