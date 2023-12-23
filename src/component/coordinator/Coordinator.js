
import c from './Coordinator.module.css'

const Coordinator=({ player })=>{




    return (
        <div className={c.fifacard}>
          <img src={player.image} alt={player.name} />
          <div className={c.playerdetails}>
            <h2>{player.name}</h2>
            <p>Position: {player.position}</p>
            <p>Overall Rating: {player.rating}</p>
            <p>Club: {player.club}</p>
            <p>Nationality: {player.nationality}</p>
          </div>
        </div>
      );
}

export default Coordinator;