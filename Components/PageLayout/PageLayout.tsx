"use client";
import React, { useState, useEffect } from "react";
import styles from "./PageLayout.module.css";
import BodyContent from "../Body/BodyContent";
import Reminders from "../Reminders/Reminders";

export default function PageLayout(props) {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem("noteList"));
  const [notes, setNotes] = React.useState(
    dataFromLocalStorage ? dataFromLocalStorage : notesSample
  );
  localStorage.setItem("noteList", JSON.stringify(notes));

  return (
    <div
      className={styles.page_layout}
      id={props.showNavBar ? styles.full_navbar : styles.half_navbar}
    >
      {props.page === "Home" && (
        <BodyContent
          notes={notes}
          setNotes={setNotes}
          layout={props.layout}
          search={props.search}
        />
      )}
      {props.page === "Reminders" && <Reminders />}
      {/* {props.page === "Home" && <BodyContent />}
      {props.page === "Home" && <BodyContent />}
      {props.page === "Home" && <BodyContent />} */}
    </div>
  );
}
