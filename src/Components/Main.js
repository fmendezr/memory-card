import React, {useState, useEffect} from "react"

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
        } else {
            setClickedBosses((previousState) => {
                return previousState.concat(e.target.id);
            });
            setCurrentScore((previousState) => {
                return previousState ++;
            });
            if (currentScore >= bestScore){
                setBestScore(currentScore);
            };
        }
    };

    return (    
        <main>
        </main>
    )
}   

export default Main;