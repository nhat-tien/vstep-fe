import styles from "@/app/page.module.css";
import Login from "@/components/Login/Login.js";
    const Homepage = () =>{
        return (
            <div className= {styles['main']}>
{                    /* <div className= {styles['login-container']}> 
                         <Login /> 
                     </div> */}
						<Login />
            </div>
        );
    };

export default Homepage;
