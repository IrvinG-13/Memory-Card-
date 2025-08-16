


export default function Header({points,maxPoints}){
    return(
        <header>
            <h1>Pokemon Memory Card Game</h1>
            <div className="points">
                <p>Max Score: {maxPoints}</p>
                <p >Points: {points}</p>
            </div>
            
        </header>
    )
}