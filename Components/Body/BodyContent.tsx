"use client";
import React, { useState, useEffect } from "react";
import styles from "./BodyContent.module.css";
import Link from "next/link";
import Form from "../Form/Form";
import NoteList from "../NoteList/NoteList";

export default function BodyContent(props) {
  return (
    <Link href="#home" className={styles.content}>
      <Form notes={props.notes} setNotes={props.setNotes} />
      <NoteList
        notes={props.notes}
        setNotes={props.setNotes}
        layout={props.layout}
        search={props.search}
      />
    </Link>
  );
}
