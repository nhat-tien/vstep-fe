import styles from "@/app/page.module.css";
import Login from "@/components/Login/Login.js";
import Image from "next/image";

const Homepage = () => {
  return (
    <div className={styles["main"]}>
      <div className={styles["login-container"]}>
        <div className={styles["logo"]}>
          <Image
            src="/images/Quốc Huy Việt Nam 1.svg"
            alt="Logo"
            width={85}
            height={85}
          />
        </div>
        <h1 className={styles["title"]}>Thi thử VSTEP</h1>
        <Login />
      </div>
    </div>
  );
};

export default Homepage;
