"use client";
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
      background: "white",
    },
    {
      title: "abcdef",
      description: "wxyz",
      key: 2,
      pin: true,
      complete: "To-Do",
      background: "white",
    },
  ];
  const dataFromLocalStorage = JSON.parse(localStorage.getItem("noteList"));
  const [notes, setNotes] = React.useState(
    dataFromLocalStorage ? dataFromLocalStorage : notesSample
  );
  const [modalNote, setModalNote] = React.useState({});
  const [modal, setModal] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [boxShadow, setBoxShadow] = React.useState("none");
  localStorage.setItem("noteList", JSON.stringify(notes));

  const [layout, setLayout] = React.useState(true);

  const handleLayoutChange = () => {
    setLayout(!layout);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    console.log("xyz");
  };

  const pinnedNotes = notes.filter(function (note) {
    if (search.length > 0 && note.pin) {
      return note.title.includes(search) || note.description.includes(search);
    }
    return note.pin;
  });

  const unpinnedNotes = notes.filter(function (note) {
    if (search.length > 0 && !note.pin) {
      return note.title.includes(search) || note.description.includes(search);
    }
    return !note.pin;
  });

  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY > 0) {
        setBoxShadow("0 2px 6px 2px rgba(60, 64, 67, 0.3)");
      } else {
        setBoxShadow("none");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div onScroll={handleScroll}>
      {modal ? (
        <ModalComponent
          modalNote={modalNote}
          setModalNote={setModalNote}
          modal={modal}
          setModal={setModal}
          notes={notes}
          setNotes={setNotes}
        />
      ) : null}
      <div className="app">
        <Header
          boxShadow={boxShadow}
          handleSearch={handleSearch}
          handleLayoutChange={handleLayoutChange}
          layout={layout}
        />
        <div
          className="content"
          style={{ boxShadow: "inset 1px 2px 0 rgba(60, 64, 67, 0.302))" }}
        >
          <Form notes={notes} setNotes={setNotes} />
          <Notes
            label={"PINNED"}
            notes={notes}
            setNotes={setNotes}
            modal={modal}
            setModal={setModal}
            setModalNote={setModalNote}
            filterednotes={pinnedNotes}
            layout={layout}
          />
          <Notes
            label={"OTHERS"}
            notes={notes}
            setNotes={setNotes}
            modal={modal}
            setModal={setModal}
            setModalNote={setModalNote}
            filterednotes={unpinnedNotes}
            layout={layout}
          />
        </div>
      </div>
    </div>
  );
}
