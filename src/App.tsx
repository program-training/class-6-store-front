// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
// import Layout from './pages/Layout'
// import { Home, Login } from '@mui/icons-material'
// import SignUp from './pages/SignUp'
// import Cart from './pages/Cart'
// import Products from './pages/Products'
// import Product from './pages/Product'
// import { themeSettings } from "./palette/theme"
// import { createTheme } from '@mui/material'

// // import { createTheme } from '@mui/material/styles';

// import { useMemo } from 'react'
// import { ThemeProvider } from "@mui/material"

// function App() {
//   const theme = useMemo(() => createTheme(themeSettings), [themeSettings])
//   return (
//     <>
//       <BrowserRouter>
//         <ThemeProvider theme={theme}>
//           <Routes>
//             <Route element={<Layout />}>
//               <Route path='/' element={<Home />} />
//               <Route path='/login' element={<Login />} />
//               <Route path='/signUp' element={<SignUp />} />
//               <Route path='/cart' element={<Cart />} />
//               <Route path='/products' element={<Products />} />
//               <Route path='/product:id' element={<Product />} />
//             </Route>
//           </Routes>
//         </ThemeProvider>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App


import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import { Home, Login } from '@mui/icons-material';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Product from './pages/Product';
import { themeSettings } from './palette/theme';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/products' element={<Products />} />
              <Route path='/product:id' element={<Product />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

