const Card = (props) => {
    return (
        <div onClick={props.onClick} id={props.id}>
            <img src={props.img} id={props.id}></img>
            <p id={props.id}>{props.name}</p>
        </div>
    )
}

export default Card;