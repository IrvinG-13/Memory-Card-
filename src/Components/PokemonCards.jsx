

export default function PokemonCards({pokemon, handleCardClick}){

    if(!pokemon){
        return <h1>Cargando...</h1>
    }
    return(
        <div className="pokeCard" onClick={()=> handleCardClick(pokemon)}>
            <img src={pokemon.sprites.front_default} alt="pokemonImage" />
            <div>
                <h2 className="id">{pokemon.name}</h2>
                <p >ID:{pokemon.id}</p>
            </div>
        </div>
    )
}