"use client";

import Image from "next/image";
import styles from "./Form.module.css";
import React from "react";
import ColorPalette from "../ColorPalette/ColorPalaette";

function reducer(currentState, action) {
  switch (action.type) {
    case "UPDATE_TITLE":
      return { ...currentState, title: action.payload };
    case "UPDATE_DESCRIPTION":
      return { ...currentState, description: action.payload };
    case "UPDATE_VISIBILITY":
      return { ...currentState, visibility: action.payload };
    case "UPDATE_FORM_PALETTE":
      return { ...currentState, formPalette: action.payload };
    case "UPDATE_PIN":
      return { ...currentState, pin: action.payload };
    default:
      return { ...currentState };
  }
}

export default function Form(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    title: "",
    description: "",
    visibility: false,
    formPalette: false,
    pin: false,
  });
  const [formColor, setFormColor] = React.useState("white");
  const handlePinChange = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_PIN", payload: !state.pin });
  };
  const handleTitleChange = (e) => {
    dispatch({ type: "UPDATE_TITLE", payload: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    dispatch({ type: "UPDATE_DESCRIPTION", payload: e.target.value });
  };

  const handleFormPalette = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_FORM_PALETTE", payload: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.title == "" && state.description == "") {
      return;
    }
    const copyNotes = [...props.notes];
    const titleValue = state.title ? state.title : "";
    const descriptionValue = state.description ? state.description : "";
    const background = formColor;
    const newNote = {
      title: titleValue,
      description: descriptionValue,
      key: Date.now(),
      pin: state.pin,
      complete: "To-Do",
      background: background,
    };
    props.setNotes([newNote, ...copyNotes]);
    localStorage.setItem("noteList", JSON.stringify([newNote, ...copyNotes]));
    dispatch({ type: "UPDATE_TITLE", payload: "" });
    dispatch({ type: "UPDATE_DESCRIPTION", payload: "" });
    setFormColor("white");
    dispatch({ type: "UPDATE_VISIBILITY", payload: false });
    dispatch({ type: "UPDATE_FORM_PALETTE", payload: false });
  };

  // const ref = React.useRef<HTMLTextAreaElement>(null);

  // const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   console.log(ref);

  //   if (ref.current) {
  //     console.log(e);
  //     ref.current.style.height = "auto";
  //     ref.current.style.height = `${e.target.scrollHeight - 24}px`;
  //   }
  // };

  // const handleInput = (e) => {
  //   const desc = document.getElementsByClassName("description")[0];
  //   desc.style.height = "auto";
  //   desc.style.height = `${e.target.scrollHeight - 24}px`;
  // };

  React.useEffect(() => {
    window.addEventListener("click", function (e) {
      if (document.getElementById("form_container")?.contains(e.target)) {
        dispatch({ type: "UPDATE_VISIBILITY", payload: true });
      } else {
        document.getElementById("submit")?.click();
        dispatch({ type: "UPDATE_VISIBILITY", payload: false });
        dispatch({ type: "UPDATE_FORM_PALETTE", payload: false });
        setFormColor("white");
      }
    });
  }, []);

  return (
    <div
      id="form_container"
      className={styles.form_container}
      style={{ backgroundColor: formColor }}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {state.visibility ? (
          <button
            className={[state.visibility, styles.form_pin].join(" ")}
            onClick={(e) => handlePinChange(e)}
          >
            <Image
              alt=""
              height={24}
              width={24}
              src={state.pin ? "/pin.svg" : "/unpin.svg"}
              className={styles.form_pin_icon}
            />
          </button>
        ) : null}

        {state.visibility ? (
          <input
            id={styles.title}
            className={[styles.title].join(" ")}
            name="title"
            placeholder="Title"
            value={state.title}
            onChange={handleTitleChange}
          />
        ) : null}
        <div className={styles.textarea_div}>
          <textarea
            id="description"
            className={styles.description}
            rows={1}
            name="description"
            placeholder="Take a note..."
            value={state.description}
            // onInput={handleInput}
            onChange={handleDescriptionChange}
          ></textarea>

          {!state.visibility ? (
            <div className={styles.textarea_buttons}>
              <Image
                alt=""
                height={48}
                width={48}
                src={"/check_box.svg"}
                className={styles.initial_icons}
              />
              <Image
                alt=""
                height={48}
                width={48}
                src={"/brush.svg"}
                className={styles.initial_icons}
              />
              <Image
                alt=""
                height={48}
                width={48}
                src={"/image.svg"}
                className={styles.initial_icons}
              />
            </div>
          ) : null}
        </div>
        {state.visibility ? (
          <div id={styles.form_buttons}>
            <button
              className={styles.form_button}
              onClick={(e) => {
                handleFormPalette(e);
              }}
            >
              <Image
                alt=""
                height={34}
                width={34}
                src={"/alert.svg"}
                className={styles.form_icons}
              />
            </button>
            <button
              className={styles.form_button}
              onClick={(e) => {
                handleFormPalette(e);
              }}
            >
              <Image
                alt=""
                height={34}
                width={34}
                src={"/collaborator.svg"}
                className={styles.form_icons}
              />
            </button>
            <button
              className={styles.form_button}
              onClick={(e) => {
                handleFormPalette(e);
              }}
            >
              <Image
                alt=""
                height={34}
                width={34}
                src={"/color-palette.svg"}
                className={styles.form_icons}
              />
            </button>
            <button
              className={styles.form_button}
              onClick={(e) => {
                handleFormPalette(e);
              }}
            >
              <Image
                alt=""
                height={34}
                width={34}
                src={"/image.svg"}
                className={styles.form_icons}
              />
            </button>
            <button
              className={styles.form_button}
              onClick={(e) => {
                handleFormPalette(e);
              }}
            >
              <Image
                alt=""
                height={34}
                width={34}
                src={"/archive.svg"}
                className={styles.form_icons}
              />
            </button>
            <button
              className={styles.form_button}
              onClick={(e) => {
                handleFormPalette(e);
              }}
            >
              <Image
                alt=""
                height={34}
                width={34}
                src={"/more.svg"}
                className={styles.form_icons}
              />
            </button>
            <button
              className={styles.form_button}
              onClick={(e) => {
                handleFormPalette(e);
              }}
            >
              <Image
                alt=""
                height={34}
                width={34}
                src={"/undo.svg"}
                className={[styles.form_icons, styles.undo_redo].join(" ")}
              />
            </button>
            <button
              className={styles.form_button}
              onClick={(e) => {
                handleFormPalette(e);
              }}
            >
              <Image
                alt=""
                height={34}
                width={34}
                src={"/redo.svg"}
                className={[styles.form_icons, styles.undo_redo].join(" ")}
              />
            </button>
            <button
              type="submit"
              id="submit"
              className={styles.close}
              onClick={handleSubmit}
            >
              Close
            </button>
          </div>
        ) : null}
      </form>
      <div className={styles.form_palette}>
        {state.formPalette ? (
          <ColorPalette setBackground={setFormColor} />
        ) : null}
      </div>
    </div>
  );
}
