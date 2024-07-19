import styles from "@/app/page.module.css";
import Login from "@/components/Login/Login.js";
    const login = () =>{
        return (
            <div className= {styles['body']}>
                    <div className= {styles['login-container']}>
                        <Login />
                    </div>
            </div>
        );
    };

export default login;