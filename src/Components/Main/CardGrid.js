import Card from "./Card.js"

const CardGrid = (props) => {
    return(
        <div>
            {props.bosses.map((boss) => {
                return (
                    <Card
                        onClick={props.onCardClick}
                        name={boss.name}
                        img={boss.img} 
                        id={boss.id}
                        key={boss.id}
                    />
                )
            })}
        </div>
    )
}

export default CardGrid