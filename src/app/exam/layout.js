import Header from "@/components/Exams/Exams-UI/Header/Header";
import Footer from "@/components/Exams/Exams-UI/Footer/Footer";
import styles from "@/app/exam/styles.module.css";

const MainLayout = ({ children }) => {

  return (
    <div className={styles["layout"]}>
      <Header />
      <main>{children}</main>
      <Footer
      />
    </div>
  );
};

export default MainLayout;
