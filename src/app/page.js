import styles from "@/app/page.module.css";
import Login from "@/components/Login/Login.js";
    const Homepage = () =>{
        return (
            <div className= {styles['main']}>
							<Login />
            </div>
        );
    };

export default Homepage;
