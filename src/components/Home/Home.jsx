import CarrouselHome from "../CarrouselHome/CarrouselHome"
import './Home.css'
import CarrouselDestacados from "../CarrouselDestacados/CarrouselDestacados"

function Home() {
  return (
    <div className="content">
      <div>
        <CarrouselHome />
        <div className="imagenes-home">
          <img
            src="https://images.pexels.com/photos/2290245/pexels-photo-2290245.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <img
            src="https://images.pexels.com/photos/866023/pexels-photo-866023.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </div>
        <div className="message-welcome">
          <h2>REGALÁ DEPORTE</h2>
          <p>Estas Fiestas regalá, diseño y movimiento</p>
        </div>
        <CarrouselDestacados />
      </div>
    </div>
  )
}

export default Home
