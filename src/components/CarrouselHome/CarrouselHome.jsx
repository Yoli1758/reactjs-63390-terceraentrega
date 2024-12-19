
import { Link } from 'react-router-dom';
import './CarrouselHome.css'


function CarrouselHome() {
  return (
    <div >

<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
    <p className="d-block w-100">Hasta 50% OFF en seleccionados</p>
    <Link to="/productos">Ver Productos</Link>
    </div>
    <div className="carousel-item">
    <p className="d-block w-100">Envio gratis a partir de $255.000</p>
    <Link to="/productos">Ver Productos</Link>
    </div>
    <div className="carousel-item">
    <p className="d-block w-100">Hasta 12 cuotas sin interes en bancos seleccionados</p>
    <Link>Ver Promociones</Link>
    </div>
  </div>
  <button className="carousel-control-prev" style={{width:"60%"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button> 
  <button className="carousel-control-next" style={{width:"60%"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon"  aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default CarrouselHome

