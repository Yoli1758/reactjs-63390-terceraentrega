import { createContext, useContext, useEffect, useState } from "react";
import DataContext from "./DataContext";
import swal from 'sweetalert'
import { useNotification } from "../hooks/useNotification";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const [total, setTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
 const {setNotification} = useNotification();

    const { productSelected, getProductsByID } = useContext(DataContext)


    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    };


    const decrementar = (id) => {
        setCart((itemCart) =>
            itemCart.map((item) =>
                item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item))
    }

    const incrementar = (id) => {
        setCart((itemCart) =>
            itemCart.map((item) =>
                item.id === id && item.cantidad < item.stock ? { ...item, cantidad: item.cantidad + 1 } : item))
    }

    const deleteProduct = (id, talle) => {

       
        swal({
            title: "Esta Seguro de eliminar el producto?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setCart((itemCart) => itemCart.filter((item) => !(item.id === id && item.talle === talle)))
                    swal("El producto ha sido eliminado", {
                        icon: "success",
                    });
                } 
            });

       

    }
    const getTotal = () => {
        const res = cart.reduce((suma, item) => suma + (item.cantidad * item.price), 0)
       
        setTotal(res)
    }
    const clearCart = () => {
        setCart([]);
        setTotal(0);
    }



    const TotalProductos = () => {
        const cantProductos = cart.reduce((sum, item) => sum + item.cantidad, 0);
        setTotalItems(cantProductos)
    }
    const addCart = async (id, cantidad, talle) => {
        try {

            getProductsByID(id);
          
            if (!productSelected) {
                
                setNotification("danger",`producto con ID ${id} no encontrado`)
             
                return
            }
            const existeInCart = cart.find((item) => item.id === id && item.talle === talle)
            if (existeInCart) {

                setCart((itemCart) =>
                    itemCart.map((item) => item.id === id && item.talle === talle ? { ...item, cantidad: item.cantidad + cantidad } : item))

            } else {

                const newItem = { ...productSelected, cantidad, talle };
                setCart((itemCart) => [...itemCart, newItem]);
            }



        } catch (error) {
            swal ( "Oops" ,  "Error al add al carrito!" ,  "error" )
           
        }


    }

    useEffect(() => {

     
        TotalProductos();
    }, [cart])


    const data = { incrementar, decrementar, addCart, cart, deleteProduct, totalItems, total, getTotal, clearCart, isInCart };

    return (
        <CartContext.Provider value={data}>{children}</CartContext.Provider>
    )
}

export { CartProvider }
export default CartContext;