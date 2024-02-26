import styled from 'styled-components'
import { AppRoutes } from './components/Routes/Routes'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCategories } from './Redux/Slices/categoriesSlice'
import { getProducts } from './Redux/Slices/productsSlice'
import { Drawer } from 'antd';
import { HeartFilled, ShoppingFilled } from '@ant-design/icons';



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

  const favoritesTitle = favorites.length   ? `You have ${favorites.length} favorite product(s)`
                                            : "No favorite products yet";

  const cartTitle = cart.length   ? `You have ${cart.length} product(s) in the cart`
                                            : "No products in the cart yet";

  return (
    <Wrapper >
      <Header showFavorites={showFavorites} showCart={showCart} />
      <AppRoutes />
      <Footer />
      <Drawer title={favoritesTitle}   onClose={onCloseFavorites} open={openFavorites}>
        <p>Favorites</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Drawer title={cartTitle} onClose={onCloseCart} open={openCart}>
        <p>Cart</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Wrapper>
  )
}

export default App
