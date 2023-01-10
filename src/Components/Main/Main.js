import React, {useState, useEffect} from "react"
import ScoreBoard from "./ScoreBoard";
import CardGrid from "./CardGrid";

const Main = () => {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [bosses, setBosses] = useState([]);
    const [clickedBosses, setClickedBosses] = useState([]);

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
        return bosses;
    };

    const handleClickedCard = (e) => {
        if (clickedBosses.includes((e.target.id))){
            setCurrentScore(0); 
            setClickedBosses([]);
            shuffleBosses();
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
            shuffleBosses();
        }
    };

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
        </main>
    )
}   

export default Main;