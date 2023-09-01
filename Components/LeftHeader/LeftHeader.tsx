import Image from "next/image";
import styles from "./LeftHeader.module.css";
import menu from "public/menu.svg";
import keep_logo from "public/keep_2020q4_48dp.png";

export default function LeftHeader(props) {
  const handleMenu = () => {
    props.setShowNavBar(!props.showNavBar);
    console.log(props.showNavBar);
  };
  return (
    <div className={styles.left_header}>
      <Image
        alt=""
        width={48}
        height={48}
        src={menu}
        className={styles.menu_icon}
        onClick={handleMenu}
      />
      <Image
        alt=""
        width={44}
        height={44}
        src={keep_logo}
        className={styles.keep_logo}
      />
      <div className={styles.keep}>Keep</div>
    </div>
  );
}
