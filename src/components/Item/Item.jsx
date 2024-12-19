import { Link } from "react-router-dom";
import './Item.css'

const Item = ({ product }) => {

  const imageProduct = product.stock < 1 ? `${product.images.soldOut}` : `${product.images.product}`
  const precioProduct = product.price < 400 && product.stock > 5 ? true : false
  const newCollec = product.isNewCollection && product.stock > 8

  return (
    <>
      <div className="tarjetaproducto">
        <section className="imgproducto" >
          {newCollec && <span className="productonuevo"><img style={{ width: "5%", height: "5%" }} src={product.images.start} />Nuevo</span>}
          <img src={imageProduct} alt={product.name} />
        </section>
        <div className="cardcontent">
          <h2>{product.name}</h2>
          <p>
            {precioProduct && <span style={{ color: "green", fontWeight: 600 }}>30% Descuento </span>}
            ${product.price}
          </p>
          <p>{product.description}</p>
        </div>
        <Link to={`/producto/detail/${product.id}`} className="btn btn-primary">ver detalles</Link>
      </div>
    </>
  )
}
export default Item

