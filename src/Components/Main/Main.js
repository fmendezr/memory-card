import React, {useState, useEffect} from "react"
import ScoreBoard from "./ScoreBoard";
import CardGrid from "./CardGrid";
import Modal from "./Modal";

const Main = () => {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [bosses, setBosses] = useState([]);
    const [clickedBosses, setClickedBosses] = useState([]);
    const [winner, setWinner] = useState(true);

    useEffect(() => {
        const loadBosses = async () => {
            setBosses(await fetchBosses());
        }
        loadBosses();
    }, []);

    const fetchBosses = async () => {
        const bossesUrl = "https://eldenring.fanapis.com/api/bosses?limit=100";
        const response = await fetch(bossesUrl);
        const data = await response.json();
        const filteredBosses = data.data.filter((object) => object.image != null);
        const bosses = filteredBosses.map((boss) => {
            return ({id: boss.id, name: boss.name, img: boss.image})
        })
        const cleanupBosses = bosses.filter((boss) => boss.id != "17f69d0313fl0i1uk8pokynv71bkz8" && boss.id != "17f69bd3c06l0i1ulx2jxbiogta1i" && boss.id != "17f698b7d2fl0i1umtkf7cu5a21hdw" && boss.id != "17f69b45618l0i1uuc1z6qlw7hnnq" && boss.id != "17f69d237f0l0i1uytr06ed4gz92qdj" && boss.id != "17f6963b02cl0i1uyzthmeyyq45wna" && boss.id != "17f6982dbf7l0i1v1r3i4p5cy7kvcs" && boss.id != "17f699223e7l0i1uwcol7wflmcgajb" )
        return shuffleArray(cleanupBosses);
    };

    const handleClickedCard = (e) => {
        console.log(bosses.length);
        if (clickedBosses.includes((e.target.id))){
            resetGame();
        } else {
            setClickedBosses((previousState) => {
                return previousState.concat(e.target.id);
            });
            setCurrentScore((previousState) => {
                return previousState + 1;
            });
            if (currentScore >= bestScore){
                setBestScore((previousState) => {
                    return previousState + 1;
                });
            };
            checkWinner();
            shuffleBosses();
        }
    };

    const resetGame = () => {
        setCurrentScore(0); 
        setClickedBosses([]);
        setWinner(false)
        shuffleBosses();
    }

    const checkWinner = () => {
        if (clickedBosses.length == 86){
            setWinner(true);
        }
    }

    const shuffleArray = array => {
        const arr = [...array]; 
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
        return arr
      }

    const shuffleBosses = () => {
        setBosses((previousState) => {
            return shuffleArray(previousState);
        })
    }

    return (    
        <main>
            <ScoreBoard 
                currentScore={currentScore}
                bestScore={bestScore}
            />
            <CardGrid 
                bosses={bosses}
                onCardClick={handleClickedCard}
            />
            <Modal 
                appear={winner}
                onClick={resetGame}
            />
        </main>
    )
}   

export default Main;