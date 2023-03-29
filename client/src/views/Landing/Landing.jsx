import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";


const Landing = () => {
    return (
        <div className={style.landing}>
            <h1>Individual Project Henry Countries!</h1>
            <h4>By Lucas Sarachu</h4>
            <Link to="/home">
                <button className={style.landingButton}>Entry</button>
            </Link>
        </div>
    )
}

export default Landing;