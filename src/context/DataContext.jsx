
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../services/firebase/firebase";
import { adaptProduct, adaptProducts } from "../adapters/ProductAdapter";
import swal from 'sweetalert'



const DataContext = createContext();


const DataProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState(null)



    const getProducts = async (categoryId = null) => {
        try {
            const collectionRef = categoryId
                ? query(collection(db, "products"), where("category", "==", categoryId))
                : collection(db, "products")
            const querySnapshot = await getDocs(collectionRef);



            const productList = adaptProducts(querySnapshot.docs)
            setProducts(productList)
        }
        catch (error) {
            swal("Oops", "Error getProducts:", "error")

        }

    }

    const getProductsByID = async (productoId) => {
        if (!productoId) {

            swal("productID no es valido", {
                buttons: false,
                timer: 3000,
            });
            return
        }
        try {
            const docRef = doc(db, "products", productoId)

            const querySnapshot = await getDoc(docRef);

            if (querySnapshot.exists()) {
                const adaptedProduct = adaptProduct({
                    id: querySnapshot.id,
                    data: () => querySnapshot.data(),
                })


                setProductSelected(adaptedProduct)
            }
            else {


                swal("producto no existe", {
                    buttons: false,
                    timer: 3000,
                });
                setProductSelected(null);
            }

        }
        catch (error) {

            swal("Oops", "Error getProductsByID:", "error")
            setProductSelected(null)
        }
    }


    const data = { products, getProducts, productSelected, getProductsByID }

    return (
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
    )

}

export { DataProvider }
export default DataContext