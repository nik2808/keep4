"use client";
import Image from "next/image";
import keep_logo from "public/keep_2020q4_48dp.png";
import React, { useState, useEffect } from "react";

import ModalComponent from "../../Components/ModalComponent";
import Header from "../../Components/Header";
import Form from "../../Components/Form";
import Notes from "../../Components/Notes";

export default function Home() {
  const notesSample = [
    {
      title: "abcd",
      description: "xyz",
      key: 1,
      pin: false,
      complete: "To-Do",
    },
    {
      title: "abcdef",
      description: "wxyz",
      key: 2,
      pin: true,
      complete: "To-Do",
    },
  ];
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const dataFromLocalStorage = JSON.parse(localStorage.getItem("noteList"));
  const [notes, setNotes] = React.useState(
    dataFromLocalStorage ? dataFromLocalStorage : notesSample
  );
  const [visibility, setVisibility] = React.useState("hidden");
  const [layout, setLayout] = React.useState(true);
  const [pin, setPin] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalDescription, setModalDescription] = React.useState("");
  const [modalKey, setModalKey] = React.useState("");
  localStorage.setItem("noteList", JSON.stringify(notes));

  const handlePinChange = () => {
    setPin(!pin);
  };

  const handleLayoutChange = () => {
    setLayout(!layout);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleModalTitleChange = (e) => {
    setModalTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleModalDescriptionChange = (e) => {
    setModalDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.title.value == "" && e.target.description.value == "") {
      return;
    }
    const copyNotes = notes;
    const titleValue = e.target.title.value ? e.target.title.value : "";
    const descriptionValue = e.target.description.value
      ? e.target.description.value
      : "";
    const newNote = {
      title: titleValue,
      description: descriptionValue,
      key: Date.now(),
      pin: pin,
      complete: "To-Do",
    };
    copyNotes.push(newNote);
    setNotes(copyNotes);
    localStorage.setItem("noteList", JSON.stringify(copyNotes));
    setTitle("");
    setDescription("");
  };

  const handleModalClose = (id) => {
    const copyNotes = [...notes];
    const editNote = copyNotes.find(function (note) {
      return note.key === id;
    });
    const index = copyNotes.findIndex(function (note) {
      return note.key === id;
    });
    copyNotes[index]["title"] = modalTitle;
    copyNotes[index]["description"] = modalDescription;
    setNotes(copyNotes);
    localStorage.setItem("noteList", JSON.stringify(copyNotes));
    setModal(false);
  };

  const handleComplete = (id) => {
    const copyNotes = [...notes];
    const editNote = copyNotes.find(function (note) {
      return note.key === id;
    });
    if (editNote["complete"] === "Done") {
      editNote["complete"] = "To-Do";
    } else if (editNote["complete"] === "To-Do") {
      editNote["complete"] = "Done";
    }
    setNotes(copyNotes);
    localStorage.setItem("noteList", JSON.stringify(copyNotes));
  };

  const handleSearch = () => {
    console.log("You clicked on search");
  };

  const handlePin = (id) => {
    const copyNotes = [...notes];
    const editNote = copyNotes.find(function (note) {
      return note.key === id;
    });
    const newNotes = copyNotes.filter(function (note) {
      return note.key !== id;
    });
    editNote["pin"] = !editNote["pin"];
    newNotes.push(editNote);
    setNotes(newNotes);
    localStorage.setItem("noteList", JSON.stringify(newNotes));
  };

  const handleNote = (id) => {
    const copyNotes = [...notes];
    const modalNote = copyNotes.find(function (note) {
      return note.key === id;
    });
    setModalTitle(modalNote.title);
    setModalDescription(modalNote.description);
    setModalKey(modalNote.key);
    setModal(!modal);
  };

  const handlePalette = (id) => {
    console.log(id);
  };

  const handleFormPalette = () => {
    console.log("Inside Form Palette");
  };

  const handleDelete = (id) => {
    const copyNotes = [...notes];
    const newNotes = copyNotes.filter(function (note) {
      return note.key !== id;
    });
    setNotes(newNotes);
    localStorage.setItem("noteList", JSON.stringify(newNotes));
  };

  const handleCopy = (id) => {
    const copyNotes = [...notes];
    const editNote = copyNotes.find(function (note) {
      return note.key === id;
    });
    const newNote = {
      title: editNote["title"],
      description: editNote["description"],
      key: Date.now(),
      pin: false,
      complete: "To-Do",
    };
    copyNotes.push(newNote);
    setNotes(copyNotes);
    localStorage.setItem("noteList", JSON.stringify(copyNotes));
  };

  const pinnedNotes = notes.filter(function (note) {
    return note.pin;
  });

  const unpinnedNotes = notes.filter(function (note) {
    return !note.pin;
  });

  React.useEffect(() => {
    window.addEventListener("click", function (e) {
      if (document.getElementsByClassName("form")[0].contains(e.target)) {
        // Clicked in box
        setVisibility("visible");
      } else {
        // Clicked outside the box
        document.getElementById("submit")?.click();
        setVisibility("hidden");
      }
      if (
        document.getElementById("modal")?.contains(e.target) &&
        !document.getElementById("modal-content")?.contains(e.target)
      ) {
        document.getElementById("modal-button")?.click();
      }
    });
  });

  return (
    <>
      <ModalComponent
        modal={modal}
        modalTitle={modalTitle}
        modalDescription={modalDescription}
        modalKey={modalKey}
        handleModalTitleChange={handleModalTitleChange}
        handleModalDescriptionChange={handleModalDescriptionChange}
        handleModalClose={handleModalClose}
      />
      {/* <div className={modal?'modal modal-visible':'modal modal-hidden'} id="modal">
      <div className="modal-content" id="modal-content">
        <input type="text" id="modal-title" placeholder="Title" value={modalTitle} onChange={handleModalTitleChange}/>
        <textarea id="modal-description" placeholder="Take a note..." value={modalDescription} onChange={handleModalDescriptionChange}></textarea>
        <img id="modal-image" src=""/>
        <button id="modal-button" onClick={()=>handleModalClose(modalKey)}>
          Close
        </button>
        <div id="modal-key">
        </div>
      </div>
    </div> */}
      <div className="app">
        <Header
          handleSearch={handleSearch}
          handleLayoutChange={handleLayoutChange}
        />
        {/* <div className='header'>
        <Image id='logo' alt='' src={keep_logo} height={44} width={40}  />
        <a>Keep</a>
        <div className='search'>
        <button onClick={()=>handleSearch()}><Image alt='' height={20} width={20} src={"/search-outline.svg"}/></button>
          <input placeholder="Search">
          </input>
          <button onClick={()=>handleSearch()}><Image alt='' height={20} width={20} src={"/cross.svg"}/></button>
        </div>
        <div className='header-buttons'>
          <button onClick={()=>handleLayoutChange()}>Change Layout</button>
        </div>
      </div> */}
        <div className="content">
          <Form
            handleSubmit={handleSubmit}
            handlePinChange={handlePinChange}
            pin={pin}
            visibility={visibility}
            title={title}
            handleTitleChange={handleTitleChange}
            description={description}
            handleDescriptionChange={handleDescriptionChange}
            handleFormPalette={handleFormPalette}
          />
          {/* <div className='heading'>
          <form className='form' onSubmit={handleSubmit}>
            <button className='pin-button' onClick={()=>handlePinChange()}><Image alt='' height={20} width={20} src={pin?"/pin.svg":"/unpin.svg"}/></button>
            <input id='title' className={visibility} name='title' placeholder='Title' value={title} onChange={handleTitleChange}>
            </input>
            <textarea className='description' rows={1} name='description' placeholder='Take a note...' value={description} onChange={handleDescriptionChange}>
            </textarea>
            <div id='form-buttons' className={visibility}>
            <button onClick={()=>handleFormPalette()}><Image alt='' height={20} width={20} src={"/color-palette.svg"}/></button>
              <button type="submit" id="submit">Close</button>
            </div>
          </form>
        </div> */}
          {pinnedNotes.length > 0 ? "Pinned" : ""}
          <Notes
            notes={pinnedNotes}
            layout={layout}
            handleNote={handleNote}
            handleComplete={handleComplete}
            handlePin={handlePin}
            handlePalette={handlePalette}
            handleCopy={handleCopy}
            handleDelete={handleDelete}
          />
          {/* <div className={layout?'notes-grid':'notes-list'}>
        {pinnedNotes.map((note)=>{
            return <div onClick={()=>handleNote(note.key)} className={layout?'note note-width-grid':'note note-width-list'} key={note.key}>
              <button id='complete-button' className={note.complete==='Done'?'completed note-buttons':'incomplete note-buttons'} onClick={()=>handleComplete(note.key)}>
                <Image alt='' width={20} height={20} src={note.complete==='Done'?'/check.svg':'/uncheck.svg'}   />
              </button>
              <div className='note-title'>
                {note.title}
                <button className='note-pin note-buttons' onClick={()=>handlePin(note.key)}><Image alt='' height={20} width={20} src={"/unpin.svg"}/></button>
              </div>
              <pre className='note-description'>
                {note.description}
              </pre>
              <div className='note-key'>

              </div>
              <div className='note-buttons'> 
                <button onClick={()=>handlePalette(note.key)}><Image alt='' height={20} width={20} src={"/color-palette.svg"}/></button>
                <button onClick={()=>handleCopy(note.key)}><Image alt='' height={20} width={20} src={"/copy.svg"}/></button>
                <button onClick={()=>handleDelete(note.key)}><Image alt='' height={20} width={20} src={"/trash.svg"}/></button>
              </div>
            </div>
          })}
        </div> */}
          {unpinnedNotes.length > 0 ? "Unpinned" : ""}
          <Notes
            notes={unpinnedNotes}
            layout={layout}
            handleNote={handleNote}
            handleComplete={handleComplete}
            handlePin={handlePin}
            handlePalette={handlePalette}
            handleCopy={handleCopy}
            handleDelete={handleDelete}
          />
          {/* <div className={layout?'notes-grid':'notes-list'}>
          {unpinnedNotes.map((note)=>{
            return <div onClick={()=>handleNote(note.key)} className={layout?'note note-width-grid':'note note-width-list'}>
              <button id='complete-button' className={note.complete==='Done'?'completed note-buttons':'incomplete note-buttons'} onClick={()=>handleComplete(note.key)}>
                <Image alt='' width={20} height={20} src={note.complete==='Done'?'/check.svg':'/uncheck.svg'}   />
              </button>
              <div className='note-title'>
                {note.title}
                <button className='note-pin note-buttons' onClick={()=>handlePin(note.key)}><Image alt='' height={20} width={20} src={"/pin.svg"}/></button>
              </div>
              <pre className='note-description'>
                {note.description}
              </pre>
              <div className='note-key'>
              </div>
              <div className='note-buttons'> 
                <button onClick={()=>handlePalette(note.key)}><Image alt='' height={20} width={20} src={"/color-palette.svg"}/></button>
                <button onClick={()=>handleCopy(note.key)}><Image alt='' height={20} width={20} src={"/copy.svg"}/></button>
                <button onClick={()=>handleDelete(note.key)}><Image alt='' height={20} width={20} src={"/trash.svg"}/></button>
              </div>
            </div>
          })}
        </div> */}
        </div>
      </div>
    </>
  );
}
