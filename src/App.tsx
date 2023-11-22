import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import SignUp from './pages/SignUp'
// import Cart from './pages/Cart'
// import Cart from './components/Cart'
import Products from './pages/Products'
import Product from './pages/Product'
import Home from './pages/Home'
import Login from './pages/Login'
import { themeSettings } from "./palette/theme"
import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { ThemeProvider } from "@mui/material"

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
              {/* <Route path='/cart' element={<Cart />} /> */}
              <Route path='/products' element={<Products />} />
              <Route path='/product:id' element={<Product />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
