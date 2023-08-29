import Image from "next/image";
import React from "react";
// const LIST_OF_COLORS = ["red", "yellow", "green", "blue", "orange", "pink"];
import ColorPalette from "./ColorPalaette";

function reducer(currentState, action) {
  switch (action.type) {
    case "UPDATE_TITLE":
      // console.log(action, currentState);
      return { ...currentState, title: action.payload };
    case "UPDATE_DESCRIPTION":
      return { ...currentState, description: action.payload };
    case "UPDATE_VISIBILITY":
      return { ...currentState, visibility: action.payload };
    case "UPDATE_FORM_PALETTE":
      return { ...currentState, formPalette: action.payload };
    // case "UPDATE_FORM_COLOR":
    //   return { ...currentState, formColor: action.payload };
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
    visibility: "hidden",
    formPalette: false,
    // formColor: "white",
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
    if (e.target.title.value == "" && e.target.description.value == "") {
      return;
    }
    const copyNotes = [...props.notes];
    const titleValue = e.target.title.value ? e.target.title.value : "";
    const descriptionValue = e.target.description.value
      ? e.target.description.value
      : "";
    const background = formColor;
    const newNote = {
      title: titleValue,
      description: descriptionValue,
      key: Date.now(),
      pin: state.pin,
      complete: "To-Do",
      background: background,
    };
    // copyNotes.push(newNote);
    props.setNotes([newNote, ...copyNotes]);
    localStorage.setItem("noteList", JSON.stringify([newNote, ...copyNotes]));
    dispatch({ type: "UPDATE_TITLE", payload: "" });
    dispatch({ type: "UPDATE_DESCRIPTION", payload: "" });
    setFormColor("white");
    dispatch({ type: "UPDATE_VISIBILITY", payload: "hidden" });
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
      if (document.getElementsByClassName("heading")[0].contains(e.target)) {
        dispatch({ type: "UPDATE_VISIBILITY", payload: "visible" });
      } else {
        document.getElementById("submit")?.click();
        dispatch({ type: "UPDATE_VISIBILITY", payload: "hidden" });
        dispatch({ type: "UPDATE_FORM_PALETTE", payload: false });
        setFormColor("white");
      }
    });
  }, []);

  return (
    <div className="heading" style={{ backgroundColor: formColor }}>
      <form className="form" onSubmit={handleSubmit}>
        <button
          className={[state.visibility, "pin-button"].join(" ")}
          onClick={(e) => handlePinChange(e)}
        >
          <Image
            alt=""
            height={20}
            width={20}
            src={state.pin ? "/pin.svg" : "/unpin.svg"}
          />
        </button>
        <input
          id="title"
          className={state.visibility}
          name="title"
          placeholder="Title"
          value={state.title}
          onChange={handleTitleChange}
        ></input>
        <textarea
          className="description"
          rows={1}
          name="description"
          placeholder="Take a note..."
          value={state.description}
          // onInput={handleInput}
          onChange={handleDescriptionChange}
        ></textarea>
        <div id="form-buttons" className={state.visibility}>
          <button
            className="form-palette"
            onClick={(e) => {
              handleFormPalette(e);
            }}
          >
            <Image alt="" height={20} width={20} src={"/color-palette.svg"} />
          </button>
          <button type="submit" id="submit">
            Close
          </button>
        </div>
      </form>
      {state.formPalette ? <ColorPalette setBackground={setFormColor} /> : null}
    </div>
  );
}
