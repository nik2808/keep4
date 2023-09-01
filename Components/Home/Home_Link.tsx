"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./Home_Link.module.css";
import BodyContent from "../Body/BodyContent";

export default function Home_Link() {
  return (
    <Link href="#home" className={styles.home_link}>
      <BodyContent />
    </Link>
  );
}
