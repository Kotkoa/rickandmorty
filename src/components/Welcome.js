import "../App.css"
import { Link } from "react-router-dom"

function Welcome() {
  return (
    <div className="background_layer">
      <div className="background">
        <div className="overlay_layer">
          <div className="suazo"></div>
          <div className="rickandmorty"></div>
          <h1 className="bien">Bienvenido a Rick and Morty</h1>
          <p className="en">
            En esta prueba, evaluaremos su capacidad para construir la
            aplicación mediante el análisis de código y la reproducción del
            siguiente diseño.
          </p>
          <Link to="/home" className="continuar">
            <button className="btn">Continuar</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome
