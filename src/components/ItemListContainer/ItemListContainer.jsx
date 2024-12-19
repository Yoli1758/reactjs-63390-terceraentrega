import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { } from './ItemListContainer.css'
import DataContext from '../../context/DataContext'



export default function ItemListContainer() {

    const { categoryId } = useParams()

    const { products, getProducts } = useContext(DataContext)


    useEffect(() => {
        getProducts(categoryId)

    }, [categoryId])

    return (
        <div className="content" >
            <h2 className='titulo'>{categoryId ? `${categoryId}` : `Todos los Productos`}</h2>
            <hr />
            <ItemList products={products} />
        </div>

    )
}
