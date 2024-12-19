import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './ItemDetail.css'
import ItemCount from "../ItemCount/ItemCount";
import { useCart } from "../../hooks/useCart";
import { useNotification } from "../../hooks/useNotification";




export default function ItemDetail({ id, name, description, images, price, stock, talles, imgDetail, initialValue = 1 }) {


    const [activeImg, setActiveImg] = useState("")
    const [amount, setAmount] = useState(initialValue)
    const [selecTalle, setSelecTalle] = useState("")

    const { setNotification } = useNotification();

    const { addCart } = useCart();
    const navigate = useNavigate();

    const handleIncrement = () => {
        if (amount < stock) {
            setAmount((prev) => prev + 1)
        }
    }

    const handleDecrement = () => {
        if (amount > 1) {
            setAmount((prev) => prev - 1)
        }
    }

    const handleAddToCart = () => {
        if (!selecTalle) {
            setNotification("warning", "Por favor seleccione una Talla")
            return
        }


        addCart(id, amount, selecTalle)
        const mensaje = amount > 1 ? `Se agregaron ${amount} productos al Carrito` : `Producto agregado al carrito`
        setNotification("success", mensaje)

       
        setTimeout(() => {
            navigate("/cart")
        }, 3000)

    }
    const selectButton = (id) => {
        const selectedTalle = talles.find((item) => item.id === id)
        setSelecTalle(selectedTalle.value)
    }
    useEffect(() => {
        if (imgDetail?.length > 0) {
            setActiveImg(imgDetail[0].img);
        } else {
            setActiveImg(images.imgProduct);
        }
    }, [id, images.imgProduct]);

    const handleThumbnailClick = (img) => {
        setActiveImg(img)
    }

    return (
        <div className="details">
            <div className="big-img">
                <img src={activeImg} alt={name} />
            </div>
            <div className="box">
                <div className="row">
                    <h2>{name}</h2>
                    <span>{stock < 1 ? "No disponible" : ""}</span>
                    <p>{description}</p>
                    <span>${price}</span>
                    <span> {stock<1 ? "Sin Stock" : `Disponible:${stock}`}</span>
                </div>
                <div className="tallesdetail">
                    <h2>Seleccionar Talla</h2>
                    <div className="contenedortallas">
                        {talles.map(medida => (
                            <button key={medida.id}
                                onClick={() => selectButton(medida.id)}
                                className={selecTalle === medida.value ? "active" : ""}
                            >{medida.value}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="thumbdet">
                    {imgDetail.map(imagen => (
                        <img key={imagen.id} src={imagen.img} alt={name}
                            onClick={() => handleThumbnailClick(imagen.img)}
                            className={activeImg === imagen.img ? "active" : ""}
                        />
                    ))}
                </div>
                <div className="contentcartdetail">
                    <ItemCount amount={amount} onIncrement={handleIncrement} onDecrement={handleDecrement} clase="botonincrementosDetail" />
                    <button className="cart" onClick={handleAddToCart} disabled={stock < 1}>Agregar al Carrito</button>
                </div>
            </div>
        </div>
    )
}
