import styled from 'styled-components'
import { AppRoutes } from './components/Routes/Routes'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCategories } from './Redux/Slices/categoriesSlice'
import { getProducts } from './Redux/Slices/productsSlice'
import { Drawer } from 'antd';
import { FavoritesDrawer } from './components/Drawers/FavoritesDrawer/FavoritesDrawer'
import { CartDrawer } from './components/Drawers/CartDrawer/CartDrawer'


const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])

  const { favorites, cart } = useSelector(({ user }) => user)

  const [ openFavorites, setOpenFavorites] = useState(false);
  const showFavorites = () => {
    setOpenFavorites(true)
  }
  const onCloseFavorites = () => {
    setOpenFavorites(false)
  }

  const [ openCart, setOpenCart] = useState(false);
  const showCart = () => {
    setOpenCart(true)
  }
  const onCloseCart = () => {
    setOpenCart(false)
  }

  const favoritesTitle = favorites.length   ? `Favorites: You have ${favorites.length} favorite product(s)`
                                            : "Favorites: No favorite products yet";

  const cartTitle = cart.length   ? `Cart: You have ${cart.length} product(s) in the cart`
                                            : "Cart: No products in the cart yet";

  return (
    <Wrapper >
      <Header showFavorites={showFavorites} showCart={showCart} />
      <AppRoutes />
      <Footer />
      <Drawer title={favoritesTitle}  
              onClose={onCloseFavorites} 
              open={openFavorites}>
        <FavoritesDrawer favorites={favorites} />
      </Drawer>
      <Drawer title={cartTitle} 
              onClose={onCloseCart} 
              open={openCart}>
        <CartDrawer cart={cart} />
      </Drawer>
    </Wrapper>
  )
}

export default App
