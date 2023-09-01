import React from "react";
import Image from "next/image";

import styles from "./RightHeader.module.css";
import refresh from "public/refresh.svg";
import layout from "public/layout.svg";
import settings from "public/settings.svg";
import apps from "public/apps.svg";
import account from "public/account.svg";

export default function RightHeader(props) {
  const handleLayout = (e) => {
    props.setLayout(!props.layout);
  };

  return (
    <div className={styles.right_header}>
      <div className={styles.buttons_left}>
        <Image
          width={48}
          height={48}
          alt=""
          src={refresh}
          className={styles.header_buttons}
        />
        <Image
          width={48}
          height={48}
          alt=""
          src={props.layout ? "/layout.svg" : "grid.svg"}
          onClick={handleLayout}
          className={styles.header_buttons}
        />
        <Image
          width={48}
          height={48}
          alt=""
          src={settings}
          className={styles.header_buttons}
        />
      </div>
      <div className={styles.buttons_right}>
        <Image
          width={48}
          height={48}
          alt=""
          src={apps}
          className={[styles.header_buttons, styles.apps].join(" ")}
        />
        <Image
          width={48}
          height={48}
          alt=""
          src={account}
          className={[styles.header_buttons, styles.profile].join(" ")}
        />
      </div>
    </div>
  );
}
