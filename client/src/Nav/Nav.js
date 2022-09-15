import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import logoFood from "../images/logoFood.png";
import comidas from "../images/comidas.png";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to='/home'><img className={styles.imgLogo} src={logoFood} alt="logo" /></Link>
                <img className={styles.imgComidas} src={comidas} alt="comidas" />
                <Link to="/create" className={styles.btnCreate}>{/*<FontAwesomeIcon icon={faCirclePlus}  />*/}Create Food</Link>
            </div>
        </header>
    )
}

export default Nav;