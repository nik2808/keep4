import Image from "next/image";
import styles from "./CentralHeader.module.css";
import search from "public/search.svg";
import cross from "public/cross.svg";

export default function CentralHeader(props) {
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    props.setSearch(e.target.value);
  };
  return (
    <div className={styles.form_container}>
      <form className={styles.center_header}>
        <button className={styles.form_buttons}>
          <Image
            width={42}
            height={42}
            alt=""
            src={search}
            className={styles.header_buttons}
          />
        </button>
        <input
          className={styles.search_input}
          placeholder="Search"
          onChange={handleChange}
        />
        <button className={styles.form_buttons}>
          <Image
            width={40}
            height={40}
            alt=""
            src={cross}
            className={[styles.header_buttons, styles.cross].join(" ")}
          />
        </button>
      </form>
    </div>
  );
}
