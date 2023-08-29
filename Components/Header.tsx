import Image from "next/image";
import keep_logo from "public/keep_2020q4_48dp.png";
import React from "react";

export default function Header(props) {
  return (
    <div className="header" style={{ boxShadow: props.boxShadow }}>
      <Image id="logo" alt="" src={keep_logo} height={44} width={40} />
      <a>Keep</a>
      <div className="search">
        <button>
          <Image alt="" height={20} width={20} src={"/search-outline.svg"} />
        </button>
        <input
          placeholder="Search"
          onChange={(e) => props.handleSearch(e)}
        ></input>
        <button onClick={() => props.handleSearch()}>
          <Image alt="" height={20} width={20} src={"/cross.svg"} />
        </button>
      </div>
      <div className="header-buttons">
        <button onClick={() => props.handleLayoutChange()}>
          <Image
            width={20}
            height={20}
            alt=""
            src={props.layout ? "/grid.svg" : "list.svg"}
          />
        </button>
      </div>
    </div>
  );
}
