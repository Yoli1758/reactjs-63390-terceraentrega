import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail.jsx"
import DataContext from "../../context/DataContext.jsx"

export default function ItemDetailContainer() {


  const { productId } = useParams();

  const { productSelected, getProductsByID } = useContext(DataContext);

  useEffect(() => {
    if (productId) {
      getProductsByID(productId)
    }
  }, [productId, getProductsByID])

  return (
    <div className="content">
      <h2 className="titulo">Detalle del Producto</h2>
      <hr style={{ color: "#333" }} />
      {productSelected ? <ItemDetail {...productSelected} /> : <p>Cargando producto...</p>}
    </div>
  )
}

