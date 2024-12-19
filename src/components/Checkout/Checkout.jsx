import { useState } from 'react'
import { useCart } from '../../hooks/useCart';
import { db } from '../../services/firebase/firebase';
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from 'firebase/firestore';
import './Checkout.css'
import { useNotification } from '../../hooks/useNotification';
import swal from 'sweetalert';

export default function Checkout() {


  const [loading, setLoading] = useState(false);

  const [buyer, setBuyer] = useState({
    email: '',
    firstNames: '',
    lastNames: '',
    dni: '',
    phone: '',
    highStreet: '',
    home: '',
    cp: '',
    localidad: '',
    sendUpdates: false,
  });

  const {setNotification} = useNotification();

  const { cart, total, totalItems, clearCart } = useCart();
  const [orderCreated, setOrderCreated] = useState(false);


 
  const filteredItems = cart.map(item => ({
    id: item.id,
    category: item.category,
    name: item.name,
    description: item.description,
    imgProduct: item.images.product,
    price: item.price,
    stock: item.stock,
    talle: item.talle
  }))


  const resetBuyer = () => {
    setBuyer({
      email: '',
      firstNames: '',
      lastNames: '',
      dni: '',
      highStreet: '',
      home: '',
      cp: '',
      localidad: '',
      phone: '',
      sendUpdates: false,
    })
  }
  const createOrder = async () => {

    try {
      const objOrder = {
        buyer,
        items: filteredItems,
        totalQuantity: totalItems,
        total,
        date: new Date(),
      };

     const isBuyerComplete =  Object.values(buyer).every(
      (value)=> value !== '' && value !==null && value !== undefined
     )
     if(!isBuyerComplete || totalItems==0)
     {
        if(totalItems==0)
          setNotification("","No podemos hacer la compra con el carrito vacio")
         
        else
        
          setNotification("","Por favor ingrese la informacion del formulario")
        return
     }
    
      const ids = cart.map((item) => item.id);
      const productRef = collection(db, "products");

      const productsAddedFromFirestore = await getDocs(
        query(productRef, where(documentId(), "in", ids)));

      const { docs } = productsAddedFromFirestore;


      const outOfStock = [];
      const batch = writeBatch(db);
      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDB = dataDoc.stock;



        const productAddedToCart = cart.find((prod) => prod.id === doc.id);
        const productQuantity = productAddedToCart?.cantidad;
     
       
        if (stockDB >= productQuantity) {
          
          batch.update(doc.ref, { stock: stockDB - productQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }

      });
      if (outOfStock.length === 0) {
        await batch.commit();

        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, objOrder);
        
        setOrderCreated(true);
        clearCart();
        resetBuyer();

        swal({
          title: "🎉Compra Exitosa🎉",
          text: "Gracias por Elegirnos",
          icon: "success",
          button:false,
          timer: 3000,
        });

      } else {
        
       setNotification("warning","Hay productos fuera de Stock")
      }

    } catch (err) {
      const mesj=`Error creando orden de compra ${err}`
      setNotification("danger",mesj)
    
    
    }
  }


  return (




    <div className={`container-fluid d-flex justify-content-center align-items-center min-vh-100  `} >
      <div className="row  shadow rounded p-4 w-100" style={{ maxWidth: "900px", marginTop: "25px" }}>

        <div className="col-12 col-lg-6 border-end">
          <div className="mb-1 ">
            <label htmlFor="email" className="form-label"><strong>Contacto</strong></label>
            <input type="text" name="email" onChange={(e) => setBuyer({ ...buyer, email: e.target.value })} value={buyer.email || ''} className="form-control change-placeholder" placeholder="Correo electrónico" />
          </div>
          <div className="form-check mb-2">
            <input type="checkbox" className="form-check-input change-placeholder" name='sendUpdates' checked={buyer.sendUpdates} onChange={(e) => setBuyer({ ...buyer, sendUpdates: e.target.checked })} />
            <label htmlFor="notif" className="form-check-label" style={{ fontSize: "12px", fontWeight: "700", color: "blue" }}  >Envíame novedades de mi pedido por WhatsApp </label>
          </div>
          <h3 className="mt-3 mb-3" style={{ fontSize: "24px" }}>Datos Cliente</h3>


          <div className="row mb-2">
            <div className="col"><input type="text" name='firstNames' value={buyer.firstNames || ''} onChange={(e) => setBuyer({ ...buyer, firstNames: e.target.value })} className="form-control change-placeholder" placeholder="Nombres" /></div>
            <div className="col"><input type="text" name='lastNames' value={buyer.lastNames || ''} onChange={(e) => setBuyer({ ...buyer, lastNames: e.target.value })} className="form-control change-placeholder" placeholder="Apellidos" /></div>
          </div>
          <div className="mb-2">
            <input type="text" name='dni' value={buyer.dni || ''} onChange={(e) => setBuyer({ ...buyer, dni: e.target.value })} className="form-control change-placeholder" placeholder="DNI/CUIT" /></div>
          <div className="mb-2">
            <input type="text" name='highStreet' value={buyer.highStreet || ''} onChange={(e) => setBuyer({ ...buyer, highStreet: e.target.value })} className="form-control change-placeholder" placeholder="Calle y altura" /></div>
          <div className="mb-2">
            <input type="text" name='home' value={buyer.home || ''} onChange={(e) => setBuyer({ ...buyer, home: e.target.value })} className="form-control change-placeholder" placeholder="Casa, Piso, dpto,etc (Opcional)" /></div>

          <div className="row mb-2">
            <div className="col-6"><input type="text" name='cp' onChange={(e) => setBuyer({ ...buyer, cp: e.target.value })} value={buyer.cp || ''} className="form-control change-placeholder" placeholder="CP" /></div>
            <div className="col-6"><input type="text" name='localidad' value={buyer.localidad || ''} onChange={(e) => setBuyer({ ...buyer, localidad: e.target.value })} className="form-control change-placeholder" placeholder="Localidad" /></div>

          </div>
          <div className="mb-3"> <input type="text" name='phone' value={buyer.phone || ''} onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} className="form-control change-placeholder" placeholder="Número de telefono" /></div>


        </div>


        <div className="col-12 col-lg-6">
          <h3 className="mb-4  fw-bold text-center">Resumen de la compra</h3>



          {
            cart.map((item) => (
              <article key={item.id}>
                <header>
                  <h2 style={{ fontSize: "14px" }}>
                    {item.name}{" "}
                    <span className='badge'>Talle:{item.talle} Cantidad:{item.cantidad}</span>
                  </h2>
                </header>
              </article>
            ))
          }



          <div className="fs-5 fw-bold">
            <p><strong>Total:</strong>${total}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center p-3">
          <button className="btn btn-info" onClick={createOrder} >
           Generar Orden
          </button>
        </div>
      </div>
    </div>







  )
}

