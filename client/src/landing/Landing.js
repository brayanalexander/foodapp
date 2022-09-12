import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import logo from "../images/logoFood.png";

function Landing(){
   return(
    <div className={styles.landing}>
      <div>
      <img className={styles.logo} src={logo} alt="logo"/>
      
      <Link to="/home" className={styles.bntEntrar}>ENTRAR</Link>
      </div>
     
    </div>
   ) 
}

export default Landing;