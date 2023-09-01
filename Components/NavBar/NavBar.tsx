"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./NavBar.module.css";

import notes from "public/notes.svg";
import reminders from "public/reminders.svg";
import edit from "public/edit.svg";
import archive from "public/archive.svg";
import trash from "public/delete.svg";

export default function NavBar(props) {
  // const [highlight, setHighlight] = useState("non_highlight");
  const handleNotes = () => {
    props.setPage("Home");
  };

  const handleReminders = () => {
    props.setPage("Reminders");
  };

  const handleLabels = () => {
    props.setPage("Edit_labels");
  };

  const handleArchives = () => {
    props.setPage("Archives");
  };

  const handleTrash = () => {
    props.setPage("Trash");
  };

  return (
    <div
      className={styles.navbar}
      id={props.showNavBar ? styles.max_width : styles.min_width}
    >
      <a
        href="#home"
        className={styles.nav_item}
        id={props.page === "Home" ? styles.highlight : styles.non_highlight}
        onClick={handleNotes}
      >
        <Image
          alt=""
          width={48}
          height={48}
          src={notes}
          className={styles.nav_icon}
        />
        {props.showNavBar ? <div className={styles.nav_text}>Notes</div> : null}
      </a>
      <a
        href="#reminders"
        className={styles.nav_item}
        id={
          props.page === "Reminders" ? styles.highlight : styles.non_highlight
        }
        onClick={handleReminders}
      >
        <Image
          alt=""
          width={48}
          height={48}
          src={reminders}
          className={styles.nav_icon}
        />
        {props.showNavBar ? (
          <div className={styles.nav_text}>Reminders</div>
        ) : null}
      </a>
      <a
        href="#edit_labels"
        className={styles.nav_item}
        id={
          props.page === "Edit_labels" ? styles.highlight : styles.non_highlight
        }
        onClick={handleLabels}
      >
        <Image
          alt=""
          width={48}
          height={48}
          src={edit}
          className={styles.nav_icon}
        />
        {props.showNavBar ? (
          <div className={styles.nav_text}>Edit labels</div>
        ) : null}
      </a>
      <a
        href="#archive"
        className={styles.nav_item}
        id={props.page === "Archives" ? styles.highlight : styles.non_highlight}
        onClick={handleArchives}
      >
        <Image
          alt=""
          width={48}
          height={48}
          src={archive}
          className={styles.nav_icon}
        />
        {props.showNavBar ? (
          <div className={styles.nav_text}>Archive</div>
        ) : null}
      </a>
      <a
        href="#trash"
        className={styles.nav_item}
        id={props.page === "Trash" ? styles.highlight : styles.non_highlight}
        onClick={handleTrash}
      >
        <Image
          alt=""
          width={48}
          height={48}
          src={trash}
          className={styles.nav_icon}
        />
        {props.showNavBar ? <div className={styles.nav_text}>Trash</div> : null}
      </a>
    </div>
  );
}
