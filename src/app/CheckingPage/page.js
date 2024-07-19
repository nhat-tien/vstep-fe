import styles from "@/app/CheckingPage/page.module.css";
import Userinfor from "@/components/UserInfo/UserInfo/Userinfo";

const CheckingPage = () => {
    return (
        <div className={styles['body']}>
        <div className={styles['checking-page']}> 
             <Userinfor/> 
        </div>    
        </div> 
    );
};

export default CheckingPage;
