import { useState, useEffect } from "react";
import PokemonCards  from './Components/PokemonCards';
import Header from './Components/Header'
import './App.css'

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [points,setPoints] = useState(0)
  const [clickeado, setClickeado] = useState([])
  const [maxPoints, setMaxPoints] = useState(0)

  const URL = 'https://pokeapi.co/api/v2/pokemon/'

  const fetchAllPokemon = async ()=>{
    const promises = [];
    for(let i =0; i < 15; i++){
      promises.push(fetch(`${URL}${i+1}`).then(res => res.json()))
    }
    const results = await Promise.all(promises)
    setPokemon(results)
  }  

  useEffect(()=>{
     fetchAllPokemon()

    const storedMaxPoints = sessionStorage.getItem('maxPoints')

    if(storedMaxPoints){
      setMaxPoints(Number(storedMaxPoints))
    }
  },[])


 const handleCardClick = (pokemonClicked) =>{

  if(clickeado.includes(pokemonClicked.id)){
    if(points> maxPoints){
      setMaxPoints(points)
      sessionStorage.setItem("maxPoints", points);
    }
    setPoints(0)
    setClickeado([])
  }else{
    const newPoints = points +1
    setPoints(newPoints)
    setClickeado([...clickeado, pokemonClicked.id]);

    if(newPoints > maxPoints){

      sessionStorage.setItem('maxPoints',newPoints)
      setMaxPoints(newPoints)
    }
    const shuffledPokemon = [...pokemon].sort(() => Math.random() - 0.5);
    setPokemon(shuffledPokemon);
  }
}
  

  return (
    <div className="App">
      <Header maxPoints={maxPoints} points={points}/>
      <div className="pokeGrid">
        {pokemon.map((poke,index)=> (<PokemonCards key={index} pokemon={poke}   handleCardClick={()=>handleCardClick(poke)}/>))}
      </div>
      
    </div>
  );
}