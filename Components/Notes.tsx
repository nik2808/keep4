import Image from "next/image";
import React from "react";
import ColorPalette from "./ColorPalaette";

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
    newNotes.push(editNote);
    props.setNotes(newNotes);
    localStorage.setItem("noteList", JSON.stringify(newNotes));
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
    <>
      <div className="notes-heading">
        {props.filterednotes.length > 0 ? props.label : null}
      </div>
      <div className={props.layout ? "notes-grid" : "notes-list"}>
        {props.filterednotes.map((note) => {
          return (
            <div
              className={[
                props.layout ? "note-width-grid" : "note-width-list",
                note.complete === "Done" ? "completed" : "incomplete",
                "note",
              ].join(" ")}
              style={{ background: note.background }}
              key={note.key}
            >
              <button
                id="complete-button"
                className={
                  note.complete === "Done" ? "note-buttons" : "note-buttons"
                }
                onClick={() => handleComplete(note.key)}
              >
                <Image alt="" width={20} height={20} src={"/uncheck.svg"} />
              </button>
              <button
                className="note-pin note-buttons"
                onClick={(e) => handlePin(e, note.key)}
              >
                <Image
                  alt=""
                  height={20}
                  width={20}
                  src={note.pin ? "/pin.svg" : "/unpin.svg"}
                />
              </button>
              {note.title.length > 0 ? (
                <div className="note-title">
                  <span onClick={() => handleNote(note.key)}>{note.title}</span>
                </div>
              ) : null}
              {note.description.length > 0 ? (
                <pre
                  onClick={() => handleNote(note.key)}
                  className="note-description"
                >
                  {note.description}
                </pre>
              ) : null}
              <div className="note-key"></div>
              <div className="note-buttons">
                <button onClick={() => handlePalette(note.key)}>
                  <Image
                    alt=""
                    height={20}
                    width={20}
                    src={"/color-palette.svg"}
                  />
                </button>
                <button onClick={() => handleCopy(note.key)}>
                  <Image alt="" height={20} width={20} src={"/copy.svg"} />
                </button>
                <button onClick={() => handleDelete(note.key)}>
                  <Image alt="" height={20} width={20} src={"/trash.svg"} />
                </button>
              </div>
              {/* {notePalette ? (
                <ColorPalette setBackground={note.background} />
              ) : null} */}
            </div>
          );
        })}
      </div>
    </>
  );
}
