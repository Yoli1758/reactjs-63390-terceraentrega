import { Link } from "react-router-dom"
import './CardDestacados.css'

function CardDestacados(props) {


  return (
    <div className='Card' style={{ border: "2px solid red", width: "200px", display: "flex", flexDirection: "column", marginBottom: "10px" }} >
      <img

        src={props.img} alt="product-image" style={{ width: "180px", height: "180px" }}

      />
      <h2 style={{ fontSize: "14px", textAlign: "center", fontWeight: "bold" }}>{props.name}</h2>
      <p className='price' style={{ color: "crimson", fontWeight: "500", textAlign: "center" }}>${props.price}</p>
      <p>{props.description}</p>

      <Link to={`/producto/detail/${props.id}`} className="btn btn-primary" style={{ width: "196px" }}>ver detalles</Link>

    </div>
  )
}

export default CardDestacados