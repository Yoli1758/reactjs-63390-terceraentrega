
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import ItemCount from '../ItemCount/ItemCount'

import { useCart } from '../../hooks/useCart'
import './Cart.css'
export default function Cart() {

  const { cart, decrementar, incrementar, deleteProduct, total, getTotal } = useCart();


  if (cart.length === 0) {
    return (
      <div className="content">
        <h2 style={{ textAlign: "center" }}>No hay productos</h2>
      </div>
    )
  }
  else {

    useEffect(() => {
      getTotal();
    })


    return (
      <>
        <div className="content">
          <h1>Mi compra</h1>
          <div className='contenedorcart'>
            <div>
              <div className='table-header'>
                <span style={{ width: "150px", textAlign: "center" }}>Producto</span>
               
                <span style={{ width: "200px", paddingLeft:"200px"}}>Precio</span>
                <span style={{ width: "150px", paddingLeft:"100px" }}>Cantidad</span>
                <span  style={{ width: "150px", paddingLeft:"10px" }}>Subtotal</span>
              </div>
              {cart.map((item, index) => (
                <div className='detailscart' key={index}>
                  <div className='content-cardcart'>
                    <div className='content-img'>
                      <img src={item.images.product} />
                    </div>
                    <div className='nombre-talle'>
                      <h2>{item.name}</h2>
                      <p>{`Talle: ${item.talle}`}</p>
                    </div>
                    <div className='precio-unidad'>
                      <p>${item.price}</p>
                    </div>
                    <div className='cantidad-precio'>
                      <ItemCount amount={item.cantidad} stock={item.stock} onDecrement={() => decrementar(item.id)} onIncrement={() => incrementar(item.id)} clase="botonincrementos" />
                      <span className='preciocantidad'>${item.price * item.cantidad}</span>
                    </div>
                    <div className='deleteProduct' onClick={() => deleteProduct(item.id, item.talle)}>🗑️</div>
                  </div>
                </div>
              )
              )}
            </div>
            <div className='resumencarrito'>
              <div className="total">
                <h2>Resumen de la Compra</h2>
                <div className='totalcompra'>
                  <p style={{paddingLeft:"10px",color:"crimson",fontWeight:"bold"}}>TOTAL:</p>
                  <h3 style={{paddingRight:"15px",fontSize:"24px"}}>${total}</h3>
                </div>
              </div>
              <div className='botonesresumen'>
                <Link to="/checkout" className='btn btn-primary'>Checkout</Link>
                <Link to="/productos" style={{ textAlign: "center", fontSize: "16px", marginTop: "10px" }}>Seguir Comprando</Link>
              </div>
            </div>
          </div>
        </div>
      </>

    )
  }

}
