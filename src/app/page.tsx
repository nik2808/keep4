"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import Header from "../../Components/Header/Header";
import NavBar from "../../Components/NavBar/NavBar";
import PageLayout from "../../Components/PageLayout/PageLayout";

export default function Home() {
  const [page, setPage] = React.useState("Home");
  const [layout, setLayout] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [showNavBar, setShowNavBar] = React.useState(false);

  return (
    <div className="body">
      <Header
        setLayout={setLayout}
        setSearch={setSearch}
        layout={layout}
        showNavBar={showNavBar}
        setShowNavBar={setShowNavBar}
      />
      <div className="body-section">
        <NavBar page={page} setPage={setPage} showNavBar={showNavBar} />
        <PageLayout
          page={page}
          layout={layout}
          search={search}
          showNavBar={showNavBar}
        />
      </div>
    </div>
  );
}
