import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <Link to="/" className={style.button}>Henry Countries</Link>
            <Link to="/home" className={style.button}>Home</Link>
            <Link to="/create" className={style.button}>Add Activity</Link>
    </div>
    )
}

export default NavBar;