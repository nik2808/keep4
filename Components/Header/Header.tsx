"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

import LeftHeader from "../LeftHeader/LeftHeader";
import CentralHeader from "../CentralHeader/CentralHeader";
import RightHeader from "../RightHeader/RightHeader";

export default function Header(props) {
  const [boxShadow, setBoxShadow] = useState("none");

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
    <div className={styles.header} style={{ boxShadow: boxShadow }}>
      <LeftHeader
        setShowNavBar={props.setShowNavBar}
        showNavBar={props.showNavBar}
      />
      <CentralHeader search={props.search} setSearch={props.setSearch} />
      <RightHeader layout={props.layout} setLayout={props.setLayout} />
    </div>
  );
}
