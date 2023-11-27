import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './rtk/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>

    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  </Provider>
)
