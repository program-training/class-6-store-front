import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Home from "./pages/Home";
import { themeSettings } from "./palette/theme";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { ThemeProvider } from "@mui/material";
import { connectToData } from "./functions";

function App() {
  connectToData();
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
