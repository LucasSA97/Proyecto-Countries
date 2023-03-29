import Card from "../Card/Card";
import style from "./CardsConteiner.module.css";

const CardsConteiner = ({currentCountries}) => {
    return (
        <div className={style.container}>
            {currentCountries.map(country => {
                return <Card
                    img={country.img}
                    name={country.name}
                    continent={country.continent}
                    key={country.id}
                    id={country.id}
                />
         })}
        </div>
    )
}
 
export default CardsConteiner;

