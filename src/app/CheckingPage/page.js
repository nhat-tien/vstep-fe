import styles from "@/app/Checking Page/page.module.css";
import Userinfor from "@/components/UserInfo/UserInfo/Userinfo";

const CheckingPage = () => {
    return (
        <div className={styles['checking-page']}> 
             <Userinfor/> 
        </div>     
    );
};

export default CheckingPage;
