import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Home from './components/Home/Home'

import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Footer from './components/Footer/Footer'

import 'react-toastify/dist/ReactToastify.css'
import { DataProvider } from './context/DataContext'
import { CartProvider } from './context/CartContext'
import "./App.css";
import { ThemeProvider } from './context/ThemeContext'
import { NotificationProvider } from './context/NotificationContext'



function App() {
    return (
        <>
            <div>
                <DataProvider>
                    <NotificationProvider>
                        <CartProvider>
                            <ThemeProvider>
                                <BrowserRouter>
                                    <NavBar />
                                    <Routes >
                                        <Route path='/' element={<Home />} />
                                        <Route path='/productos' element={<ItemListContainer />} />
                                        <Route path='/productos/category/:categoryId' element={<ItemListContainer />} />
                                        <Route path='/producto/detail/:productId' element={<ItemDetailContainer />} />
                                        <Route path='/cart' element={<Cart />} />
                                        <Route path='/checkout' element={<Checkout />} />
                                        <Route path='*' element={<h1>404 NOT FOUND</h1>} />
                                    </Routes>
                                    <Footer />
                                </BrowserRouter>
                            </ThemeProvider>
                        </CartProvider>
                    </NotificationProvider>
                </DataProvider>
            </div>
        </>
    )
}

export default App