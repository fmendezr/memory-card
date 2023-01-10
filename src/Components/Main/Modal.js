const Modal = (props) => {

    if (props.appear == false){
        return null;
    } 

    return (

        <div className="modal">
            <div className="modal-content">
                <h1>Tarnished you've Won!</h1>
                <button className="button-89" onClick={props.onClick}>Play Again</button>
            </div>
        </div>
    )
}

export default Modal