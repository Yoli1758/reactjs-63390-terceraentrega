
import './CarrouselDestacados.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardDestacados from '../CardDestacados/CardDestacados';
import { useContext, useEffect } from 'react';
import DataContext from '../../context/DataContext';

function CarrouselDestacados() {

    const { products, getProducts } = useContext(DataContext)

    const responsive = {
        superLargeDesktop: {

            breakpoint: { max: 4000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        getProducts();
    }, [])


    const productDestacados = products.filter(item => item.destacado === 1)

    const product = productDestacados.map((item, index) => (
        <CardDestacados key={index} id={item.id} img={item.images.product} name={item.name} price={item.price} />
    ))

    return (
        <div style={{ marginLeft: "20px" }}>
            <h1 style={{ fontSize: "30px" }}>Destacados</h1>
            <div >
                <div style={{ width: "80%", margin: "auto" }}>
                    <Carousel responsive={responsive} >
                        {product}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default CarrouselDestacados