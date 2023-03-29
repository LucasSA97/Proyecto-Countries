import style from "./Card.module.css"
import {Link} from "react-router-dom"

const Card = (props) => {
    return (
        <div className={style.card}>
            <Link to={`/detail/${props.id}`}>
            <img src={props.img} width="150px" height="100px"/>
            </Link>
            <h3>{props.name}</h3>
            <h5>Continent:{props.continent}</h5>
            
     </div>
)
}

export default Card;