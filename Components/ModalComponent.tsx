"use client";
import Image from "next/image";
import React from "react";
import ColorPalette from "./ColorPalette/ColorPalaette";

export default function ModalComponent(props) {
  const showModalColorPalete = () => {
    setModalColorPalette(true);
  };

  const [modalTitle, setModalTitle] = React.useState(props.modalNote.title);
  const [modalDescription, setModalDescription] = React.useState(
    props.modalNote.description
  );
  const [modalBackground, setModalBackground] = React.useState(
    props.modalNote.background
  );
  const [modalColorPalette, setModalColorPalette] = React.useState(false);
  const [modalKey, setModalKey] = React.useState(props.modalNote.key);

  const handleModalTitleChange = (e) => {
    setModalTitle(e.target.value);
  };

  const handleModalDescriptionChange = (e) => {
    setModalDescription(e.target.value);
  };

  const handleModalClose = (id) => {
    const copyNotes = [...props.notes];
    const index = copyNotes.findIndex(function (note) {
      return note.key === id;
    });
    copyNotes[index]["title"] = modalTitle;
    copyNotes[index]["description"] = modalDescription;
    copyNotes[index]["background"] = modalBackground;
    props.setNotes(copyNotes);
    localStorage.setItem("noteList", JSON.stringify(copyNotes));
    props.setModal(false);
  };

  React.useEffect(() => {
    window.addEventListener("click", function (e) {
      if (
        document.getElementById("modal")?.contains(e.target) &&
        !document.getElementById("modal-content")?.contains(e.target)
      ) {
        document.getElementById("modal-button")?.click();
      }
    });
  });

  return (
    <div
      className={props.modal ? "modal modal-visible" : "modal modal-hidden"}
      id="modal"
    >
      <div
        className="modal-content"
        id="modal-content"
        style={{ backgroundColor: modalBackground }}
      >
        <input
          type="text"
          id="modal-title"
          placeholder="Title"
          value={modalTitle}
          onChange={handleModalTitleChange}
        />
        <textarea
          id="modal-description"
          placeholder="Take a note..."
          value={modalDescription}
          onChange={handleModalDescriptionChange}
        ></textarea>
        <img id="modal-image" src="" />
        <div className="modal-button">
          <button onClick={showModalColorPalete}>
            <Image alt="" height={20} width={20} src={"/color-palette.svg"} />
          </button>
          <button id="modal-button" onClick={() => handleModalClose(modalKey)}>
            Close
          </button>
        </div>
        {modalColorPalette ? (
          <ColorPalette setBackground={setModalBackground} />
        ) : null}
      </div>
    </div>
  );
}
